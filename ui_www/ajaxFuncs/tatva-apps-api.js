var server = "http://tatvainc.dyndns-ip.com/tapi";
function getServer() {
	return server; 
}

function setServer( serverString ) {
	server = serverString;
	//alert('Server is: '+ getServer());
}



function gmailAuthentication(username, password, userCallBack) {
    url = getServer() + '/webapi%20credentials?username='+username+'&password='+password+'&'+'register=0';
    ajaxLoad(userCallBack, url);
}


function syncAmwayDB(username, password, callBack) {
    url = getServer() + '/webapi%20syncAmwayDB?username='+username+'&password='+password;
    ajaxLoad(callBack, url);
    
}

function loadDB(iboNum, callBack) {
    url = getServer() + '/webapi%20userdb?username='+iboNum;
    ajaxLoad(callBack, url);
}

function loadLos(iboNum, callBack) {
    url = getServer() + '/webapi%20getlos?username='+iboNum;
    ajaxLoad(callBack, url);
}



var pos = null;

function showPosition(position) {
 	pos = position; 
}


function getLocation() {
	pos = navigator.geolocation.getCurrentPosition(showPosition); 
}


function getbsmcatalog(callBack) {
    url = getServer() + '/webapi%20getbsmcatalog';
    ajaxLoad(callBack, url);
}

function uploadContact(contactObj, callBack) {
    c = contactObj;
    url = getServer() + '/webapi%20loadcontact?ibonumber='+c.ibonumber+"&firstname="+c.firstname+ 
	  "&lastname="+c.lastname+"&phone="+c.phone+"&email="+c.email+"&location="+position.coords.latitude+
	  ";"+position.coords.longitude;
    ajaxLoad(callBack, url);
}
	

function loadVolume(ibonumber, callBack) {
    url = getServer() + '/webapi%20getlatestvolume?ibonumber='+ibonumber; 
    ajaxLoad(callBack, url);
}


function loadVolumeSeries(ibonumber,yymm, callBack) {
    url = getServer() + '/webapi%20getvolumeseries?ibonumber='+ibonumber+'&yymm='+yymm; 
    ajaxLoad(callBack, url);
}


function loadPersonalVolume(ibonumber,yymm, callBack) {
    url = getServer() + '/webapi%20getpersonalvolumeseries?ibonumber='+ibonumber+'&yymm='+yymm; 
    ajaxLoad(callBack, url);
}


function updateCoreSteps(iboNumber, books, cds, plan, productuse, client, teach, integrity, association, tech, callBack) {
	/*coresteps.put("books", "1");
		coresteps.put("cds", "0");
		coresteps.put("plan", "0");
		coresteps.put("productuse", "1");
		coresteps.put("client", "1");
		coresteps.put("teach", "1");
		coresteps.put("integrity", "1");
		coresteps.put("association", "1");
		coresteps.put("tech", "1");*/
    core = JSON.parse(coreObj);
    url = getServer() + '/webapi%20updatecoresteps='+ibonumber+'&books='+books+'&cds='+cds+ '&plan='+ plan+'&productuse='+productuse+'&client='+client+'&teach='+teach+'&integrity='+integrity+'&association='+association+'&tech='+tech; 
    ajaxLoad(callBack, url);
}


function sendSmsForm() {
	phone   = document.getElementById('phone').value;
	message = document.getElementById('message').value;
	sendSms(phone,message);
}

function sendSms(phone, message) {
	url = getServer()+ '/webapi%20sendsms?phone='+phone+'&message='+message;
	ajaxLoad(smsCallBack, url);
} 

function smsCallBack(response) {
	//alert(response);
}



	










