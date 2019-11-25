
var compressCallBack = null;
var compressThread = new Worker('tatva/compress/compress-worker.js');
compressThread.addEventListener('message', function (e) {
	if ( e.data == "Error") {
	} else {
		 compressCallBack(e.data);
	}
}, false ); 

/*Main Compress function*/
function compressor ( callBackFunction, comp ) {
	compressCallBack = callBackFunction; 
	compressThread.postMessage(comp);
}






