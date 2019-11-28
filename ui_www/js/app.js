
var serverLocation = location.host; 
var server = "http://" + serverLocation ;
console.log("Location: "+ server); 


function appInit() {
	appNavBar();
	loadLandingView(); 
	updatePerSecond();
	addImageCol();
	addButtonCol();

	initUpload();
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

function initUpload() {
    var jxhr = $('#imgbtn').fileupload({
        dataType: 'image',
        done: function (e, data) {
            $.each(data.files, function (index, file) {
                alert("Fileupload...");
                $('<p/>').text(file.name).appendTo('#files');
            });
        },
        progressall: function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);
        $('#progress .progress-bar').css(
            'width',
            progress + '%'
        );
    }
    }).bind('fileuploadcompleted',
            function (e, data) {
                alert("Message","Title")
               }
           );
}


function loadLandingView() {
		
		var h1x = ui.h3(null, '', [{'name' : 'class', 'value' : 'mainlogo text-center' }]);
		var jum = ui.jumbotron('view1', h1x,' bg-basic'); 
		
        var crow = ui.addRowCol('imagerow', 2);
        var brow = ui.addRowCol('buttonrow', 2);


		var resultarea = ui.createElement('div', 'results');
		var notifyarea = ui.createElement('div', 'notify');
		
		//jum.appendChild(farStatusForm());
        //jum.appendChild(guagearea);
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

function addButtonCol() {
    var upbtn = ui.createElement('a', 'upload');
    upbtn.setAttribute('class', 'btn btn-block btn-warning');
    upbtn.innerText = 'Upload Image';

    var icon = ui.createElement('span', 'uploadicon');
    icon.setAttribute('class', 'glyphicon glyphicon-cloud-upload');
    upbtn.appendChild(icon);

    var formx = ui.createElement('form', 'formidx');
    formx.setAttribute('action', '/imgupload');

    var btn = document.getElementById('buttonrow-col0');
    var fl = ui.createElement('input', 'imgbtn');
    fl.setAttribute('type', 'file');
    fl.setAttribute('name', 'upfile');
    fl.setAttribute('data-url', '/imgupload');
    formx.appendChild(fl);

    btn.appendChild(fl);
    btn.appendChild(ui.br());

    btn.appendChild(upbtn);
}

function upload() {
    console.log('Uploading image..');

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

  var prx = ui.createElement('div', 'progress');
  col1.appendChild(prx);
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


