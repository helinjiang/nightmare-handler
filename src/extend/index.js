import addExtendDevice from './ex-device';

export default function index(Nightmare, config) {
    addExtendDevice(Nightmare, config);
    
    addExtendCookies(Nightmare);

    return Nightmare;
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