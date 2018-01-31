var Nightmare = require('nightmare');
var getAllWebEvents = require('../lib/tools/get-all-web-events').default;

// 更多选项可参考 https://github.com/segmentio/nightmare#nightmareoptions
var nightmare = Nightmare({ show: true });

getAllWebEvents(nightmare)

// 执行
nightmare.goto('https://www.baidu.com')
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
    })
    .catch(function (error) {
        console.error('Search failed:', error);
    });