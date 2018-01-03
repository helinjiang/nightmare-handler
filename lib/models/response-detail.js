'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * https://electronjs.org/docs/api/web-contents#event-did-get-response-details
 */
var ResponseDetail = function () {
    /**
     *
     * @param {Event} event
     * @param {Boolean} status
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

        this.eventName = 'event-did-get-response-details';
        this.t = Date.now();

        this.init();
    }

    _createClass(ResponseDetail, [{
        key: 'init',
        value: function init() {

            this.contentType = this.headers['content-type'] && this.headers['content-type'][0] || '';
            this.contentLength = parseInt(this.headers['content-length'] || 0);
        }
    }, {
        key: 'toString',
        value: function toString() {
            console.log(this.originalURL, this.contentLength, (this.contentLength / 1024).toFixed(2) + 'kb');
        }
    }]);

    return ResponseDetail;
}();

exports.default = ResponseDetail;