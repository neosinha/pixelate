// file holds the code which designs the UI views
// or bigger/composite UI view elements
ui = new Bootstrap();

function appNavBar() {
	//navbar = ui.navbar("navarea", '<img align="middle" class="logo-img" src="img/logo-header-psi.png"></img>');
	navbar = ui.navbar("navarea", '<span class="brand">'+
								   '<img class="logo-img img-rounded pull-left" src="img/big-datax64.png"></img>'+
								   '<span class="brandtext">PixelateMe</span>'+
								   '</span>' + 
								   '<span class="clock" id="clock">Clock</span>'
								   );
	ui.addSubViewToMain([navbar]);
}


function loadPanels() {
	
}

function clicker() {
	alert('Clicked..');
}

function systemView() {
	var divx = ui.createElement('div', 'systemview');
	var hr = ui.hr();
	hr.setAttribute('class', 'top');
	divx.appendChild(hr);
	return divx; 
}

function networkInfo() {
	var divx = ui.createElement('div', 'networkview');
	var interfaces = []; 
	for(var k in networkObj) interfaces.push(k);
	var header = ['Interface', 'MAC', 'IPv4' ,'IPv6','Active'];
	var tbldata = new Array();
	for (i=0; i < interfaces.length; i++) {
		var intf = interfaces[i];
		var netport = networkObj[intf];
		console.log('==' + interfaces[i]);
		console.log(intf + ':' + JSON.stringify(netport) );
		var mac = ''; 
		var ipv4 = '';
		var ipv6 = ''; 
		if ('mac' in netport) {
			mac = netport['mac']['addr']; 
		}
		
		if ('ipv4' in netport) {
			ipv4 = netport['ipv4']['addr'] + '<BR>' + netport['ipv4']['netmask'] + '<BR>' + netport['ipv4']['broadcast']; 
		}
		
		if ('ipv6' in netport) {
			ipv6 = netport['ipv6']['addr'] + '<BR>' + netport['ipv6']['netmask']; 
		}
		
		
		
		
		tbldata.push( [intf, mac, ipv4, ipv6, 'Active'] ); 
	}
	
	var tbl = ui.table('networktable', 'striped', header, tbldata );
	
	divx.appendChild(tbl);
	 
	var hr = ui.hr();
	hr.setAttribute('class', 'top');
	divx.appendChild(hr);
	return divx; 
}

function firewallView() {
	var divx = ui.createElement('div', 'networkview');
	var hr = ui.hr();
	hr.setAttribute('class', 'top');
	divx.appendChild(hr);
	return divx; 
}

