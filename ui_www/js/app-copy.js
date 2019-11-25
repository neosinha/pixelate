
var serverLocation = location.host; 
var server = "http://" + serverLocation ;
console.log("Location: "+ server); 

var port1tx = null;
var port1rx = null;
var port2tx = null;
var port2rx = null;

var prod_port1tx = null;
var prod_port1rx = null;
var prod_port2tx = null;
var prod_port2rx = null;

var statsmax = { port1tx : 0, 
				 port1rx : 0,
				 port2tx : 0, 
				 port2rx : 0};

function appInit() {
	appNavBar();
	loadLandingView(); 
	updatePerSecond();
}

var serialnum = null; 
var clock;

/*$(document).ready(function() {
	clock = $('.clock').FlipClock({
		clockFace: 'TwentyFourHourClock',
		showSeconds: true
	});
});*/

function updateClock() {
	var dt = new Date();
	$('#clock').html( dt.toLocaleString()); 
}

function updatePerSecond() {
	updateClock();
	setTimeout(updatePerSecond, 1000);
}



function loadLandingView() {
		var h1x = ui.h3(null, '', [{'name' : 'class', 'value' : 'mainlogo text-center' }]);
		var jum = ui.jumbotron('view1', h1x,' bg-basic'); 
		
		
		//create tab area
		var tabs = new Array();
		
		
		tabs.push({'name' : "<span class='maintab'>System</span>" ,
			'content' : packetLayout() });
		
		
		//tabs.push({'name' : "<span class='maintab'>Prodution Mode</span>" ,
		//	'content' : productionView1()  });
		
		tabs.push({'name' : "<span class='maintab'>HW Info</span>" ,
					'content' : systemInfo() });
		tabs.push({'name' : "<span class='maintab'>History</span>" ,
					'content' : historyTab() });
		
		navtabs= ui.navtabs('tabbed', 'justified bg-basic text-warning', tabs );

		
		//var inpbar = jum.appendChild(inpx2);
		/*var clockdiv = ui.createElement('div', 'clock');
		clockdiv.setAttribute('class', 'clock');
		jum.appendChild(clockdiv);
		*/
		
		//jum.appendChild(ui.hr() );
		//var guagearea = ui.createElement('div', 'guagearea');
		//guagearea.appendChild(productionView1());
		
		//jum.appendChild(packetLayout());
		var resultarea = ui.createElement('div', 'results');
		
		var notifyarea = ui.createElement('div', 'notify');
		
		//jum.appendChild(farStatusForm());
		jum.appendChild(navtabs);
//		/jum.appendChild(guagearea);
		jum.appendChild(resultarea);
		
		//jum.appendChild(xmlarea);
		jum.appendChild(notifyarea);
		
		
		
		ui.addSubViewToMain([jum]);
		
		$('#modalheader').html(''); 
		$('#modalbody').html('uuuu'); 
		$('#modalfooter').html(''); 
		
		$('#serialnumber').val('1917Q-20112'); 
		$('#partnum').val('800939-00-04'); 
		
		
}


function activateTabs() {
	
	var ids = ['tabtabbed0', 'tabtabbed1', 'tabtabbed2'];
	for (i=0; i < ids.length-1; i++) {
		var idx = ids[i]; 
		var el = document.getElementById(idx);
		el.setAttribute('onclick', 'tabClick("'+idx+'");');
	}
}

function farStatusForm(){
	
	var divx = ui.createElement('div');
	var hr = ui.createElement('BR');
	
	var inpx2 = ui.buttonInputBar( {
		'id'	: 'serialnumber', 
		'type' : 'text', 
		'label' : 'Serial Number', 
		'button' : 'Search SN',
		'placeholder' : '1851Q-2000F',
		'onclick' : 'getStructureBySN(); '
	}); 
	
	divx.appendChild(hr);
	divx.appendChild(inpx2);
	divx.appendChild(ui.createElement('BR'));
	
	return divx; 
}


function packetLayout() {
	var h1x = ui.h3(null, 'StateLess Packet Test', 
			[{'name' : 'class', 'value' : 'mainlogo text-center' }]);
	var divx = ui.createElement('div', '');
	divx.appendChild(h1x);
	divx.appendChild(ui.hr());
	
	var drowx = ui.createElement('div', 'pktrow');
	drowx.setAttribute('class', 'row'); 
	
	var col1 = ui.createElement('div', 'src');
	col1.setAttribute('class', 'col-md-3 port1');
	
	var col2 = ui.createElement('div', 'path');
	col2.setAttribute('class', 'col-md-3');
	

	var col3 = ui.createElement('div', 'dst');
	col3.setAttribute('class', 'col-md-3');
	
	var col4 = ui.createElement('div', 'dst');
	col4.setAttribute('class', 'col-md-3');
	
	
	var port1 = document.createElement('img');
	port1.setAttribute('src', 'img/001-ethernet.png');
	port1.setAttribute('class', 'img-thumbnail');
	//col1.appendChild(port1);
	
	// Instantiate a slider
	/*<input id="ex1" data-slider-id='ex1Slider' type="text" 
	data-slider-min="0" data-slider-max="20" data-slider-step="1" 
	data-slider-value="14"/>*/
	var configForm = ui.createElement('form', 'configform'); 
	configForm.setAttribute('class', 'form-inline');
	var grp = ui.createElement('div', '');
	grp.setAttribute('class', 'form-group');
	
	var lbl = ui.createElement('label', '');
	lbl.setAttribute('class', 'inplabel');
	lbl.setAttribute('for', 'serialnum');
	lbl.innerHTML = 'SN#';
	grp.appendChild(lbl);
	configForm.appendChild(grp);
	configForm.appendChild(ui.br());
	
	var inpsn = ui.createElement('input');
	inpsn.setAttribute('type', 'text');
	inpsn.setAttribute('class', 'form-control uut');
	inpsn.setAttribute('id', 'serialnumber');
	grp.appendChild(inpsn);
	grp.appendChild(ui.br());
	
	var lbl = ui.createElement('label', '');
	lbl.setAttribute('class', 'inplabel');
	lbl.setAttribute('for', 'partnum');
	lbl.innerHTML = 'PN#';
	grp.appendChild(lbl);
	configForm.appendChild(grp);
	configForm.appendChild(ui.br());
	
	var inppn = ui.createElement('input');
	inppn.setAttribute('type', 'text');
	inppn.setAttribute('class', 'form-control uut');
	inppn.setAttribute('id', 'partnum');
	grp.appendChild(inppn);
	grp.appendChild(ui.br());
	
	
	
	
	/*
	var speedSlider = ui.createElement('input', 'speedslider');
	speedSlider.setAttribute('type', 'range');
	speedSlider.setAttribute('name' , 'somename');
	speedSlider.setAttribute('data-slider-id', 'speedslider-el');
	speedSlider.setAttribute('data-slider-min', '10');
	speedSlider.setAttribute('data-slider-max', '100');
	speedSlider.setAttribute('data-slider-step', '5');
	//speedSlider.setAttribute('data-slider-handle' , 'extcustom');
	speedSlider.setAttribute('orientation', 'vertical');
	//grp.appendChild(speedSlider);
	*/
	
	
	configForm.appendChild(ui.br());
	
	var sliderForm = ui.createElement('form', 'configform'); 
	sliderForm.setAttribute('class', 'form-inline');
	
	var sgrp = ui.createElement('div', '');
	sgrp.setAttribute('class', 'form-group');
	
	var dSlider = ui.createElement('div', 'linerate');
	dSlider.setAttribute('class', 'roundslider');
	sgrp.appendChild(dSlider);
	sliderForm.appendChild(sgrp);
	
	var lbl = ui.createElement('label', '');
	lbl.setAttribute('class', 'sliderlabel');
	lbl.setAttribute('for', 'linerate');
	lbl.innerHTML = 'LineRate(%)';
	sgrp.appendChild(lbl);
	
	sliderForm.appendChild(ui.hr());
	
	var grp = ui.createElement('div', '');
	grp.setAttribute('class', 'form-group');
	
	var dSlider = ui.createElement('div', 'duration');
	dSlider.setAttribute('class', 'roundslider');
	sgrp.appendChild(dSlider);
	
	var lbl = ui.createElement('label', '');
	lbl.setAttribute('class', 'sliderlabel');
	lbl.setAttribute('for', 'durationslider');
	lbl.innerHTML = 'Duration(s)';
	sgrp.appendChild(lbl);
		
	
	sliderForm.appendChild(grp);
	
	col1.appendChild(configForm);
	
	col2.appendChild(sliderForm);
	
	var stbutton = ui.createElement('button', 'startbutton') ; 
	stbutton.setAttribute('type', 'button');
	stbutton.setAttribute('class', 'btn btn-warning btn-block'); 
	stbutton.setAttribute('onclick', 'startTraffic();');
	stbutton.innerHTML = 'START';
	
	col1.appendChild(stbutton);
	
	col1.appendChild(ui.hr());
	
	
	
	var br = ui.createElement('br', '');
	//col2.appendChild(br);
	//col2.appendChild(br);
	
	var cable = document.createElement('img');
	cable.setAttribute('src', 'img/double.png');
	cable.setAttribute('class', 'img-thumbnail');
	//col2.appendChild(cable);
	
	
	
	var port2 = document.createElement('img');
	port2.setAttribute('src', 'img/001-ethernet.png');
	port2.setAttribute('class', 'img-thumbnail');
	//col3.appendChild(port2);
	
	var tlight = ui.createElement('div', 'tlight'); 
	tlight.setAttribute('class', 'trafficlight');
	var red = ui.createElement('div', 'redlight');
	red.setAttribute('class', 'red');
	tlight.appendChild(red);
	
	var yl = ui.createElement('div', 'yellowlight');
	yl.setAttribute('class', 'yellow');
	tlight.appendChild(yl);
	
	var yl = ui.createElement('div', 'greenlight');
	yl.setAttribute('class', 'green');
	tlight.appendChild(yl);
	
	
	var label = ui.createElement('div', 'port1txlabel');
	label.innerHTML = 'Port1'; 
	var guage1 = ui.createElement('div', 'port1tx');
	guage1.setAttribute('class', 'statscounter');
	//guage1.appendChild(label);
	//guage1.setAttribute('class', '60x160px');
	col3.appendChild(guage1);
	//col3.appendChild(ui.hr());
	//col2.appendChild(ui.hr());
	
	var guage1 = ui.createElement('div', 'port1rx');
	guage1.setAttribute('class', 'statscounter');
	//guage1.setAttribute('class', '60x160px');
	//col2.appendChild(guage1);
	col3.appendChild(guage1);
	//col3.appendChild(ui.hr());
	
	
	var guage1 = ui.createElement('div', 'port2tx');
	guage1.setAttribute('class', 'statscounter');
	col3.appendChild(guage1);
	//col3.appendChild(ui.hr());
	
	var guage1 = ui.createElement('div', 'port2rx');
	guage1.setAttribute('class', 'statscounter');
	col3.appendChild(guage1);
	
	var guage = ui.createElement('div', 'port1txmax');
	guage.setAttribute('class', 'statscounter');
	col4.appendChild(guage);
	
	var guage = ui.createElement('div', 'port1rxmax');
	guage.setAttribute('class', 'statscounter');
	col4.appendChild(guage);
	
	var guage = ui.createElement('div', 'port2txmax');
	guage.setAttribute('class', 'statscounter');
	col4.appendChild(guage);
	
	var guage = ui.createElement('div', 'port2rxmax');
	guage.setAttribute('class', 'statscounter');
	col4.appendChild(guage);
	
	
	drowx.appendChild(col1);
	drowx.appendChild(col2);
	drowx.appendChild(col3);
	drowx.appendChild(col4);
	
	
	
	divx.appendChild(drowx);
	
	//Second Row
	var drow2x = ui.createElement('div', 'statsrow');
	drow2x.setAttribute('class', 'row'); 
	
	var col1 = ui.createElement('div', 'pstatcol1');
	col1.setAttribute('class', 'col-md-6 well pstats');
	
	
	
	col1.appendChild(ui.createElement('div', 'pstat1'));
	
	//var col2 = ui.createElement('div', 'gblstat');
	//col2.setAttribute('class', 'col-md-4');
	//col2.appendChild(ui.hr());
	
	
	
	
	var col3 = ui.createElement('div', 'pstatcol2');
	col3.setAttribute('class', 'col-md-6 well pstats');
	
	//port2 Counters
	col3.appendChild(ui.createElement('div', 'pstat2'));
	drow2x.appendChild(col1);
	//drow2x.appendChild(col2);
	drow2x.appendChild(col3);
	
	divx.appendChild(drow2x);
	
	
	return divx; 
}




function initGuages() {
	
	port1tx = new JustGage({
	    id: "port1tx",
	    value: 0,
	    min: 0,
	    max: 100,
	    symbol: '%',
	    gaugeColor: "#edebeb", 
        pointer: true,
        //gaugeWidthScale: 1.5,
        //counter: true, 
	    title: "Port1 TX"
	  });
	
	port1rx = new JustGage({
	    id: "port1rx",
	    value: 0,
	    min: 0,
	    max: 100,
	    symbol: '%',
	    pointer: true,
	    title: "Port1 RX"
	  });
	
	console.log("Initializing Port1 Stats");
	
	
	port2tx = new JustGage({
	    id: "port2tx",
	    value: 0,
	    min: 0,
	    max: 100,
	    symbol: '%',
	    pointer: true,
	    title: "Port2 TX"
	  });
	
	port2rx = new JustGage({
	    id: "port2rx",
	    value: 0,
	    min: 0,
	    max: 100,
	    symbol: '%',
	    pointer: true,
	    title: "Port2 RX"
	  });
	console.log("Initializing Port2 Stats");
	
}

function initDisplays() {
	 $("#port1tx").sevenSeg({ digits: 5, value: 00 });
	 $("#port1rx").sevenSeg({ digits: 5, value: 00 });
	 $("#port2tx").sevenSeg({ digits: 5, value: 00, colorOn: "Lime" });
	 $("#port2rx").sevenSeg({ digits: 5, value: 00, colorOn: "Lime" });
	 
	 
	 $("#port1txmax").sevenSeg({ digits: 5, value: 00 });
	 $("#port1rxmax").sevenSeg({ digits: 5, value: 00 });
	 $("#port2txmax").sevenSeg({ digits: 5, value: 00 });
	 $("#port2rxmax").sevenSeg({ digits: 5, value: 00 });
	 //$("#port2tx").sevenSeg({ digits: 5, value: 00 });
	 //$("#port2rx").sevenSeg({ digits: 5, value: 00 });
	 
	 $("#linerate").roundSlider({
		 handleSize: "34,10",
		 value: 75, 
		 circleShape: "half-top"
	 });
	 
	 $("#duration").roundSlider({
		 handleSize: "34,10",
		 value: 15, 
		 circleShape: "half-top"
	 });
	
	 
	 /*
	 $("#prod_port1tx").sevenSeg({ digits: 5, value: 00.00 });
	 $("#prod_port1rx").sevenSeg({ digits: 5, value: 00.00 });
	 $("#prod_port2tx").sevenSeg({ digits: 5, value: 00.00 });
	 $("#prod_port2rx").sevenSeg({ digits: 5, value: 00.00 });
	   */
}

function initProdGuages() {
	prod_port1tx = new JustGage({
	    id: "prod_port1tx",
	    value: 0,
	    min: 0,
	    max: 100,
	    symbol: '%',
	    gaugeColor: "#edebeb", 
        pointer: true,
        //gaugeWidthScale: 1.5,
        counter: true, 
	    title: "Prod Port1 TX"
	  });
	
	prod_port1rx = new JustGage({
	    id: "prod_port1rx",
	    value: 0,
	    min: 0,
	    max: 100,
	    symbol: '%',
	    pointer: true,
	    title: "Prod Port1 RX"
	  });
	
	console.log("Initializing Prod Port1 Stats");
	
	
	prod_port2tx = new JustGage({
	    id: "prod_port2tx",
	    value: 0,
	    min: 0,
	    max: 100,
	    symbol: '%',
	    pointer: true,
	    title: "Prod Port2 TX"
	  });
	
	prod_port2rx = new JustGage({
	    id: "prod_port2rx",
	    value: 0,
	    min: 0,
	    max: 100,
	    symbol: '%',
	    pointer: true,
	    title: "Prod Port2 RX"
	  });
	console.log("Initializing Prod Port2 Stats");
}




function resetStats() {
	statsmax = {port1tx : 0, 
				port1rx : 0, 
				port2tx : 0, 
				port2rx : 0};
}

function updatePacketStats(status) {
	var hdr = new Array();
	hdr.push('Parameter'); 
	hdr.push('Value');
	
	/*var params = ['tx_util', 'rx_bps', 'obytes', 'rx_pps', 'ipackets', 'oerrors', 
				  'rx_util', 'opackets', 'tx_pps', 'rx_util', 'opackets', 'tx_pps', 
				  'tx_bps', 'ierrors', 'rx_bps_L1', 'tx_bps_L1', 'ibytes'];
	*/
	
	var params = ['tx_util', 'obytes', 'ipackets', 'oerrors', 
				  'rx_util', 'opackets', 'tx_bps', 'ierrors'];
	
	var port1stat = status['0']; 
	var tbldata = new Array();
	var col1 = document.getElementById('pstat1') ; 
	col1.innerHTML = '';
	
	//update PORT1 BW counters
	
	var txutil = parseFloat(port1stat['tx_util']).toFixed(2); 
	var rxutil = parseFloat(port1stat['rx_util']).toFixed(2);
	
	
	$("#port1tx").sevenSeg({ value: txutil });
	$("#port1rx").sevenSeg({ value: rxutil });
	
	if (txutil > statsmax['port1tx']) {
		statsmax['port1tx'] = txutil;
	}
	
	if (rxutil > statsmax['port1rx']) {
		statsmax['port1rx'] = rxutil;
	}
	
	$("#port1txmax").sevenSeg({ value: statsmax['port1tx'] });
	$("#port1rxmax").sevenSeg({ value: statsmax['port1rx'] });
	
	//port1tx.refresh(port1stat['tx_util']);
	//port1rx.refresh(port1stat['rx_util']);
	
	for (i=0; i <= params.length-1; i++) {
		var key = params[i]; 
		var value = status[0][key]; 
		tbldata.push([key, value]);
		
	}
	
	//create table element for port1
	var stbl = ui.table ("struct_table", 'table-bordered table-hover' ,hdr, tbldata); 
	col1.appendChild(stbl);
	
	//create table element for port2
	var col3 = document.getElementById('pstat2') ; 
	col3.innerHTML = '';
	var port2stat = status["1"]; 
	
	//update PORT1 BW counters
	//port2tx.refresh(port2stat['tx_util']);
	//port2rx.refresh(port2stat['rx_util']);
	
	var port2txutil = parseFloat(port2stat['tx_util']).toFixed(2); 
	var port2rxutil = parseFloat(port2stat['rx_util']).toFixed(2); 
	
	if (port2txutil > statsmax['port2tx']) {
		statsmax['port2tx'] = port2txutil;
	}
	
	if (port2rxutil > statsmax['port2rx']) {
		statsmax['port2rx'] = port2rxutil;
	}
	
	$("#port2tx").sevenSeg({ value: port2txutil});
	$("#port2rx").sevenSeg({ value: port2rxutil});
	
	$("#port2txmax").sevenSeg({ value: statsmax['port2tx'] });
	$("#port2rxmax").sevenSeg({ value: statsmax['port2rx'] });
	
	
	for (i=0; i <= params.length-1; i++) {
		var key = params[i]; 
		var value = status[0][key]; 
		tbldata.push([key, value]);
		
	}
	var tbldata = new Array();
	for (i=0; i <= params.length-1; i++) {
		var key = params[i]; 
		var value = status["1"][key]; 
		tbldata.push([key, value]);
	}
	var stbl = ui.table ("struct_table", 'table-bordered table-hover' ,hdr, tbldata); 
	col3.appendChild(stbl);
	
	
	//create table element for gstat
	var col2 = document.getElementById('gblstat') ;
	
}


function updateCpuStats(stats) {
	console.log("Update CPU Stats")
}


function aboutStructure() {
	var h1x = ui.h3(null, 'PSI Structure Infomation', null);
	var jumx = ui.jumbotron('aboutview', h1x,' bg-basic'); 
	
	var aboutInfo = new Array(); 
	aboutInfo.push({'heading' : 'Process Info Structure', 
		'content' : "<img class='img-rounded' src='img/psi/psi-header-320px.png'>"});
	aboutInfo.push({'heading' : 'Structure Info', 
		'content' : "<img src='img/psi/structinfo-tag-320px.png'>"});
	aboutInfo.push({'heading' : 'Process Info', 
		'content' : "<img src='img/psi/process-info-tag-320px.png'>"});
	aboutInfo.push({'heading' : 'UUT Structure', 
		'content' : "<img src='img/psi/uut-struct-320px.png'>"});
					  
	var panel = ui.createPanels('aboutinfo', aboutInfo);
	jumx.appendChild(panel);
	return jumx;
}

function requestFAR(serial) {
	alert("FAR for "+ serial);
	var urlx = server + "/downloadFAR?farnumber="+serial;
	window.location = urlx; 
}

function downloadCallback(msg){
	console.log(msg);
}

var speedslider, durationslider, paketsize; 

function initSliders() {
	speedslider = new Slider('#speedslider', {
		tooltip: 'always'
	});
	
	
	durationslider = new Slider('#durationslider', {
		tooltip: 'always'
	});
	
	
	//paketsize = new Slider('#paketsize', {
	//	tooltip: 'always'
	//});
	
	
	
}

var cmdconfigobj= null;
function startTraffic() {
	
	//alert('This is cool.');
	
	var speed = $('#linerate').roundSlider("getValue");
	console.log('Speed:' + speed);
	
	var duration = $('#duration').roundSlider("getValue");
	console.log('Duration: '+ duration);
	
	var serialnumber = '19323-50000';
	var partnumber   = '8000-00-04';
	var sinput = $('#serialnumber').val();
	if (sinput.length > 0) {
		serialnumber = sinput; 
	}
	var pnum = $('#partnum').val();
	console.log("//"+pnum +', '+ sinput);
	partnumber =pnum;
		
	
	cmdconfig = "{'duration' : "+ duration + 
					" , 'rate' : "+ speed + ", 'partnum' : '" + partnumber+ 
					"', 'serialnum' : '"+ serialnumber +"' }" ; 
	cmdconfigobj = {'duration' : duration, 'speed' : speed};
	var proceed = confirm("Send Traffic at "+speed + '% linerate for '+
						duration + ' seconds?');
	
	console.log('CommandConfig: '+ JSON.stringify(cmdconfig) );
	if (proceed == true) {
		disabledState(); 
		resetStats() ; 
		sendCmd(cmdconfig);
	}
	
}

function disabledState() {
	var formids = ['startbutton', 'speedslider', 'durationslider']; 
	for (var i=0; i < formids; i++) {
		var fid = formids[i]; 
		var fidx = document.getElementById(fid);
		fidx.setAttribute('disabled', 'disabled');
		
	}
	var el = document.getElementById('startbutton');
	el.setAttribute('disabled', 'disabled');
	el.setAttribute('class', 'btn btn-info btn-block');
	el.innerHTML = 'Running '+ cmdconfigobj['speed'] +
				'% for '+cmdconfigobj['duration'] + ' sec(s).'; 
	
	$("#linerate").roundSlider("disable");
	$("#duration").roundSlider("disable"); 
	 
}

function enabledState() {
	var formids = ['startbutton', 'speedslider', 'durationslider']; 
	for (var i=0; i < formids; i++) {
		var fid = formids[i]; 
		var fidx = document.getElementById(fid);
		fidx.removeAttribute('disabled');
	}
	
	var el = document.getElementById('startbutton');
	el.removeAttribute('disabled');	
	el.setAttribute('class', 'btn btn-info btn-block');
	el.innerHTML = 'START'; 
	$("#linerate").roundSlider("enable");
	$("#duration").roundSlider("enable"); 
}



function handleResponse(msg) {
	//
	console.log("Msg:"+ msg.payloadString);
	var rsp = JSON.parse(msg.payloadString); 
	//{'progress' : True, 'Done' : False}
	if ((rsp['progress'] == true) & (rsp['Done'] == false)) {
		console.log('Disable state');
		disabledState();
	}
	
	if ((rsp['progress'] == false) & (rsp['Done'] == true)) {
		console.log('Enabled State');
		enabledState();
	}
	
}

function tabClick(tab) {
	console.log('Location: '+ document.URL);
	console.log('Location: '+ tab);
}

function inithwinfo() {
	var url = 'http://'+location.host + '/hwinfo'; 
	ajaxLoad(hwinfoCallBack, url);	
}



function initialTestHistory() {
	var url = 'http://'+location.host + '/initialTestHistory'; 
	ajaxLoad(testHistoryCallBack, url);	
}

function hwinfoCallBack(response) {
	console.log(response);
	var rspobj = JSON.parse(response); 
	var adinfo = rspobj['adapterinfo'];
	var tinfo = rspobj['testhist']; 
	testHistoryCallBack(JSON.stringify(tinfo));
	loadSystemCallBack(JSON.stringify(adinfo));
	
}

function testHistoryCallBack(response) {
	//console.log(response);
	var rsp = JSON.parse(response); 
	//console.log("System: "+rsp); 
	
	var hdr = new Array();
	hdr.push('Date');
	hdr.push('Time');
	hdr.push('Serial#');
	hdr.push('Statistics');
	
	var tbldata = new Array();
	for (idx=0; idx < rsp.length; idx++) {
			var sr_item = rsp[idx];
			var ldate = new Date(sr_item['starttime']);
			
			tbldata.push([ldate.toLocaleDateString(), 
						  ldate.toLocaleTimeString(), 
					sr_item['serial'], 'Parameters']);
	}
	
	var tbl = ui.table ("struct_table", 'table-condensed table-hover' ,hdr, tbldata); 
	var histinfo = document.getElementById('historytable');
	histinfo.innerHTML = ''; 
	histinfo.appendChild(tbl);	
}


