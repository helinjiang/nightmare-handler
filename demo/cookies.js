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

let test3 = 'Hm_lvt_1243dadf55248215260536a63a47c6d1=1524896497; pgv_pvi=4680975360; pgv_si=s726793216; ptisp=ctc; RK=gWDIxrfUWT; ptcz=8ce716d36690829936de36c474cba844dd63835717e3fb46cd36551a9fbe27bc; pgv_info=ssid=s2977805864; pgv_pvid=4710582673; pt2gguin=o2067779134; uin=o2067779134; o_cookie=2067779134; pac_uid=1_2067779134; _supWebp=1; p_uin=o2067779134; skey=@vig25B1XI; pt4_token=uo8lWHxRiMpN0-3oTBx1tXJ956RTMJvrVjMiNQZdjSg_; p_skey=JQiklCNQLbG7Jx8L3372zj*2Ipiw9VvPHkm6aC4HgyQ_; Hm_lpvt_1243dadf55248215260536a63a47c6d1=1525839000';

var nightmare = nightmareHandler.NightmarePlus({ show: true });

nightmare
    .exDevice('mobile')
    .exCookies(test1, 'https://www.navossoc.com')
    .goto('https://www.navossoc.com/tests/cookie.php')
    .evaluate(function () {
        return {
            cookie: document.cookie
        };
    })
    // .end()
    .then(function (result) {
        // { cookie: 'myKey=myValue; myKey3=myValue3' }
        console.log(result);
    })
    .catch(function (error) {
        console.error('Search failed:', error);
    });