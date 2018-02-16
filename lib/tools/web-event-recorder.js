'use strict';

exports.__esModule = true;

var _webEvent = require('../models/web-event');

var _webEvent2 = _interopRequireDefault(_webEvent);

var _responseDetail = require('../models/response-detail');

var _responseDetail2 = _interopRequireDefault(_responseDetail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WebEventRecorder = function () {
    function WebEventRecorder(nightmare) {
        _classCallCheck(this, WebEventRecorder);

        this.nightmare = nightmare;
        this.queue = [];

        // 初始化
        this._init();
    }

    /**
     * 记录事件到队列中
     * @param {String} eventName 事件名称
     * @param {Array} args 参数列表
     */


    WebEventRecorder.prototype.add = function add(eventName, args) {
        this.queue.push(new _webEvent2.default(eventName, args));
    };

    /**
     * 获得所有的资源加载细节
     * @return {[ResponseDetail]}
     */


    WebEventRecorder.prototype.getAllResponseDetail = function getAllResponseDetail() {
        var result = [];

        this.queue.forEach(function (item) {
            if (item.eventName !== _webEvent.EVENT_NAME.DID_GET_RESPONSE_DETAILS) {
                return;
            }

            result.push(new (Function.prototype.bind.apply(_responseDetail2.default, [null].concat(item.args)))());
        });

        return result;
    };

    WebEventRecorder.prototype._init = function _init() {
        var _this = this;

        var self = this;

        // 注册事件
        if (this.nightmare) {
            Object.keys(_webEvent.EVENT_NAME).forEach(function (name) {
                _this.nightmare.on(_webEvent.EVENT_NAME[name], function () {
                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key];
                    }

                    self.add(_webEvent.EVENT_NAME[name], args);
                });
            });
        }
    };

    WebEventRecorder.prototype.toString = function toString() {
        return JSON.stringify(this.queue);
    };

    return WebEventRecorder;
}();

exports.default = WebEventRecorder;