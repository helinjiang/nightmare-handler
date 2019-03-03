/**
 * 扩展 nightmare 的方法
 *
 * https://github.com/segmentio/nightmare#extending-nightmare
 *
 * @param Nightmare
 */
export default function addExtend(Nightmare) {
    Nightmare.action('exCookies',
        function (name, options, parent, win, renderer, done) {
            parent.on('did-start-loading', function (url, sessionCookies) {
                if (sessionCookies) {
                    parent.emit('log', 'Preloading cookies');

                    for (let i = 0; i < sessionCookies.length; i++) {
                        const details = Object.assign({ url: url }, sessionCookies[i]);
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
                cookies = (function (cookiesStr) {
                    let arr = cookiesStr.split(';');
                    let result = [];

                    for (let i = 0; i < arr.length; i++) {
                        let cur = arr[i].trim().split('=');

                        result.push({
                            name: cur[0],
                            value: cur[1]
                        });
                    }

                    return result;
                })(cookies);
            } else if (!Array.isArray(cookies)) {
                // 如果 cookies 为对象，则尝试转为对象
                cookies = [cookies];
            }

            this.child.emit('did-start-loading', url, cookies);
        }
    );
}
