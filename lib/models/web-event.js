'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EVENT_NAME = exports.EVENT_NAME = {
    CONSOLE: 'console',
    PAGE: 'page'
};

/**
 * https://electronjs.org/docs/api/web-contents#class-webcontents
 */

var WebEvent = function () {
    /**
     * @param {String} eventName 时间名称
     * @param {Array} args 参数列表
     */
    function WebEvent(eventName) {
        var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

        _classCallCheck(this, WebEvent);

        this.eventName = eventName;
        this.args = args;
        this.t = Date.now();
    }

    WebEvent.prototype.toString = function toString() {
        return this.t + ' ' + this.eventName + ' ' + JSON.stringify(this.args);
    };

    return WebEvent;
}();

exports.default = WebEvent;