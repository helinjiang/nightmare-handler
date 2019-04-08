# exChangeMockStar(cookieString)

切换 mockstar 的指定桩数据 。

## API 说明

- `cookieString`：必须符合 `_ms=[{},{}]` 格式，建议使用 `mockstar.MockStarQuery` 的 `getCookieString()` 方法获取，具体详见 demo 。


## Example

> 更多示例请查看 [demo](../demo/extend-exChangeMockStar)。

```
const nightmareHandler = require('nightmare-handler');
const mockstar = require('mockstar');

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
```
