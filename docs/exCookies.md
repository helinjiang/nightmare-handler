# exCookies(cookies, url)

为指定的url地址注入 cookie 。

## 1. API 说明

- `cookies`：需要注入的 cookies，支持字符串（`myKey=myValue; myKey3=myValue3`）和对象数组（`[{ name: 'myKey', value: 'myValue' }, { name: 'myKey3',value: 'myValue3' }]`）两种格式
- `url`：cookie 要绑定的地址，建议设置为站点根地址，例如 'https://now.qq.com'

> 注意，该方法需要在打开页面之前调用，例如 `goto` 之前调用。如果你需要在页面打开之后，更换 cookie，则请用 [exMergeCookies](./exMergeCookies.md)。

### 1.1 cookies 格式：字符串

参考示例： [cookies-str.js](../demo/extend-exCookies/cookies-str.js)

```js
// 需要设置的 cookie
const cookies = 'myKey=myValue; myKey3=myValue3';
```

### 1.2 cookies 格式：对象

参考示例： [cookies-object.js](../demo/extend-exCookies/cookies-object.js)

```js
// 需要设置的 cookie
const cookies = {
    myKey1: 'myValue1',
    myKey2: 'myValue2'
};
```

### 1.3 cookies 格式：特定格式的对象

由于我们调用是 [electron.js cookies api](https://electronjs.org/docs/api/cookies) 来设置 cookie 的，因此可以传递其要求的格式，即一个键值对 `{name: String, value: String}`。参考示例： [cookies-object-original.js](../demo/extend-exCookies/cookies-object-original.js)

> 注意这种形式一次只能设置一个 cookie

```js
// 需要设置的 cookie
const cookies = {
    name: 'myKey',
    value: 'myValue'
};
```

### 1.4 cookies 格式：特定格式的对象数组

参考示例： [cookies-array.js](../demo/extend-exCookies/cookies-array.js)

```js
// 需要设置的 cookie
const cookies = [{
    name: 'myKey',
    value: 'myValue'
}, {
    name: 'myKey3',
    value: 'myValue3'
}];
```


## 2. Example

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
