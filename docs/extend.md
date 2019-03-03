# 自定义扩展 NightmarePlus.extend(callExtend, opts)



使用 `getNightmarePlus()` 获得的对象中，可以调用其方法 `extend(callExtend, opts)` 进行自定义扩展。

## callExtend

`callExtend` 为方法，接收两个参数 `Nightmare` 和 `opts`。而方法内的使用方式与官方介绍的 [Extending Nightmare](https://github.com/segmentio/nightmare#extending-nightmare) 是一致的。

```
function addExtendSize(Nightmare, opts) {
    Nightmare.action('size', function (done) {
        console.log('size opts', opts);

        this.evaluate_now(() => {
            const w = Math.max(
                document.documentElement.clientWidth,
                window.innerWidth || 0
            );
            const h = Math.max(
                document.documentElement.clientHeight,
                window.innerHeight || 0
            );
            return {
                height: h,
                width: w
            };
        }, done);
    });
}
```

## opts

该参数会透传到 `callExtend` 方法内。

## Example

详细的例子请查看[demo](../demo/extend)。