
function gmailCallBack(response) {
	e = document.getElementById('message');
	e.innerText = response; 
	return response;
}


function testFunc( msg ) {
	d = document.getElementById('message');
	gmailAuthentication('navendusinha', 'Sweta0831', gmailCallBack);
	d.innerHTML= msg ;
}


function testSync( msg ) {
	d = document.getElementById('message');
	syncAmwayDB('sweta0831', 'cropley1903', syncApp);
	spinner = document.createElement('img');
	spinner.setAttribute('src', 'images/blue-spinner.GIF');
	spinner.setAttribute('class', 'centered');
	d.appendChild(spinner);
	//d.innerHTML= msg ;
}


function syncApp(resp) {
	d = document.getElementById('message');
	d.innerHTML = resp;
}

function testDB() {
	ajaxProgressBegin('message');
	loadLos('964395', loadDBCallBack);
}

function loadDBCallBack(resp) {
	ajaxProgressEnd('message');
	d = document.getElementById('data');
	d.innerHTML = "";
	losdata = JSON.parse(resp); 
	//alert('Los:'+resp);
	drawOrgChart(losdata);
}

function getBsmCatalog() {
	getbsmcatalog(displayCatalog);
}

function displayCatalog(resp) {
	alert(resp);
}

function pushContact(formid) {
	form = document.getElementById('formid');
	var contactObj = {
		"firstname" : document.getElementById()
	};
}

function contactSaveStatus( resp) {
	alert('Done saving '+ resp);
}


function getLatestVolume() {
	ajaxProgressBegin('message');
	loadVolume('964395', volumeCallBack);
}

function volumeCallBack(resp) {
	//alert('Volume: '+ resp);
	ajaxProgressEnd('message');
	pieChart(resp);
}


function volumeSeriesByMonth(ibonumber, yymm) {
	loadVolumeSeries(ibonumber, yymm, volumeSeriesCallBack);
}

function volumeSeriesCallBack(resp) {
	//alert('Series: '+resp);
	volumeChart(resp);
	
}


function personalVolumeByMonth(ibonumber, yymm) {
	loadPersonalVolume(ibonumber, yymm, drawPersonalVolumeChart);
}

function drawPersonalVolumeChart( resp ) {
	personalVolumeChart(resp);
}





