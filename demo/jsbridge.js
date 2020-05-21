var Nightmare = require('nightmare');

// 更多选项可参考 https://github.com/segmentio/nightmare#nightmareoptions
var nightmare = Nightmare({
    show: true,
    openDevTools: {
        mode: 'detach'
    }
});

nightmare.on('did-fail-provisional-load', function (...args) {
    console.log('\n========================');
    console.log(...args);
    console.log('========================\n');
});

// 执行 使用 `DEBUG=nightmare* node xxx.js` 方式，可以打印出 nightmare 的诸多日志。
nightmare.goto('http://127.0.0.1:3000/hybrid-app')
    .wait(1000)
    .evaluate(function () {
        return {
            remarks: '调试UA'
        };
    })
    // .end()
    .then(function (result) {
        console.log(result);
        // console.log(recorder.toString());
    })
    .catch(function (error) {
        console.error('Search failed:', error);
    });