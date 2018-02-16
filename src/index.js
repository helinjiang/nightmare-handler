import Nightmare from 'nightmare';
import extend from './extend';

export ResponseDetail from './models/response-detail';
export WebEvent from './models/web-event';

export WebEventRecorder from './tools/web-event-recorder';

module.exports = extend(Nightmare, {});