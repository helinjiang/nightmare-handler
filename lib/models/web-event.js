'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 可以监听的页面的事件
 *
 * https://github.com/segmentio/nightmare#extract-from-the-page
 * https://electronjs.org/docs/api/web-contents#class-webcontents
 *
 * @type {Object}
 */
var EVENT_NAME = exports.EVENT_NAME = {
  // https://github.com/segmentio/nightmare#onconsole-functiontype--arguments-
  // type will be either log, warn or error and arguments are what gets passed from the console. This event is not triggered if the injected javascript code (e.g. via .evaluate()) is using console.log.
  CONSOLE: 'console',

  // https://github.com/segmentio/nightmare#page-events
  // Listens for window.addEventListener('error'), alert(...), prompt(...) & confirm(...).
  PAGE: 'page',

  // 页面开始加载之前触发，只触发一次，是最先触发的
  // https://electronjs.org/docs/api/web-contents#event-did-start-loading
  // Corresponds to the points in time when the spinner of the tab started spinning.
  DID_START_LOADING: 'did-start-loading',

  // 资源加载时进行触发，会触发多次。这里的资源包括 html、image、cgi、mp4 等请求。
  // https://electronjs.org/docs/api/web-contents#event-did-get-response-details
  // Emitted when details regarding a requested resource are available. status indicates the socket connection to download the resource.
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
  DID_GET_RESPONSE_DETAILS: 'did-get-response-details',

  // mainFrame本身（即html文件）加载完成即触发，在did-frame-finish-load之前
  // https://electronjs.org/docs/api/web-contents#event-dom-ready
  // Emitted when the document in the given frame is loaded.
  DOM_READY: 'dom-ready',

  // mainFrame undefined https://now.qq.com/
  // html 页面加载完成就触发，此时其他资源不一定加载完成了，只触发一次
  // https://electronjs.org/docs/api/web-contents#event-did-frame-finish-load
  // 当框架完成导航（navigation）时触发
  DID_FRAME_FINISH_LOAD: 'did-frame-finish-load',

  // 页面加载完成时触发，在 window.onload 之后，只触发一次。
  // 实际中发现 did-finish-load 与 did-frame-finish-load 时间戳是相同的，意味着几乎同时触发
  // https://electronjs.org/docs/api/web-contents#event-did-finish-load
  // 导航完成时触发，即选项卡的旋转器将停止旋转，并指派onload事件后。
  DID_FINISH_LOAD: 'did-finish-load',

  // 页面停止加载时触发，只触发一次，在 did-finish-load 之后
  // https://electronjs.org/docs/api/web-contents#event-did-stop-loading
  // Corresponds to the points in time when the spinner of the tab stopped spinning.
  DID_STOP_LOADING: 'did-stop-loading',

  // mp4 等媒体文件开始播放时触发
  // https://electronjs.org/docs/api/web-contents#event-media-started-playing
  // Emitted when media starts playing.
  MEDIA_STARTED_PLAYING: 'media-started-playing',

  // https://electronjs.org/docs/api/web-contents#event-media-paused
  // Emitted when media is paused or done playing.
  MEDIA_PAUSED: 'media-paused',

  // 重定向时触发，例如遇到了301重定向时会触发，在 did-start-loading 事件之后
  // https://electronjs.org/docs/api/web-contents#event-did-get-redirect-request
  // Emitted when a redirect is received while requesting a resource.
  DID_GET_REDIRECT_REQUEST: 'did-get-redirect-request'
};

/**
 * 页面事件
 */

var WebEvent = function () {
  /**
   * @param {String} eventName 事件名称
   * @param {Array} args 参数列表
   */
  function WebEvent(eventName) {
    var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    _classCallCheck(this, WebEvent);

    this.eventName = eventName;
    this.args = args;
    this.t = Date.now();
  }

  WebEvent.prototype.toString = function toString() {
    return this.t + ' ' + this.eventName + ' ' + JSON.stringify(this.args);
  };

  return WebEvent;
}();

exports.default = WebEvent;