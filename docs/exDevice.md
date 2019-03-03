# exDevice

指定 UA 和视窗大小，用于模拟设备和场景。

## API 说明

- `name`：模拟设备名字，默认值为 `mobile`
- `opts`：额外的一些参数
  - `opts.UA`：user agent，例如 `Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1`
  - `opts.width`：视窗宽度，例如 `414`
  - `opts.height`：视窗高度，例如 `760`

### demo

查看 [demo](../demo/extend-exDevice)。

### 可选的模拟设备列表

#### mobile

适用于移动端测试场景，是 iPhone 6 的尺寸。

> iphone6 尺寸为 `375*667`，但是 nightmare 中滚动条的缘故，实际尺寸应该修改为 `414*760`

```
{
    'UA': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1 nightmare',
    'width': 414,
    'height': 760
}
```

#### pc

适用于 PC 测试场景。

```
{
    'UA': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.75 Safari/537.36 nightmare',
    'width': 1280,
    'height': 800
}
```

## Example

### 指定场景

```
const nightmareHandler = require('nightmare-handler');

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
            height: window.innerHeight
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

### 指定场景及自定义宽高