# exCookies(cookies, url)

为指定的url地址注入 cookie 。

## API 说明

- `cookies`：需要注入的 cookies，支持字符串（`myKey=myValue; myKey3=myValue3`）和对象数组（`[{ name: 'myKey', value: 'myValue' }, { name: 'myKey3',value: 'myValue3' }]`）两种格式
- `url`：cookie 要绑定的地址，建议设置站点根地址，例如 'https://now.qq.com'

> 注意，该方法需要在打开页面之前调用，例如 `goto` 之前调用。如果你需要在页面打开之后，更换 cookie，则请用 [exMergeCookies](./exMergeCookies.md)。

## Example

> 更多示例请查看 [demo](../demo/extend-exCookies)。

```
const nightmareHandler = require('nightmare-handler');

// 需要设置的 cookie
const cookies = 'myKey=myValue; myKey3=myValue3';

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
```
