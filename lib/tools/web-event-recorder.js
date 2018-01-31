'use strict';

exports.__esModule = true;

var _webEvent = require('../models/web-event');

var _webEvent2 = _interopRequireDefault(_webEvent);

var _responseDetail = require('../models/response-detail');

var _responseDetail2 = _interopRequireDefault(_responseDetail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WebEventRecorder = function () {
    function WebEventRecorder(nightmare) {
        _classCallCheck(this, WebEventRecorder);

        this.nightmare = nightmare;
        this.queue = [];

        this._init();
    }

    WebEventRecorder.prototype._init = function _init() {
        var self = this;

        // https://github.com/segmentio/nightmare#onconsole-functiontype--arguments-
        // type will be either log, warn or error and arguments are what gets passed from the console. This event is not triggered if the injected javascript code (e.g. via .evaluate()) is using console.log.
        this.nightmare.on('console', function () {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            self.queue.push(new _webEvent2.default(_webEvent.EVENT_NAME.CONSOLE, args));
        });

        // https://github.com/segmentio/nightmare#page-events
        // Listens for window.addEventListener('error'), alert(...), prompt(...) & confirm(...).
        this.nightmare.on('page', function () {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            self.queue.push(new _webEvent2.default(_webEvent.EVENT_NAME.PAGE, args));
        });

        // 页面开始加载之前触发，只触发一次，是最先触发的
        // https://electronjs.org/docs/api/web-contents#event-did-start-loading
        // Corresponds to the points in time when the spinner of the tab started spinning.
        this.nightmare.on('did-start-loading', function () {
            console.log('[did-start-loading]');
        });

        // 资源加载时进行触发，会触发多次。这里的资源包括 html、image、cgi、mp4 等请求。
        // https://electronjs.org/docs/api/web-contents#event-did-get-response-details
        // Emitted when details regarding a requested resource are available. status indicates the socket connection to download the resource.
        this.nightmare.on('did-get-response-details', function (event, status, newURL, originalURL, httpResponseCode, requestMethod, referrer, headers, resourceType) {
            /**
             event Event
             status Boolean
             newURL String
             originalURL String
             httpResponseCode Integer
             requestMethod String
             referrer String
             headers Object
             resourceType String
             */
            console.log(resourceType, headers['content-type'], headers['content-length'], originalURL);

            // handleResponse.add(
            //     new ResponseItem(event, status, newURL, originalURL, httpResponseCode, requestMethod, referrer, headers,
            //         resourceType));
        });

        // mainFrame本身（即html文件）加载完成即触发，在did-frame-finish-load之前
        // https://electronjs.org/docs/api/web-contents#event-dom-ready
        // Emitted when the document in the given frame is loaded.
        this.nightmare.on('dom-ready', function (event) {
            console.log('[dom-ready]', event);
        });

        // mainFrame undefined https://now.qq.com/
        // html 页面加载完成就触发，此时其他资源不一定加载完成了，只触发一次
        // https://electronjs.org/docs/api/web-contents#event-did-frame-finish-load
        // 当框架完成导航（navigation）时触发
        this.nightmare.on('did-frame-finish-load', function (event, isMainFrame) {
            console.log('[did-frame-finish-load]', event, isMainFrame);
        });

        // 页面加载完成时触发，相当于 onload，只触发一次
        // https://electronjs.org/docs/api/web-contents#event-did-finish-load
        // 导航完成时触发，即选项卡的旋转器将停止旋转，并指派onload事件后。
        this.nightmare.on('did-finish-load', function () {
            console.log('[did-finish-load]');
        });

        // 页面停止加载时触发，只触发一次，在 did-finish-load 之后
        // https://electronjs.org/docs/api/web-contents#event-did-stop-loading
        // Corresponds to the points in time when the spinner of the tab stopped spinning.
        this.nightmare.on('did-stop-loading', function () {
            console.log('[did-stop-loading]');
        });

        // 重定向时触发，例如可以构造一个404才测试
        // https://electronjs.org/docs/api/web-contents#event-did-get-redirect-request
        // Emitted when a redirect is received while requesting a resource.
        this.nightmare.on('did-get-redirect-request', function (event, oldURL, newURL, isMainFrame, httpResponseCode, requestMethod, referrer, headers) {
            console.log('[did-get-redirect-request]', oldURL, newURL, isMainFrame);
        });

        // mp4 等媒体文件开始播放时触发
        // https://electronjs.org/docs/api/web-contents#event-media-started-playing
        // Emitted when media starts playing.
        this.nightmare.on('media-started-playing', function () {
            console.log('[media-started-playing]');
        });
    };

    WebEventRecorder.prototype.toString = function toString() {
        return JSON.stringify(this.queue);
    };

    return WebEventRecorder;
}();

exports.default = WebEventRecorder;