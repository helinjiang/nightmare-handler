/**
 * https://electronjs.org/docs/api/web-contents#%E4%BA%8B%E4%BB%B6
 */
export default class WebEvent {
    /**
     * @param {String} eventName 时间名称
     * @param {Array} args 参数列表
     */
    constructor(eventName, args = []) {
        this.eventName = eventName;
        this.args = args;
        this.t = Date.now();
    }

    toString() {
        return `${this.t} ${this.eventName} ${JSON.stringify(this.args)}`;
    }
}
