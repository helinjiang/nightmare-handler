import WebEvent, { EVENT_NAME } from '../models/web-event';
import ResponseDetail from '../models/response-detail';

export default class WebEventRecorder {
    /**
     * WebEventRecorder
     *
     * @param {Object} [nightmare] Nightmare 的对象
     * @param {Object} [eventMap] 要监听的事件地点，形如 { CONSOLE: 'console'}，可参考 models/web-event 中的 EVENT_NAME
     */
    constructor(nightmare, eventMap = EVENT_NAME) {
        this.nightmare = nightmare;
        this.eventMap = eventMap;

        this.queue = [];

        // 初始化
        this._init();
    }

    /**
     * 记录事件到队列中
     * @param {String} eventName 事件名称
     * @param {Array} args 参数列表
     */
    add(eventName, args) {
        this.queue.push(new WebEvent(eventName, args));
    }

    /**
     * 获得所有的资源加载细节
     * @return {[ResponseDetail]}
     */
    getAllResponseDetail() {
        let result = [];

        this.queue.forEach((item) => {
            if (item.eventName !== this.eventMap.DID_GET_RESPONSE_DETAILS) {
                return;
            }

            result.push(new ResponseDetail(...item.args));
        });

        return result;
    }

    _init() {
        let self = this;

        // 注册事件
        if (this.nightmare && this.eventMap) {
            Object.keys(self.eventMap).forEach((name) => {
                this.nightmare.on(self.eventMap[name], function (...args) {
                    self.add(self.eventMap[name], args);
                });
            });
        }

    }

    toString() {
        return JSON.stringify(this.queue);
    }
}