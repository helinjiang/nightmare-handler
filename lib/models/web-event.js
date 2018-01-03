"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * https://electronjs.org/docs/api/web-contents#%E4%BA%8B%E4%BB%B6
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

    _createClass(WebEvent, [{
        key: "toString",
        value: function toString() {
            return this.t + " " + this.eventName + " " + JSON.stringify(this.args);
        }
    }]);

    return WebEvent;
}();

exports.default = WebEvent;