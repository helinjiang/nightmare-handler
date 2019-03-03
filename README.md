# nightmare-handler

扩展 nightmare，并提供一些工具。

## 安装

```
$ npm install nightmare-handler
```

## 使用

```
const nightmareHandler = require('nightmare-handler');

// 获得扩展之后的 Nightmare
const NightmarePlus = nightmareHandler.getNightmarePlus();

// 初始化 nightmare 对象
const nightmare = NightmarePlus({ show: true });

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
```

## 方法

### Nightmare 和 getNightmarePlus(config)

```
import { Nightmare, getNightmarePlus } from 'nightmare-handler';
```

`Nightmare` 就是 [nightmare](https://www.npmjs.com/package/nightmare) ，而 `getNightmarePlus(config)` 方法返回的对象是对 `Nightmare` 进行了扩展（[Extending Nightmare](https://github.com/segmentio/nightmare#extending-nightmare) ）等处理。


`getNightmarePlus(config)` 参数说明：

- `config.deviceMap`，设备配置，格式为 { name : { UA, width, height } }


已扩展的方法列表如下：

- [exDevice(name, opts)](docs/exDevice.md)
- [exCookies(cookies, url)](docs/exCookies.md)

如果上述提供的扩展方法不满足您的诉求，可以选择 [自定义扩展 NightmarePlus.extend(callExtend, opts)](docs/extend.md) 。

### 事件相关

nightmare 加载页面时，会产生一系列事件，具体请查看 [关于页面的事件](docs/events.md)