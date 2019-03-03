import addExtendDevice from './ex-device';
import addExtendCookies from './ex-cookies';

/**
 * 扩展
 * @param Nightmare
 * @param {Object} [config] 配置
 * @param {Object} [config.deviceMap] 设备配置，格式为 {name:{UA,width,height}}
 * @return {*}
 */
export default function extend(Nightmare, config = {}) {
    addExtendDevice(Nightmare, config.deviceMap);

    addExtendCookies(Nightmare);

    // 提供自定义扩展的能力
    Nightmare.extend = function (callExtend, opts) {
        if (typeof callExtend !== 'function') {
            throw new Error('Nightmare.extend first argument must be function!');
        }

        callExtend(Nightmare, opts);
    };

    return Nightmare;
}
