import Nightmare from 'nightmare';
import extend from './extend';

export Nightmare from 'nightmare';
export extend from './extend';

export ResponseDetail from './models/response-detail';
export WebEvent from './models/web-event';
export WebEventRecorder from './tools/web-event-recorder';

// 经过扩展等处理之后的 Nightmare
export const NightmarePlus = extend(Nightmare, {});
