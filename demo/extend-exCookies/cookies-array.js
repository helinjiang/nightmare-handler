const nightmareHandler = require('../../lib');

// 需要设置的 cookie
const cookies = [{
    name: 'myKey',
    value: 'myValue'
}, {
    name: 'myKey3',
    value: 'myValue3'
}];

// 获得扩展之后的 Nightmare
const NightmarePlus = nightmareHandler.getNightmarePlus();

// 初始化 nightmare 对象
const nightmare = NightmarePlus({ show: true });

nightmare
    .exDevice('mobile')
    .exCookies(cookies, 'https://www.navossoc.com')
    .goto('https://www.navossoc.com/tests/cookie.php')
    .evaluate(function () {
        return {
            cookie: document.cookie
        };
    })
    .end()
    .then(function (result) {
        // { cookie: 'myKey=myValue; myKey3=myValue3' }
        console.log(result);
    })
    .catch(function (error) {
        console.error('Search failed:', error);
    });