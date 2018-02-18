'use strict';

exports.__esModule = true;
exports.NightmarePlus = exports.WebEventRecorder = exports.WebEvent = exports.ResponseDetail = exports.extend = exports.Nightmare = undefined;

var _nightmare = require('nightmare');

var _nightmare2 = _interopRequireDefault(_nightmare);

var _extend2 = require('./extend');

var _extend3 = _interopRequireDefault(_extend2);

var _responseDetail = require('./models/response-detail');

var _responseDetail2 = _interopRequireDefault(_responseDetail);

var _webEvent = require('./models/web-event');

var _webEvent2 = _interopRequireDefault(_webEvent);

var _webEventRecorder = require('./tools/web-event-recorder');

var _webEventRecorder2 = _interopRequireDefault(_webEventRecorder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Nightmare = _nightmare2.default;
exports.extend = _extend3.default;
exports.ResponseDetail = _responseDetail2.default;
exports.WebEvent = _webEvent2.default;
exports.WebEventRecorder = _webEventRecorder2.default;

// 经过扩展等处理之后的 Nightmare

var NightmarePlus = exports.NightmarePlus = (0, _extend3.default)(_nightmare2.default, {});