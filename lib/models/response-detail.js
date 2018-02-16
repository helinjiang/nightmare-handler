'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 资源类型，都是固定值， electron 目前定义了 8 种类型。
 * 具体定义在 https://github.com/electron/electron/blob/master/atom/browser/net/atom_network_delegate.cc#L23
 *
 * @type {Object}
 */
var RESOURCE_TYPE = exports.RESOURCE_TYPE = {
    MAIN_FRAME: 'frame',
    SUB_FRAME: 'subFrame',
    STYLESHEET: 'stylesheet',
    SCRIPT: 'script',
    IMAGE: 'image',
    OBJECT: 'object',
    XHR: 'console',
    OTHER: 'other'
};

/**
 * https://electronjs.org/docs/api/web-contents#event-did-get-response-details
 * Emitted when details regarding a requested resource are available.
 */

var ResponseDetail = function () {
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
    function ResponseDetail(event, status, newURL, originalURL, httpResponseCode, requestMethod, referrer, headers, resourceType) {
        _classCallCheck(this, ResponseDetail);

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

    ResponseDetail.prototype.init = function init() {
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
    };

    ResponseDetail.prototype.toString = function toString() {
        console.log(this.originalURL, this.contentLength, (this.contentLength / 1024).toFixed(2) + 'kb');
    };

    return ResponseDetail;
}();

exports.default = ResponseDetail;