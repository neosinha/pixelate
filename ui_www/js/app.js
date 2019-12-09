
var serverLocation = location.host; 
var server = "http://" + serverLocation ;
console.log("Location: "+ server); 


function appInit() {
	appNavBar();
	loadLandingView(); 
	updatePerSecond();
	//fileUploadRow();
	addImageCol();
	addButtonCol();
	//initUpload();
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
		
        var crow = ui.addRowCol('imagerow', 2);
        var brow = ui.addRowCol('buttonrow', 2);


		var resultarea = ui.createElement('div', 'results');
		var notifyarea = ui.createElement('div', 'notify');
		

        jum.appendChild(crow);
        jum.appendChild(brow);
		jum.appendChild(resultarea);
		
		//jum.appendChild(xmlarea);
		jum.appendChild(notifyarea);
		
		ui.addSubViewToMain([jum]);
		
		$('#modalheader').html(''); 
		$('#modalbody').html('uuuu'); 
		$('#modalfooter').html(''); 
		
}


function fileUploadRow() {


  var inpgrp = ui.createElement('div', 'fileupload');
  inpgrp.setAttribute('class', 'input-group image-preview');
  var inp1 = ui.createElement('input', '');
  inp1.setAttribute('type', 'text');
  inp1.setAttribute('class', 'form-control image-preview-filename');
  inp1.setAttribute('disabled', 'disabled');
  inpgrp.appendChild(inp1);

  var spanx = ui.createElement('span', '');
  spanx.setAttribute('class', 'input-group-btn');
  inp1.appendChild(spanx);

  var prvbtn = ui.createElement('button', 'prvbtn');
  prvbtn.setAttribute('class', 'btn btn-default image-preview-clear');
  prvbtn.setAttribute('style', "display:none;");


  var prvIcon = ui.createElement('span', '');
  prvIcon.setAttribute('class', 'glyphicon glyphicon-remove');
  prvbtn.appendChild(prvIcon);

  spanx.appendChild(prvbtn);

  var prvinpt = ui.createElement('div', 'img-prv-input');
  prvinpt.setAttribute('class', 'btn btn-default image-preview-input');
  var spanf = ui.createElement('span', '');
  spanf.setAttribute('class', 'glyphicon glyphicon-folder-open');
  prvinpt.appendChild(spanf);

  var spant = ui.createElement('span', '');
  spant.setAttribute('class', 'image-preview-input-title');
  spant.innerText = 'Browse';
  prvinpt.appendChild(spant);

  var inpt = ui.createElement('input', 'uploadimg');
  inpt.setAttribute('type', 'file');
  inpt.setAttribute('accept', 'image/png, image/jpeg, image/gif');
  inpt.setAttribute('name', 'input-file-preview');
  prvinpt.appendChild(inpt);

  spanx.appendChild(prvinpt);


  //return inpgrp;

   var btn = document.getElementById('buttonrow-col0');
   btn.innerHTML = '';
   btn.appendChild(inpgrp);

}

function addButtonCol() {

    var upbtn = ui.createElement('a', 'upload');
    upbtn.setAttribute('class', 'btn btn-block btn-warning fileUpload');
    upbtn.setAttribute('onchange' , 'readFile(this);');
    var spanx = ui.createElement('span');
    spanx.innerHTML = 'Upload Image';
    upbtn.appendChild(spanx);

    var fl = ui.createElement('input', 'imgfile');
    fl.setAttribute('type', 'file');
    fl.setAttribute('class', 'upload');
    fl.setAttribute('name', 'upfile');

    //upbtn.setAttribute('onclick', 'uploadTrigger();');
    //upbtn.innerText = 'Upload Image';
    upbtn.appendChild(fl);

    var icon = ui.createElement('span', 'uploadicon');
    icon.setAttribute('class', 'glyphicon glyphicon-cloud-upload');
    upbtn.appendChild(icon);

    var btn = document.getElementById('buttonrow-col0');
    var formx = ui.createElement('form', 'imgform');
    formx.setAttribute('enctype', "multipart/form-data");

    formx.setAttribute('onsubmit', "uploadTrigger();");

    var flupld = ui.createElement('div', 'uploadiv');
    flupld.setAttribute('class', 'fileUpload btn btn-danger btn-block');
    var spanx = ui.createElement('span');
    spanx.innerHTML = 'Upload Image     ';
    flupld.appendChild(spanx);
    flupld.appendChild(icon);

    var fl = ui.createElement('input', 'imgfile');
    fl.setAttribute('type', 'file');
    fl.setAttribute('class', 'upload');
    fl.setAttribute('name', 'upfile');
    fl.setAttribute('onchange' , 'readFile(this);');
    flupld.appendChild(fl);

    formx.appendChild(flupld);
    formx.appendChild(ui.br());

    btn.appendChild(formx);



    //Add Second button which is a 'Download Button'
    var dnbtn = ui.createElement('a', 'dwnload');
    dnbtn.setAttribute('class', 'fileUpload btn btn-block btn-info');
    dnbtn.disabled = true;

    var spanx = ui.createElement('span');
    spanx.innerHTML = 'Download  ';
    dnbtn.appendChild(spanx);

    var icon = ui.createElement('span', 'dnloadicon');
    icon.setAttribute('class', 'glyphicon  glyphicon-save');
    dnbtn.appendChild(icon);

    var btn = document.getElementById('buttonrow-col1');
    btn.appendChild(dnbtn);

}

function readFile(input) {
    console.log('Read File:');
    if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#rawimage').attr('src', e.target.result);
                    $('#pxlimage').attr('src', e.target.result);
                    $('#pxlimage').attr('class', 'imcenter imageblur');
                    uploadTrigger();
                };

                reader.readAsDataURL(input.files[0]);
    }

}

function uploadTrigger() {
    console.log('Upload Trigger');
    progressModal();
    //$('#appmodal').modal('show');

    var fd = new FormData();
    var fileSelection = document.getElementById('imgfile');
    var files = fileSelection.files;
    var upfile = files[0];
    fd.append('upfile', upfile, upfile.name);
    addNotification('warning', 'Uploading '+ upfile.name);
    for (idx=0; idx < files.length; idx++) {
        console.log('==> '+ files[idx].name);
    }
        $.ajax({
            url: '/imgupload',
            type: 'post',
            data: fd,
            contentType: false,
            processData: false,
            success: function(response){
                if(response != 0){
                    console.log('File uploaded ...');
                    console.log(response);
                    updateImages(response);
                }else{
                    alert('file not uploaded');
                }
            },
        });
}

function loadingView() {
}

function updateImages(msg) {
    var resp = JSON.parse(msg);
    removeNotification();
    addNotification('warning', 'Pixelating... please wait');
    var urlx = 'http://' + server + '/pixelatefaces?ifile='+resp['upimg'];
	console.log('Sys: '+ urlx);
    ajaxLoad(pixelateCallBack, urlx);
}

function pixelateCallBack(resp) {
    console.log(resp);
    var rsp = JSON.parse(resp);
    var outfile = rsp['outfile'];
    addNotification('success', 'Pixlated '+ rsp['faces'].length + ' faces.');
    var pxlimg = document.getElementById('pxlimage');
    pxlimg.setAttribute('src', 'pxltd/'+rsp['outfile']);
    pxlimage.setAttribute('class', 'imcenter');

    var btnx = document.getElementById('dwnload');
    btnx.disabled = false;
    btnx.setAttribute('onclick', 'window.open(\'http://'+server+'/pxltd/'+rsp['outfile']+'\');');
    btnx.setAttribute('download', rsp['outfile']);
}

function progressModal() {

 var mcnt = document.getElementById('modalcontent');
    mcnt.innerHTML = '';
    var img = ui.createElement('img', 'pcontent');
    img.setAttribute('src', 'img/file_uploading.gif');
    img.setAttribute('class', 'imcenter');

    //mcnt.appendChild(img);
}
function addNotification(alertType, msg) {
    removeNotification();
    var msg = ui.createNotification(alertType, msg);
    var notify = document.getElementById('notify');
    notify.appendChild(msg);
}

function removeNotification() {
    var notify = document.getElementById('notify');
    notify.innerHTML = '';
}

function addImageCol() {
  var rawimg = ui.createElement('img', 'rawimage');
  rawimg.setAttribute('src', 'img/example/abba-1.png');
  rawimg.setAttribute('class', 'imcenter');
  var col0 = document.getElementById('imagerow-col0');
  var attr = col0.getAttribute('class');
  col0.setAttribute('class', attr + ' well');
  col0.appendChild(rawimg);
  col0.appendChild(ui.hr());


  var pxlimg = ui.createElement('img', 'pxlimage');
  pxlimg.setAttribute('src', 'img/example/abba-1-pxltd.JPG');
  pxlimg.setAttribute('class', 'imcenter');
  var col1 = document.getElementById('imagerow-col1');
  var attr = col1.getAttribute('class');
  col1.setAttribute('class', attr + ' well');
  col1.appendChild(pxlimg);
  col1.appendChild(ui.hr());

}





var systemModel = null; 
var networkObj = null; 

function getsystem_callback(respx) {
	console.log(respx);
	systemModel = JSON.parse(respx); 
	networkObj = systemModel['network'];
	
	drawView();
	
}


