/**
 * 扩展 nightmare 的方法
 * @param Nightmare
 */
export default function addExtend(Nightmare) {
    Nightmare.action('exScrollToTop', function (done) {
        this.evaluate_now(() => {
            // 由于只滚动到底部，因此当前左右滚动轴的位置不变
            window.scrollTo(window.pageXOffset || 0, 0);
        }, done);
    });
}
