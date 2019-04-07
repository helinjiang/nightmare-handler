# exMergeCookies(cookies)

为当前的页面变更 cookie ，如果有同样的key，则会覆盖旧值。

## API 说明

- `cookies`：需要注入的 cookies，支持字符串（`myKey=myValue; myKey3=myValue3`）和对象数组（`[{ name: 'myKey', value: 'myValue' }, { name: 'myKey3',value: 'myValue3' }]`）两种格式

> 注意，该方法需要在打开页面之后调用，例如 `goto` 之后调用。如果你需要在页面打开之前设置 cookie，则请用 [exCookies](./exCookies.md)。

## Example

> 更多示例请查看 [demo](../demo/extend-exMergeCookies)。

```
const nightmareHandler = require('nightmare-handler');

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
            cookie: document.cookie,
            pageUrl: location.href
        };
    })
    .then(function (result) {
        // { cookie: 'myKey=myValue; myKey3=myValue3' }
        console.log('1', result);

        nightmare
            .exMergeCookies(cookies2)
            .evaluate(function () {
                return {
                    cookie: document.cookie,
                    pageUrl: location.href
                };
            })
            .end()
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
```
