'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _webEvent = require('../models/web-event');

var _webEvent2 = _interopRequireDefault(_webEvent);

var _responseDetail = require('../models/response-detail');

var _responseDetail2 = _interopRequireDefault(_responseDetail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WebEventRecorder = function () {
    /**
     * WebEventRecorder
     *
     * @param {Object} [nightmare] Nightmare 的对象
     * @param {Object} [eventMap] 要监听的事件地点，形如 { CONSOLE: 'console'}，可参考 models/web-event 中的 EVENT_NAME
     */
    function WebEventRecorder(nightmare) {
        var eventMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _webEvent.EVENT_NAME;

        _classCallCheck(this, WebEventRecorder);

        this.eventMap = eventMap;

        this.queue = [];

        // 初始化
        this._init(nightmare);
    }

    /**
     * 记录事件到队列中
     * @param {String} eventName 事件名称
     * @param {Array} args 参数列表
     */


    _createClass(WebEventRecorder, [{
        key: 'add',
        value: function add(eventName, args) {
            this.queue.push(new _webEvent2.default(eventName, args));
        }

        /**
         * 获得所有的资源加载细节
         * @return {[ResponseDetail]}
         */

    }, {
        key: 'getAllResponseDetail',
        value: function getAllResponseDetail() {
            var _this = this;

            var result = [];

            this.queue.forEach(function (item) {
                if (item.eventName !== _this.eventMap.DID_GET_RESPONSE_DETAILS) {
                    return;
                }

                result.push(new (Function.prototype.bind.apply(_responseDetail2.default, [null].concat(_toConsumableArray(item.args))))());
            });

            return result;
        }
    }, {
        key: '_init',
        value: function _init(nightmare) {
            var self = this;

            // 注册事件
            if (nightmare && this.eventMap) {
                Object.keys(self.eventMap).forEach(function (name) {
                    nightmare.on(self.eventMap[name], function () {
                        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                            args[_key] = arguments[_key];
                        }

                        self.add(self.eventMap[name], args);
                    });
                });
            }
        }
    }, {
        key: 'toString',
        value: function toString() {
            return JSON.stringify(this.queue);
        }
    }]);

    return WebEventRecorder;
}();

exports.default = WebEventRecorder;