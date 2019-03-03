# nightmare-handler

扩展 nightmare，并提供一些工具。

## 安装

```
$ npm install nightmare-handler
```

## 使用

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

## 方法

### Nightmare 和 NightmarePlus

```
import { Nightmare, NightmarePlus } from 'nightmare-handler';
```

`Nightmare` 就是 [nightmare](https://www.npmjs.com/package/nightmare) ，而 `NightmarePlus` 是对 `Nightmare` 进行了扩展（[Extending Nightmare](https://github.com/segmentio/nightmare#extending-nightmare) ）等处理。

已扩展的方法列表如下：

- [exDevice](docs/exDevice.md)

### 事件相关

nightmare 加载页面时，会产生一系列事件，具体请查看 [关于页面的事件](docs/events.md)