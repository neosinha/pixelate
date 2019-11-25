importScripts('ajaxFuncs.js');

onmessage = function (event) {
    url = event.data;
    x = callAjax(url);
    postMessage(x);
}

