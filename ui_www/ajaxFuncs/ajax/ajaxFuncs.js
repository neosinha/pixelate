var xhr = null;
function callAjax(url) {
    try {
        xhr = new XMLHttpRequest();
        xhr.open('POST', url, false);
        xhr.send();
        return xhr.responseText;
    } catch (err) {

        return "Error"; 
    }
}
