const nightmareHandler = require('../lib');

let test1 = [{
    name: 'myKey',
    value: 'myValue'
}, {
    name: 'myKey3',
    value: 'myValue3'
}];

let test2 = {
    name: 'myKey',
    value: 'myValue'
};

let test3 = 'myKey=myValue; myKey3=myValue3';

var nightmare = nightmareHandler.NightmarePlus({ show: true });

nightmare
    .exDevice('mobile')
    .exCookies(test3, 'https://www.navossoc.com')
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