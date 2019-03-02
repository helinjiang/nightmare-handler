const nightmareHandler = require('../lib');

const nightmare = nightmareHandler.NightmarePlus({ show: true });

function addExtendDevice(Nightmare, config) {
    var defaultConf = {
        // iphone6 尺寸为 375*667，但是nightmare中滚动条的缘故，实际尺寸应该修改为 414*760
        'mobile': {
            'UA': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1 TCUITEST',
            'width': 300,
            'height': 300
        }
    };

    Nightmare.prototype.exCustom = function (name, opts) {
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

addExtendDevice(nightmareHandler.Nightmare, {});

// 执行
nightmare
    .exCustom('mobile', { width: 500 })
    .goto('http://www.baidu.com')
    .wait('#index-bn')
    .evaluate(function () {
        return {
            title: document.title,
            searchBtnTxt: document.querySelector('#index-bn').innerText
        };
    })
    .end()
    .then(function (result) {
        console.log('success: ', result);
    })
    .catch(function (error) {
        console.error('error: ', error);
    });
