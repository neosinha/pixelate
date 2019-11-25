var mqtt = null; 
var server = location.host;
var mqttServer = server.split(':')[0];

function mqttInit() {
	console.log("Initializing MQTT Server");
	
	mqtt = new Paho.MQTT.Client(mqttServer, Number(8083), '', 
							'cl'+getEpoch() ); 
	
	mqtt.onMessageArrived = mqttOnMessage;
	mqtt.onConnectionLost = mqttConnectionLost;
	mqttConnect();
	
}

function mqttConnect() {
	var options = { timeout: 300, 
			onSuccess: onConnect, 
			onFailure: mqttFailure 
			};
	mqtt.connect(options); 
}

function mqttConnectionLost(response){
	console.log(getEpoch()+": Connection lost");
    console.log(response.errorMessage);
	setTimeout(mqttConnect, 10);
}

function getEpoch() {
	var ts = new Date();
	var tss = ts.getTime();
	return tss;
}


function onConnect() {
	var topics = ['trex/stats', 'trex/util', 'trex/rsp' ];
	for (idx = 0; idx < topics.length; idx++) {
		mqtt.subscribe(topics[idx]);
		console.log("Subscrtibed: "+ topics[idx] );
	}
}


function mqttOnMessage(msg){
	var msgstr = msg.payloadString; 
	console.log(msg.destinationName +' == ' + msgstr); 
	var status = JSON.parse(msgstr);
	if (msg.destinationName === 'trex/stats') {
		updatePacketStats(status);
	}
	
	if (msg.destinationName === 'trex/util') {
		//updateSystemStats(status);
		console.log("TREX: "+ msgstr); 
		updateCpuStats(status);
	}
	
	if (msg.destinationName === 'trex/rsp') {
		//updateSystemStats(status);
		console.log("TREX (RSP):  "+ msgstr); 
		//updateCpuStats(status);
		handleResponse(msg);
	}
}


function sendCmd(cmd) {
	console.log("Publishing: "+ cmd);
	mqtt.send(topic="trex/cmd", payload=cmd, qos=0);
}


function mqttFailure() {
	console.log("Connection failed..");
	
}
