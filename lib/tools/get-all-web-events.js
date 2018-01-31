'use strict';

exports.__esModule = true;
exports.default = init;

var _webEvent = require('../models/web-event');

var _webEvent2 = _interopRequireDefault(_webEvent);

var _responseDetail = require('../models/response-detail');

var _responseDetail2 = _interopRequireDefault(_responseDetail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function init(nightmare) {
    var queue = [];

    // https://github.com/segmentio/nightmare#onconsole-functiontype--arguments-
    nightmare.on('console', function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        queue.push(new _webEvent2.default('console', args));
    });

    // https://github.com/segmentio/nightmare#page-events
    nightmare.on('page', function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        queue.push(new _webEvent2.default('console', args));
    });

    // 页面开始加载之前触发，只触发一次，是最先触发的
    // https://electronjs.org/docs/api/web-contents#event-did-start-loading
    // Corresponds to the points in time when the spinner of the tab started spinning.
    nightmare.on('did-start-loading', function () {
        console.log('[did-start-loading]');
    });

    // 资源加载时进行触发，会触发多次。这里的资源包括 html、image、cgi、mp4 等请求。
    // https://electronjs.org/docs/api/web-contents#event-did-get-response-details
    // Emitted when details regarding a requested resource are available. status indicates the socket connection to download the resource.
    nightmare.on('did-get-response-details', function (event, status, newURL, originalURL, httpResponseCode, requestMethod, referrer, headers, resourceType) {
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
    nightmare.on('dom-ready', function (event) {
        console.log('[dom-ready]', event);
    });

    // mainFrame undefined https://now.qq.com/
    // html 页面加载完成就触发，此时其他资源不一定加载完成了，只触发一次
    // https://electronjs.org/docs/api/web-contents#event-did-frame-finish-load
    // 当框架完成导航（navigation）时触发
    nightmare.on('did-frame-finish-load', function (event, isMainFrame) {
        console.log('[did-frame-finish-load]', event, isMainFrame);
    });

    // 页面加载完成时触发，相当于 onload，只触发一次
    // https://electronjs.org/docs/api/web-contents#event-did-finish-load
    // 导航完成时触发，即选项卡的旋转器将停止旋转，并指派onload事件后。
    nightmare.on('did-finish-load', function () {
        console.log('[did-finish-load]');
    });

    // 页面停止加载时触发，只触发一次，在 did-finish-load 之后
    // https://electronjs.org/docs/api/web-contents#event-did-stop-loading
    // Corresponds to the points in time when the spinner of the tab stopped spinning.
    nightmare.on('did-stop-loading', function () {
        console.log('[did-stop-loading]');
    });

    // 重定向时触发，例如可以构造一个404才测试
    // https://electronjs.org/docs/api/web-contents#event-did-get-redirect-request
    // Emitted when a redirect is received while requesting a resource.
    nightmare.on('did-get-redirect-request', function (event, oldURL, newURL, isMainFrame, httpResponseCode, requestMethod, referrer, headers) {
        console.log('[did-get-redirect-request]', oldURL, newURL, isMainFrame);
    });

    // mp4 等媒体文件开始播放时触发
    // https://electronjs.org/docs/api/web-contents#event-media-started-playing
    // Emitted when media starts playing.
    nightmare.on('media-started-playing', function () {
        console.log('[media-started-playing]');
    });
}