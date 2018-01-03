'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebEvent = exports.ResponseDetail = undefined;

var _nightmare = require('nightmare');

var _nightmare2 = _interopRequireDefault(_nightmare);

var _extend = require('./extend');

var _extend2 = _interopRequireDefault(_extend);

var _responseDetail = require('./models/response-detail');

var _responseDetail2 = _interopRequireDefault(_responseDetail);

var _webEvent = require('./models/web-event');

var _webEvent2 = _interopRequireDefault(_webEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.ResponseDetail = _responseDetail2.default;
exports.WebEvent = _webEvent2.default;


module.exports = (0, _extend2.default)(_nightmare2.default, {});