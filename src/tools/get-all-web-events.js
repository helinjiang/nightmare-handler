import WebEvent from '../models/web-event';
import ResponseDetail from '../models/response-detail';

export default function init(nightmare) {
    let queue = [];

    // https://github.com/segmentio/nightmare#onconsole-functiontype--arguments-
    nightmare.on('console', function (...args) {
        queue.push(new WebEvent('console', args));
    });

    // https://github.com/segmentio/nightmare#page-events
    nightmare.on('page', function (...args) {
        queue.push(new WebEvent('console', args));
    });

    // 页面开始加载之前触发，只触发一次
    nightmare.on('did-start-loading', function () {
        console.log('[did-start-loading]');
    });

    // 资源加载的情况，会触发多次
    nightmare.on('did-get-response-details',
        function (event, status, newURL, originalURL, httpResponseCode, requestMethod, referrer, headers,
            resourceType) {
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

            handleResponse.add(
                new ResponseItem(event, status, newURL, originalURL, httpResponseCode, requestMethod, referrer, headers,
                    resourceType));
        });

    // mainFrame本身（即html文件）加载完成即触发，在did-frame-finish-load之前
    nightmare.on('dom-ready', function (event) {
        console.log('[dom-ready]', event);
    });

    // mainFrame undefined https://now.qq.com/
    // html 页面加载完成就触发，此时其他资源不一定加载完成了，只触发一次
    nightmare.on('did-frame-finish-load', function (event, isMainFrame) {
        console.log('[did-frame-finish-load]', event, isMainFrame);
    });

    // 页面加载完成时触发，相当于 onload，只触发一次
    nightmare.on('did-finish-load', function () {
        console.log('[did-finish-load]');
    });

    // 页面停止加载时触发，只触发一次，在 did-finish-load 之后
    nightmare.on('did-stop-loading', function () {
        console.log('[did-stop-loading]');
    });

    // 重定向时触发，例如可以构造一个404才测试
    nightmare.on('did-get-redirect-request',
        function (event, oldURL, newURL, isMainFrame, httpResponseCode, requestMethod, referrer, headers) {
            console.log('[did-get-redirect-request]', oldURL, newURL, isMainFrame);
        });

    // mp4播放
    nightmare.on('media-started-playing', function () {
        console.log('[media-started-playing]');
    });

}