import Nightmare from 'nightmare';
import extend from './extend';

export Nightmare from 'nightmare';

export ResponseDetail, { RESOURCE_TYPE } from './models/response-detail';
export WebEvent from './models/web-event';
export WebEventRecorder from './tools/web-event-recorder';

/**
 * 经过扩展等处理之后的 Nightmare
 * 即将被废弃，请使用 getNightmarePlus() 方法
 * @deprecated
 */
export const NightmarePlus = getNightmarePlus({});

/**
 * 获取扩展之后的 Nightmare
 * @param {Object} [config] 额外配置
 */
export function getNightmarePlus(config = {}) {
    return extend(Nightmare, config);
}
