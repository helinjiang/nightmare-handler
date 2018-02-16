# nightmare-handler

扩展 nightmare，并提供一些工具。

## 扩展的方法

### device(name, opts)

指定 UA 和视窗大小，用于模拟设备和场景。

- `name`：名字，默认提供了两个场景： `pc` 和 `mobile`（默认值）
- `opts`：额外的一些参数，支持 `width` 和 `height`

## 关于页面的事件

nightmare 加载页面时，会产生一系列事件，通过这些事件，我们能够知道页面和资源加载的情况。我们选择一些事件定义在了 `/models/web-event.js` 中的 `EVENT_NAME` 中，更多的内容可以阅读以下文档：

- https://github.com/segmentio/nightmare#extract-from-the-page
- https://electronjs.org/docs/api/web-contents#class-webcontents

### WebEvents 类和 WebEventRecorder 类

为了更好的处理，在 `/models/web-event.js` 中定义了 WebEvents 类，封装事件；而为了记录这些事件，我们在 `/tools/web-event-recorder.js` 中定义了 WebEventRecorder 类，使用方法如下，即可记录所有的页面加载的事件。

```
var recorder = new WebEventRecorder(nightmare);
```

### web-events 的顺序

这些事件的触发有一定的顺序。一个正常的顺序为：

- `did-start-loading` （最先开始触发）
- `did-get-redirect-request`（301等重定向才会有）
- `did-get-response-details`（加载html，resourceType=`mainFrame`）
- `did-get-response-details`（加载其他资源，例如 `image`、`script` 等）
- ...
- `did-get-response-details`（加载其他资源，例如 `image`、`script` 等）
- `dom-ready`（dom 加载完成，即将开始执行body后面的脚本）
- `did-get-response-details`（加载其他资源，因为脚本执行之后可能需要加载更多资源，例如 `image`、`script` 等）
- ...
- `did-get-response-details`（加载其他资源，因为脚本执行之后可能需要加载更多资源，例如 `image`、`script` 等）
- `did-frame-finish-load`
- `did-finish-load` （与 did-frame-finish-load 基本上是同一时间触发，window.onload 之后触发）
- `did-stop-loading` （最后结束）

### contentType 与 resourceType 的关系

`contentType` 是指 `headers` 中的 `Content-Type`，可以自定义值返回。而 `resourceType` 指的是资源的类型。

以返回 `https://www.baidu.com` 为例，搜集了一些对应关系。

| contentType | resourceType | 备注 |
| --- | --- | --- |
| `text/html; charset=utf-8` | `mainFrame` | html页面 |
| `text/css` | `stylesheet` | CSS外联样式表 |
| `baiduApp/json; v6.27.2.14; charset=UTF-8` | `xhr` | 查询历史搜索记录 |
| `text/html; charset=utf-8` | `xhr` | xhr请求 |
| `text/html;charset=utf-8` | `xhr` | xhr请求 |
| `text/javascript; charset=gbk` | `script` | jsonp等场景 |
| `text/javascript; charset=utf-8` | `script` | jsonp等场景 |
| `application/javascript` | `script` | js外联 |
| `image/jpeg` | `image` | 图片 |
| `image/gif` | `image` | 图片 |
| `image/png` | `image` | 图片 |