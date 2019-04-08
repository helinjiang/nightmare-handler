const mockstar = require('mockstar');

const nightmareHandler = require('../../lib');

// 需要设置的 cookie
const cookies = 'myKey=myValueNew; dummy=dummy_name; _ms_=[{"_ms_name":"mockerName1","_ms_target":"mockModuleNameOld","_ms_disable":0}]';

// 获得扩展之后的 Nightmare
const NightmarePlus = nightmareHandler.getNightmarePlus();

// 初始化 nightmare 对象
let nightmare = NightmarePlus({ show: true });

nightmare = nightmare
    .exDevice('mobile')
    .exCookies(cookies, 'https://www.navossoc.com')
    .goto('https://www.navossoc.com/tests/cookie.php');

nightmare
    .evaluate(function () {
        return {
            cookie: document.cookie,
            pageUrl: location.href
        };
    })
    .then(function (result) {
        // cookie: 'myKey=myValueNew; dummy=dummy_name; _ms_=[{"_ms_name":"mockerName1","_ms_target":"mockModuleNameOld","_ms_disable":0}]'
        console.log('1', result);
        let mockStarQuery = new mockstar.MockStarQuery();

        mockStarQuery.addOne('mockerName1', 'mockModuleName1');
        mockStarQuery.addOne('mockerName2', 'mockModuleName2', true);

        nightmare
            .exChangeMockStar(mockStarQuery.getCookieString())
            .evaluate(function () {
                return {
                    cookie: document.cookie,
                    pageUrl: location.href
                };
            })
            .end()
            .then(function (result) {
                // cookie: 'myKey=myValueNew; dummy=dummy_name; _ms_=[{"_ms_name":"mockerName1","_ms_target":"mockModuleName1","_ms_disable":0},{"_ms_name":"mockerName2","_ms_target":"mockModuleName2","_ms_disable":1}]'
                console.log('2', result);
            })
            .catch(function (error) {
                console.error('Search2 failed:', error);
            });
    })
    .catch(function (error) {
        console.error('Search1 failed:', error);
    });