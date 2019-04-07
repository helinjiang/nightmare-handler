import { getCookieList } from './util';

/**
 * 扩展 nightmare 的方法
 * @param Nightmare
 */
export default function addExtend(Nightmare) {
    Nightmare.action(
        'exMergeCookies',
        (name, options, parent, win, renderer, done) => {
            parent.respondTo('exMergeCookies', (sessionCookies, done) => {
                /**
                 * 从 url 中获得根地址，以便用于绑定 cookie。
                 * 例如传入：https://www.navossoc.com/tests/cookie.php
                 * 获得：https://www.navossoc.com
                 * @param fullUrl
                 */
                function getUrlFromFullUrl(fullUrl) {
                    let reg = new RegExp('(^https?://[^/]*)/(.*)');
                    let matchResult = fullUrl.match(reg);
                    return matchResult && (matchResult.length > 1) && matchResult[1] || '';
                }

                const url = getUrlFromFullUrl(win.webContents.getURL());

                // 设置 cookie 需要依次设置
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
        function (cookies, done) {
            this.child.call('exMergeCookies', getCookieList(cookies), done);
        }
    );
}