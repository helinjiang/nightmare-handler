import { getCookieList } from './util';

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
            parent.on('did-start-loading', function (sessionCookies, url) {
                if (sessionCookies) {
                    parent.emit('log', 'Preloading cookies');

                    for (let i = 0; i < sessionCookies.length; i++) {
                        const details = Object.assign({ url: url }, sessionCookies[i]);
                        // https://electronjs.org/docs/api/cookies
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

        /**
         *
         * @param cookies
         * @param {String} url Retrieves cookies which are associated with url. Empty implies retrieving cookies of all urls.
         * @param done
         */
        function (cookies, url, done) {
            this.child.once('did-start-loading', done);
            this.child.emit('did-start-loading', getCookieList(cookies), url);
        }
    );
}
