const nightmareHandler = require('../../lib');

// 获得扩展之后的 Nightmare
const NightmarePlus = nightmareHandler.getNightmarePlus();

// 初始化 nightmare 对象
const nightmare = NightmarePlus({ show: true });

// 执行
nightmare
    .exDevice('pc', { width: 600, height: 300, UA: 'hello i am new ua' })
    .goto('http://www.baidu.com')
    .wait('#su')
    .evaluate(function () {
        return {
            title: document.title,
            searchBtnTxt: document.querySelector('#su').value,
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