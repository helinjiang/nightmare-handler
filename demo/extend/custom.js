const nightmareHandler = require('../../lib');

// 获得扩展之后的 Nightmare
const NightmarePlus = nightmareHandler.getNightmarePlus();

// 自定义扩展函数： 获得视窗大小
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

// 自定义扩展
NightmarePlus.extend(addExtendSize, { other: 'hello,world' });

// 初始化 nightmare 对象
const nightmare = NightmarePlus({ show: true });

// 执行
nightmare
    .exDevice('mobile')
    .goto('http://www.baidu.com')
    .wait('#index-bn')
    .size()
    .end()
    .then(function (size) {
        console.log('success: ', size);
    })
    .catch(function (error) {
        console.error('error: ', error);
    });
