/**
 * 扩展 nightmare 的方法
 * @param Nightmare
 */
export default function addExtend(Nightmare) {
    Nightmare.action('exScrollToBottom', function (done) {
        this.evaluate_now(() => {
            // 窗口的高度值
            const h = Math.max(
                document.documentElement.clientHeight,
                window.innerHeight || 0
            );

            // body实际高度
            const bodyH = document.body.scrollHeight;

            // 由于只滚动到底部，因此当前左右滚动轴的位置不变
            window.scrollTo(window.pageXOffset || 0, bodyH - h);
        }, done);
    });
}
