importScripts('lz-string-1.3.3-min.js', 'lzw.js');

onmessage = function (event) {
	console.log(event.data);
	dobj = event.data;
	if (dobj.cmd == "LZWCompress") {
		data  = LZW.compress(dobj.LZW.compress);
		postMessage(data);

	} else if (dobj.cmd == "LZWDecompress") {
		data  = LZW.decompress(dobj.data);
		postMessage(data);

	} else if (dobj.cmd == "LZStringDecompress" ) {
		data  = LZString.decompress(dobj.data);
		postMessage(data);

	} else if (dobj.cmd == "LZStringCompress" ) {
		data  = LZString.compress(dobj.data);
		postMessage(data);
	}

}
