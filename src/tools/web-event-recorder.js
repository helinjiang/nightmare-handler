import WebEvent, { EVENT_NAME } from '../models/web-event';
import ResponseDetail from '../models/response-detail';

export default class WebEventRecorder {
    constructor(nightmare) {
        this.nightmare = nightmare;
        this.queue = [];

        this._init();
    }

    add(eventName, args) {
        this.queue.push(new WebEvent(eventName, args));
    }

    _init() {
        let self = this;

        // 注册事件
        Object.keys(EVENT_NAME).forEach((name) => {
            this.nightmare.on(EVENT_NAME[name], function (...args) {
                self.add(EVENT_NAME[name], args);
            });
        });

    }

    toString() {
        return JSON.stringify(this.queue);
    }
}