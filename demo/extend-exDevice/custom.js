const nightmareHandler = require('../../lib');

const deviceMap = {
    'custom': {
        'UA': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.75 Safari/537.36 nightmare',
        'width': 800,
        'height': 400
    }
};

// 获得扩展之后的 Nightmare
const NightmarePlus = nightmareHandler.getNightmarePlus({ deviceMap: deviceMap });

// 初始化 nightmare 对象
const nightmare = NightmarePlus({ show: true });

// 执行
nightmare
    .exDevice('custom')
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