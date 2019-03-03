'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extend;

var _exDevice = require('./ex-device');

var _exDevice2 = _interopRequireDefault(_exDevice);

var _exCookies = require('./ex-cookies');

var _exCookies2 = _interopRequireDefault(_exCookies);

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

  (0, _exCookies2.default)(Nightmare);

  return Nightmare;
}