import { getCookieList } from './util';

/**
 * 扩展 nightmare 的方法
 * @param Nightmare
 */
export default function addExtend(Nightmare) {
    Nightmare.action(
        'exMergeCookies',
        (name, options, parent, win, renderer, done) => {
            parent.respondTo('exMergeCookies', (sessionCookies, url, done) => {
                for (let i = 0; i < sessionCookies.length; i++) {
                    const details = Object.assign({ url: url }, sessionCookies[i]);
                    win.webContents.session.cookies.set(details, function (error) {
                        if (error) done(error);
                    });
                }

                done();
            });

            done();
        },
        function (cookies, url, done) {
            this.child.call('exMergeCookies', getCookieList(cookies), url, done);
        }
    );
}
