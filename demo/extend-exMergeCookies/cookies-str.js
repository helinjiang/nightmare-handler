const nightmareHandler = require('../../lib');

// 需要设置的 cookie
const cookies1 = 'myKey=myValue; myKey3=myValue3';
const cookies2 = 'myKey=myValueNew; dummy=dummy_name; dummy2=dummy_name2';

// 获得扩展之后的 Nightmare
const NightmarePlus = nightmareHandler.getNightmarePlus();

// 初始化 nightmare 对象
let nightmare = NightmarePlus({ show: true });

nightmare = nightmare
    .exDevice('mobile')
    .exCookies(cookies1, 'https://www.navossoc.com')
    .goto('https://www.navossoc.com/tests/cookie.php');

nightmare
    .evaluate(function () {
        return {
            cookie: document.cookie
        };
    })
    // .end()
    .then(function (result) {
        // { cookie: 'myKey=myValue; myKey3=myValue3' }
        console.log('1', result);

        nightmare
            .exMergeCookies(cookies2, 'https://www.navossoc.com')
            .evaluate(function () {
                return {
                    cookie: document.cookie
                };
            })
            // .end()
            .then(function (result) {
                // { cookie: 'myKey3=myValue3; myKey=myValueNew; dummy=dummy_name; dummy2=dummy_name2' }
                console.log('2', result);
            })
            .catch(function (error) {
                console.error('Search2 failed:', error);
            });
    })
    .catch(function (error) {
        console.error('Search1 failed:', error);
    });