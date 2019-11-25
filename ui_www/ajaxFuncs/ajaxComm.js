var ajaxThread = new Worker('ajaxFuncs/ajax/ajaxWorker.js');
ajaxThread.addEventListener('message', function (e) {
    if (e.data == "Error") {
        updateNetworkStatus('Unable to reach APP server. Please activate WiFi or cellular connection.');
        //ajaxCallBack(e);
    } else {
        ajaxCallBack(e);
    }
}, false);

var ajaxCall = "";
var callData = "";
var callBackFunction = null; ;

function ajaxLoad(callBack, query ) {
    callBackFunction = callBack; 
    ajaxThread.postMessage(query);

}

/*Main ajaxcallback handler
  recieves the data and calls a
  user-defined callback
*/
function ajaxCallBack(e) {
	response = e.data; 
	//alert ('Callback: '+ callBackFunction);
	if (callBackFunction == null ) {
		defAjaxHandler(response);
	} else {
		callBackFunction(response);
	}
}

function defAjaxHandler( response) {
   alert('Default Handler: '+ response);
}

/*function updateNetworkStatus( msg ) {
	alert(msg);
}*/




function loadingIndicate(msg) {
	load = document.getElementById('body');
	img = document.createElement('img');
	img.setAttribute('src', 'images/blue-spinner.GIF');
	img.setAttribute('id', 'ajaxspinner');
	img.setAttribute('class', 'centered');
	load.appendChild(img);
}


function loadDatabase(m) {
	img = document.getElementById('ajaxspinner');
	img.parentNode.removeChild(img);
	callData = m;
	injectBsmList();
}


function ajaxProgressBegin( progressDiv ) {
	d = document.getElementById(progressDiv);
	spinner = document.createElement('img');
	spinner.setAttribute('src', 'images/spinner.gif');
	spinner.setAttribute('class', 'progress');
	d.appendChild(spinner);
}

function ajaxProgressEnd( progressDiv ) {
	d = document.getElementById(progressDiv);
	d.innerHTML="";
}


