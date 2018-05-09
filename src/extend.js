export default function extend(Nightmare, config) {
    addExtendDevice(Nightmare, config);
    
    addExtendCookies(Nightmare);

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

    Nightmare.prototype.exDevice = function (name, opts) {
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

function addExtendCookies(Nightmare) {
    Nightmare.action('exCookies',
        function (name, options, parent, win, renderer, done) {
            parent.on('did-start-loading', function (url, sessionCookies) {
                if (sessionCookies) {
                    parent.emit('log', 'Preloading cookies');

                    for (var i = 0; i < sessionCookies.length; i++) {
                        var details = Object.assign({ url: url }, sessionCookies[i]);
                        win.webContents.session.cookies.set(details, function (error) {
                            if (error) done(error);
                        });
                    }
                }
                parent.emit('did-start-loading');
            });
            done();
            return this;
        },
        function (cookies, url, done) {
            this.child.once('did-start-loading', done);

            if (typeof cookies === 'string') {
                // 如果 cookies 为字符串，则尝试转为数组
                function getCookieObject(cookie) {
                    let arr = cookie.split(';');
                    let result = [];

                    for (let i = 0; i < arr.length; i++) {
                        let cur = arr[i].trim().split('=');

                        result.push({
                            name: cur[0],
                            value: cur[1]
                        });
                    }

                    return result;
                }

                cookies = getCookieObject(cookies);
            } else if (!Array.isArray(cookies)) {
                // 如果 cookies 为对象，则尝试转为对象
                cookies = [cookies];
            }

            this.child.emit('did-start-loading', url, cookies);
        }
    );
}