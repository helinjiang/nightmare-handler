const nightmareHandler = require('../../lib');

const nightmare = nightmareHandler.NightmarePlus({ show: true });

// 执行
nightmare
    .exDevice('mobile')
    .goto('http://www.baidu.com')
    .wait('#index-bn')
    .evaluate(function () {
        return {
            title: document.title,
            searchBtnTxt: document.querySelector('#index-bn').innerText,
            width: window.innerWidth,
            height: window.innerHeight,
            userAgent: navigator.userAgent
        };
    })
    .end()
    .then(function (result) {
        console.log('success: ', result);
    })
    .catch(function (error) {
        console.error('error: ', error);
    });
