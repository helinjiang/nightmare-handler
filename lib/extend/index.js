'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = extend;

var _exDevice = require('./ex-device');

var _exDevice2 = _interopRequireDefault(_exDevice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 扩展
 * @param Nightmare
 * @param {Object} [config] 配置
 * @param {Object} [config.deviceMap] 设备配置，格式为 {name:{UA,width,height}}
 * @return {*}
 */
function extend(Nightmare) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    (0, _exDevice2.default)(Nightmare, config.deviceMap);

    addExtendCookies(Nightmare);

    return Nightmare;
}

function addExtendCookies(Nightmare) {
    Nightmare.action('exCookies', function (name, options, parent, win, renderer, done) {
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
    }, function (cookies, url, done) {
        this.child.once('did-start-loading', done);

        if (typeof cookies === 'string') {
            // 如果 cookies 为字符串，则尝试转为数组
            var getCookieObject = function getCookieObject(cookie) {
                var arr = cookie.split(';');
                var result = [];

                for (var i = 0; i < arr.length; i++) {
                    var cur = arr[i].trim().split('=');

                    result.push({
                        name: cur[0],
                        value: cur[1]
                    });
                }

                return result;
            };

            cookies = getCookieObject(cookies);
        } else if (!Array.isArray(cookies)) {
            // 如果 cookies 为对象，则尝试转为对象
            cookies = [cookies];
        }

        this.child.emit('did-start-loading', url, cookies);
    });
}