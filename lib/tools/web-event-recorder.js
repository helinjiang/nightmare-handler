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

        this._init();
    }

    WebEventRecorder.prototype.add = function add(eventName, args) {
        this.queue.push(new _webEvent2.default(eventName, args));
    };

    WebEventRecorder.prototype._init = function _init() {
        var _this = this;

        var self = this;

        // 注册事件
        Object.keys(_webEvent.EVENT_NAME).forEach(function (name) {
            _this.nightmare.on(_webEvent.EVENT_NAME[name], function () {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                self.add(_webEvent.EVENT_NAME[name], args);
            });
        });
    };

    WebEventRecorder.prototype.toString = function toString() {
        return JSON.stringify(this.queue);
    };

    return WebEventRecorder;
}();

exports.default = WebEventRecorder;