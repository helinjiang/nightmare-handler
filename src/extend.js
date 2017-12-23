export default function extend(Nightmare, config) {
    addExtendDevice(Nightmare, config);

    return Nightmare;
}

function addExtendDevice(Nightmare, config) {
    var defaultConf = {
        'pc': {
            'UA': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.75 Safari/537.36 NIGHTMARE',
            'width': 1280,
            'height': 800
        },

        // iphone6 尺寸为 375*667，但是nightmare中滚动条的缘故，实际尺寸应该修改为 414*760
        'mobile': {
            'UA': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1 TCUITEST',
            'width': 414,
            'height': 760
        }
    };

    Nightmare.prototype.device = function (name, opts) {
        var deviceConf = Object.assign(defaultConf, config.deviceConfig);
        var opts = Object.assign({}, opts);
        var that = this;

        this.queue(function (done) {
            if (!deviceConf[name]) {
                name = 'mobile';
            }

            that.child.call('useragent', deviceConf[name].UA, done);
            that.child.call('size', opts.width || deviceConf[name].width, opts.height || deviceConf[name].height, done);

            done();
        });

        return this;
    };
}