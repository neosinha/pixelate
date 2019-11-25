
var serverLocation = location.host; 
var server = "http://" + serverLocation ;
console.log("Location: "+ server); 


function appInit() {
	getSystemInfo();
	
	
}

function drawView() {
	appNavBar();
	loadLandingView(); 
	updatePerSecond();
}

var serialnum = null; 
var clock;


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
			'content' : systemView() });
		
		tabs.push({'name' : "<span class='maintab'>Network</span>" ,
					'content' : networkInfo() });
		
		tabs.push({'name' : "<span class='maintab'>Firewall</span>" ,
					'content' : firewallView() });
		
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


function getSystemInfo() {
	var urlx = 'http://' + server + '/getsysteminfo'; 
	console.log('Sys: '+ urlx);
	ajaxLoad(getsystem_callback, urlx); 
}



var systemModel = null; 
var networkObj = null; 

function getsystem_callback(respx) {
	console.log(respx);
	systemModel = JSON.parse(respx); 
	networkObj = systemModel['network'];
	
	drawView();
	
}


