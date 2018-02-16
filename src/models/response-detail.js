/**
 * https://electronjs.org/docs/api/web-contents#event-did-get-response-details
 * Emitted when details regarding a requested resource are available.
 */
export default class ResponseDetail {
    /**
     *
     * @param {Event} event
     * @param {Boolean} status indicates the socket connection to download the resource
     * @param {String} newURL
     * @param {String} originalURL
     * @param {Number} httpResponseCode
     * @param {String} requestMethod
     * @param {String} referrer
     * @param {Object} headers
     * @param {String} resourceType
     */
    constructor(event, status, newURL, originalURL, httpResponseCode, requestMethod, referrer, headers, resourceType) {
        this.event = event;
        this.status = status;
        this.newURL = newURL;
        this.originalURL = originalURL;
        this.httpResponseCode = httpResponseCode;
        this.requestMethod = requestMethod;
        this.referrer = referrer;
        this.headers = headers;
        this.resourceType = resourceType;

        this.t = Date.now();

        this.init();
    }

    init() {
        /**
         * 内容类型，与 resourceType 的有一定的关系。
         text/html; charset=utf-8 : mainFrame html页面
         text/css : stylesheet CSS外联样式表
         baiduApp/json; v6.27.2.14; charset=UTF-8 : xhr 查询历史搜索记录
         text/html; charset=utf-8 : xhr xhr请求
         text/html;charset=utf-8 : xhr xhr请求
         text/javascript; charset=gbk : script jsonp形式的返回
         text/javascript; charset=utf-8 : script jsonp形式的返回
         application/javascript : script js外联
         image/jpeg : image 图片
         image/gif : image 图片
         image/png : image 图片
         * @type {String}
         */
        this.contentType = this.headers['content-type'] && this.headers['content-type'][0] || '';


        this.contentLength = parseInt(this.headers['content-length'] || 0);
    }

    toString() {
        console.log(this.originalURL, this.contentLength, (this.contentLength / 1024).toFixed(2) + 'kb');
    }
}
