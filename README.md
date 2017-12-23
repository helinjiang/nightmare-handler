# nightmare-handler

扩展 nightmare，并提供一些工具。

## 扩展的方法

### device(name, opts)

指定 UA 和视窗大小，用于模拟设备和场景。

- `name`：名字，默认提供了两个场景： `pc` 和 `mobile`（默认值）
- `opts`：额外的一些参数，支持 `width` 和 `height`
