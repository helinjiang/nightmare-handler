import _ from 'lodash';

const DEVICE = {
    'pc': {
        'UA': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.75 Safari/537.36 nightmare',
        'width': 1280,
        'height': 800
    },

    // iphone6 尺寸为 375*667，但是nightmare中滚动条的缘故，实际尺寸应该修改为 414*760
    'mobile': {
        'UA': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1 nightmare',
        'width': 414,
        'height': 760
    }
};

/**
 * 扩展 nightmare 的方法
 * @param Nightmare
 * @param extraDevice
 */
export default function addExtend(Nightmare, extraDevice) {
    // 合并传入的自定义设备
    const deviceMap = _.merge({}, DEVICE, extraDevice);

    Nightmare.prototype.exDevice = function (name, opts = {}) {
        const that = this;

        this.queue(function (done) {
            // 默认值为 mobile 场景
            if (!deviceMap[name]) {
                name = 'mobile';
            }

            // 设置ua
            that.child.call('useragent', opts.UA || deviceMap[name].UA, done);

            // 设置视窗大小
            that.child.call('size', opts.width || deviceMap[name].width, opts.height || deviceMap[name].height, done);

            done();
        });

        return this;
    };
}
