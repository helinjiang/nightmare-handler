/**
 * 扩展 nightmare 的方法
 * @param Nightmare
 */
export default function addExtend(Nightmare) {
    Nightmare.action('exScrollToSelector', function (selector, done) {
        this.evaluate_now((selector) => {
            const elem = document.querySelector(selector);

            // 如果元素不存在，则不处理
            if (!elem) {
                return;
            }

            // 该元素相对底部的值
            const x = elem.offsetLeft || 0;
            const y = elem.offsetTop || 0;

            // 由于只滚动到底部，因此当前左右滚动轴的位置不变
            window.scrollTo(x, y);
        }, done, selector);
    });
}
