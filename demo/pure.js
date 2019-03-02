var Nightmare = require('nightmare');

// 更多选项可参考 https://github.com/segmentio/nightmare#nightmareoptions
var nightmare = Nightmare({ show: true });

nightmare.on('did-get-response-details', function (event,...args) {
    console.log('\ndid-get-response-details', event,typeof event.on);
});

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
        // console.log(recorder.toString());
    })
    .catch(function (error) {
        console.error('Search failed:', error);
    });