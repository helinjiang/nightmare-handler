# nightmare-handler

扩展 nightmare，并提供一些工具。

## 扩展的方法

### device(name, opts)

指定 UA 和视窗大小，用于模拟设备和场景。

- `name`：名字，默认提供了两个场景： `pc` 和 `mobile`（默认值）
- `opts`：额外的一些参数，支持 `width` 和 `height`

## web-events 的顺序

比较有价值的页面事件已经在 `./src/models/web-event.js` 中定义了 `EVENT_NAME`。这些事件的触发有一定的顺序。

一个相对正常的顺序为：

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