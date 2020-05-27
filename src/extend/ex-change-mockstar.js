/**
 * 扩展 nightmare 的方法
 * @param Nightmare
 */
export default function addExtend(Nightmare, opts) {
    Nightmare.action('exChangeMockStar', function (name, options, parent, win, renderer, done) {
            parent.respondTo('exChangeMockStar', (cookieString, opts, done) => {
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

                const reg = new RegExp('([^=]*)=(.*)');
                const matchResult = cookieString.match(reg);

                if (matchResult && (matchResult.length > 1)) {
                    const msKey = matchResult[1];
                    const msValue = matchResult[2];

                    // https://electronjs.org/docs/api/cookies#cookiesgetfilter-callback
                    // https://electronjs.org/docs/api/structures/cookie
                    win.webContents.session.cookies.get({ url: url, name: msKey }, function (error, cookies) {
                        if (error) {
                            return done(error);
                        }

                        function getNewValue(oldCookieItem, mergeValue, key) {
                            let oldList = oldCookieItem && JSON.parse(oldCookieItem.value) || [];
                            let mergeList = JSON.parse(mergeValue);

                            let oldMap = {};
                            let mergeMap = {};

                            oldList.forEach((item) => {
                                oldMap[item[key]] = item;
                            });

                            mergeList.forEach((item) => {
                                mergeMap[item[key]] = item;
                            });

                            // TODO Object.assign 是浅拷贝，会将值全部覆盖，使用 _.merge 会更好，但是这里无法 require 组件
                            let allMap = Object.assign({}, oldMap, mergeMap);

                            return Object.keys(allMap).map((name) => {
                                return allMap[name];
                            });
                        }

                        let newValue;
                        try {
                            let list = getNewValue(cookies[0], msValue, opts.key);
                            newValue = JSON.stringify(list);
                        } catch (e) {

                        }

                        const details = {
                            url: url,
                            name: msKey,
                            value: newValue
                        };

                        // 自主设置 domain，以便解决跨域请求时不携带 cookie 的问题
                        if (opts.domain) {
                            details.domain = opts.domain;
                        }

                        // https://electronjs.org/docs/api/cookies#cookiessetdetails-callback
                        win.webContents.session.cookies.set(details, function (error) {
                            if (error) {
                                done(error);
                            }
                        });
                    });
                }

                done();
            });

            done();
        }, function (cookieString, params, done) {
            this.child.call('exChangeMockStar', cookieString, Object.assign({}, opts, params), done);
        }
    );
}