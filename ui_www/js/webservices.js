
function getServicesServer() {
	serviceserver = 'https://api.sinhallc.com/webservices';
	
	return serviceserver;
}


function authFunc() {
	username = document.getElementById('ausername').value;
	password = document.getElementById('apasswd').value;
	//console.log('Auth: '+username + "/"+password);
	url = getServicesServer()+'/authaccount?accountid='+username.trim()+'&password='+password.trim()+'&service=smsgateway';
	ajaxLoad(authCallBack, url);
}


function register() {
	// accountid, accountinfo ,service
	
	username = document.getElementById('usernamex').value;
	password = document.getElementById('passwd').value;
	cpassword= document.getElementById('cpasswd').value;
	console.log('User: '+ username + ', password: '+
				password + ', CPassword:'+ cpassword);
	if (password == cpassword) {
		console.log('Auth: '+username + "/"+password);
		params = 'accountid='+username.trim(); 
		params = params + '&service=smsgateway';
		accountinfo = { 
						'business' : { 'name' : document.getElementById('bname').value,
										'address' : document.getElementById('baddress').value,
										'city' : document.getElementById('bcity').value,
										'state' : document.getElementById('bstate').value,
										'country' : document.getElementById('bcountry').value,
										'zipcode' : document.getElementById('bzip').value
									  }, 
						'password' : document.getElementById('passwd').value, 
						'username' : document.getElementById('usernamex').value, 
						'firstname' : document.getElementById('firstname').value,
						'lastname' : document.getElementById('lastname').value,
						'phone' : document.getElementById('phonex').value,
						'email' : document.getElementById('emailx').value 
						};
		
		params = params + '&accountinfo=' + JSON.stringify(accountinfo);
		
		url = getServicesServer()+'/createaccount?'+params;

		console.log('Register: '+ JSON.stringify(accountinfo));
		ajaxLoad(registerCallBack, url);
		
	} else {
		submit = document.getElementById('register-submit');
		submit.value = 'Passwords did not match';
		
	}
	
}

