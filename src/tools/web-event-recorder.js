import WebEvent, { EVENT_NAME } from '../models/web-event';
import ResponseDetail from '../models/response-detail';

export default class WebEventRecorder {
    constructor(nightmare) {
        this.nightmare = nightmare;
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
            if (item.eventName !== EVENT_NAME.DID_GET_RESPONSE_DETAILS) {
                return;
            }

            result.push(new ResponseDetail(...item.args));
        });

        return result;
    }

    _init() {
        let self = this;

        // 注册事件
        if (this.nightmare) {
            Object.keys(EVENT_NAME).forEach((name) => {
                this.nightmare.on(EVENT_NAME[name], function (...args) {
                    self.add(EVENT_NAME[name], args);
                });
            });
        }

    }

    toString() {
        return JSON.stringify(this.queue);
    }
}