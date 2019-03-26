# exScrollToSelector(selector)

将页面滚动到指定的 `selector` 所在的位置。

## API 说明

- `selector` 选择器。

## Example

> 更多示例请查看 [demo](../demo/extend-exScrollToSelector)。


```
const nightmareHandler = require('nightmare-handler');

// 获得扩展之后的 Nightmare
const NightmarePlus = nightmareHandler.getNightmarePlus();

// 初始化 nightmare 对象
const nightmare = NightmarePlus({ show: true });

// 执行
nightmare
    .exDevice('pc', { width: 600, height: 300 })
    .goto('https://www.qq.com')
    .wait('#js_vtitle')
    .wait(1000)
    .exScrollToSelector('#js_vtitle')
    .wait(1000)
    .evaluate(function () {
        return {
            title: document.title,
            pageYOffset: window.pageYOffset,
            pageXOffset: window.pageXOffset,
            scrollHeight: document.body.scrollHeight
        };
    })
    .end()
    .then(function (result) {
        console.log('success: ', result);
    })
    .catch(function (error) {
        console.error('error: ', error);
    });
```
