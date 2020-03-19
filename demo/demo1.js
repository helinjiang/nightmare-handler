var Nightmare = require('nightmare');
// var WebEventRecorder = require('../lib/tools/web-event-recorder').default;
var WebEventRecorder = require('../lib').WebEventRecorder;

// 更多选项可参考 https://github.com/segmentio/nightmare#nightmareoptions
var nightmare = Nightmare({ show: true });

var recorder = new WebEventRecorder(nightmare);

try{
    console.log('===begin2222==',  nightmare.proc)


    // 执行
    nightmare.goto('http://www.baidu.com')
        .type('form[action*="/s"] [name=f]', 'nightmare')
        .click('form[action*="/s"] [type=submit]')
        .wait('#content_left')
        .evaluate(function () {
            return Array.from(document.querySelectorAll('#content_left .c-container'))
                .map(function (item) {
                    return item.querySelector('.t').innerText;
                });
        })
        .end()
        .then(function (result) {
            console.log(result);
            console.log(recorder.toString());
            console.log('===result==',  nightmare.proc)
        })
        .catch(function (error) {
            console.error('Search failed:', error);
        });

    nightmare.proc.on('close', code => {
        console.log('==close===',code)
    })
    process.on('exit', (...props)=>{
        console.log('==exit===',...props)
    })


}catch (e) {
    console.log('====catch ===',e)
}
