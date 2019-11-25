
//Bootstrap  card
// carddetails = {
//	'header' : html, 
//  'content': html, 
//  'footer  : html
// }

function card (id, carddetails) {
	card = document.createElement('div');
	card.setAttribute('class', 'card');
		cardcontent = document.createElement('div');
		cardcontent.setAttribute('class', 'content');
			cardrow = document.createElement('div');
			cardrow.setAttribute('class', 'row');
				iconrow = document.createElement('div');
				iconrow.setAttribute('class', 'col-xs-5');
				icondiv = document.createElement('div');
				icondiv.setAttribute('class', 
						'icon-big icon-warning text-center');
				icon = document.createElement('i');
				icon.setAttribute('class', 'ti-server');
				icondiv.appendChild(icon);
				iconrow.appendChild(icondiv);
			cardrow.appendChild(iconrow);
			
				numrow = document.createElement('div');
				numrow.setAttribute('class', 'col-xs-7');
				numdiv = document.createElement('div');
				numdiv.setAttribute('class', 'numbers');
				px = document.createElement('p');
				px.innerHTML = accounthistory['dispatched'];
				numdiv.innerHTML = 'Quota';
				numdiv.appendChild(px);
				numrow.appendChild(numdiv);
			cardrow.appendChild(numrow);
			
		cardcontent.appendChild(cardrow);
		
		footer = document.createElement('div');
		footer.setAttribute('class', 'footer');
			htr = document.createElement('hr');
		footer.appendChild(htr);
			updt = document.createElement('div');
			updt.setAttribute('class', 'stats');
			updt.setAttribute('onclick', '');
				icon = document.createElement('i');
				icon.setAttribute('class', 'ti-reload');
				icon.innerHTML = '  Update Now'
			updt.appendChild(icon);
		footer.appendChild(updt);
		cardcontent.appendChild(footer);
		
	card.appendChild(cardcontent);

col.appendChild(card);
	
	
	el = document.getElementById(id);
	el.appendChild(card);
	
}


function generateTable(pid, classname, header, tabledata) {
	parent = document.getElementById(pid);
	parent.innerHTML = ''; 
	
	tbl = document.createElement('table');
	tbl.setAttribute('class', 'table '+classname);
	
	//header section
	thead = document.createElement('thead');
	tr = document.createElement('tr');
	
	for (idx = 0; idx < header.length; idx++) {
		th = document.createElement('th');
		th.innerHTML = header[idx]; 
		tr.appendChild(th);
	}
	thead.appendChild(tr);
	tbl.appendChild(thead);
	
	//body section
	tbody = document.createElement('tbody');
	for (idx = 0 ; idx < tabledata.length; idx++) {
		rdata = tabledata[idx]; 
		tr = document.createElement('tr');
		for (ridx= 0; ridx < rdata.length; ridx++) {
			td = document.createElement('td');
			td.innerHTML = rdata[ridx];
			tr.appendChild(td);
		}
		tbody.appendChild(tr);
	}
	tbl.appendChild(tbody);
	
	parent.appendChild(tbl);
}


function navigationTabs(pid, id, style, tabs) {
	
	navtabview = document.createElement('div');
	navtabview.setAttribute('id', id);
	navdiv = document.createElement('div');
	navdiv.setAttribute('class', 'nav-tabs-navigation');
	
		navwrap = document.createElement('div') ;//<div class="nav-tabs-wrapper">
		navwrap.setAttribute('class', 'nav-tabs-wrapper');
	
		nav = document.createElement('ul');
		nav.setAttribute('class', 'nav nav-tabs nav-'+style);
	
		for (i=0; i < tabs.length; i++) {
			tab = tabs[i]; 
			li = document.createElement('li');
			if ( i == 0) {
				li.setAttribute('class', 'active');
			}
			a = document.createElement('a');
			a.innerHTML = tab['name'];
			a.setAttribute('data-toggle', 'tab');
			a.setAttribute('href', '#tab'+id+i.toString());
			li.appendChild(a);
			nav.appendChild(li); 
		}
		
		
	navwrap.appendChild(nav);
	navdiv.appendChild(navwrap);
	navtabview.appendChild(navdiv);
	
	tabview = document.createElement('div');
	tabview.setAttribute('class', 'tab-content text-center');
	tabview.setAttribute('id', 'tabview-'+id);
	
	for (i=0; i < tabs.length; i++) {
		tabpane = document.createElement('div');
		tabpane.setAttribute('id', 'tab'+id+i.toString());
		tab = tabs[i];
		if (i ==0 ) {
			tabpane.setAttribute('class', 'tab-pane active');
		} else {
			tabpane.setAttribute('class', 'tab-pane');
		}
		
		tabpane.appendChild(tab['content']); 
		tabview.appendChild(tabpane);
	}
	navtabview.appendChild(tabview);
	
	return navtabview; 
}


function createFormElement(id, inputdef) {
	//label, inputtype, placeholder, value) {

	
	p = document.createElement('div');
	if (inputdef['type'] =='checkbox') {
		p.setAttribute('class', 'checkbox');
	} else {
		p.setAttribute('class', 'form-group');
	}
	
	 if (inputdef['label']) {
		 lbl = document.createElement('label');
		 lbl.setAttribute('class', 'pull-left');
		 lbl.innerHTML = label;
		p.appendChild(lbl);
	 }
		
	inp = document.createElement('input');
	inp.setAttribute('type', inputdef['type']);
	
	if (inputdef['class']) {
		inp.setAttribute('class',
						 'form-control border-input '+ inputdef['class']);
	} else {
		inp.setAttribute('class', 'form-control border-input');
	}
	
	if (inputdef['name']) {
		inp.setAttribute('name', inputdef['name']); 
	}
	
	if (inputdef['onclick']) {
		inp.setAttribute('onclick', inputdef['onclick']); 
	}
	
	if (inputdef['placeholder']) {
		inp.setAttribute('placeholder', inputdef['placeholder']);
	}
	inp.setAttribute('id', 'input'+id);
	if (inputdef['value']) {
		inp.setAttribute('value', inputdef['value']);
	}
	p.appendChild(inp);
		
	return p; 
}


function createCheckBoxes(id, checkboxes) {
	/*<div class="checkbox">
    <label>
      <input type="checkbox"> Check me out
    </label>*/
	chboxgrp = document.createElement('div');
	tbl = document.createElement('table');
	tbl.setAttribute('class', 'table-striped');
	tbody = document.createElement('tdboy');
	//chboxgrp.setAttribute('class', 'form-group');
	for (i=0; i < checkboxes.length; i++) {
		checkbox = checkboxes[i]; 
		
		ipdx = id.toLowerCase()+i.toString(); 
		
		trow = document.createElement('tr');
		chkbox = document.createElement('td');
			lbl = document.createElement('label');
			lbl.setAttribute('class', 'custom-control custom-checkbox');
			//lbl.setAttribute('for', ipdx);
		
			inp = document.createElement('input');
			inp.setAttribute('type', 'checkbox');
			inp.setAttribute('placeholder', checkbox);
			inp.setAttribute('class', 'custom-control-input');
			inp.setAttribute('id', ipdx);
		
			//inp.setAttribute('data-toggle', 'checkbox');
			lbl.appendChild(inp);
			span = document.createElement('span');
			span.setAttribute('class', 'custom-control-indicator');
			lbl.appendChild(span);
		
			chkbox.appendChild(lbl);
		trow.appendChild(chkbox);
		namex = document.createElement('td');
		namex.innerHTML = checkbox; 
		trow.appendChild(namex);
		
		tbody.appendChild(trow);
	}
	tbl.appendChild(tbody);
	chboxgrp.appendChild(tbl);
	return chboxgrp; 
}

function createForm (id, inputarray) {
	
	txtformgroup = document.createElement('div');
	txtformgroup.setAttribute('id', id);
	//txtformgroup.setAttribute('class', 'form-group');
	
	for (i=0; i < inputarray.length; i++) {
		inputdef = inputarray[i]; 
		inpformel = createFormElement(id.toLowerCase()+i.toString(), 
									  inputdef);
		txtformgroup.appendChild(inpformel);
	}
	
	return txtformgroup; 
}


function getBreak() {
	br = document.createElement('br');
	return br; 
}


function getLabel(text, position) {
	label = document.createElement('label');
	label.innerHTML = text; 
	
	if (position){
		label.setAttribute('class', 'pull-'+position);
	}
		
	
	return label; 
}



function getHr() {
	hr = document.createElement('hr');
	//hr.setAttribute('class', 'pull-left');
	return hr; 
}


//parent elem
function displayNotification(pid, ntype, message) {
	parentid = document.getElementById(pid);
	parentid.innerHTML = ''; 
	
	divx = document.createElement('div');
	divx.setAttribute('class', 'alert alert-'+ntype);
	
	close = document.createElement('button');
	close.setAttribute('type', 'button');
	close.setAttribute('aria-hidden', 'false');
	close.setAttribute('class', 'close');
	close.innerHTML = 'x';
	span = document.createElement('span');
	span.innerHTML = message;
	divx.appendChild(close);
	divx.appendChild(span);
	
	parentid.appendChild(divx);
}


//parent elem
function createNotification(id, ntype, message) {
	
	divx = document.createElement('div');
	divx.setAttribute('id', id);
	divx.setAttribute('class', 'alert alert-'+ntype);
	
	close = document.createElement('button');
	close.setAttribute('type', 'button');
	close.setAttribute('aria-hidden', 'true');
	close.setAttribute('class', 'close');
	close.innerHTML = 'x';
	span = document.createElement('span');
	span.setAttribute('data-notify', message);
	span.innerHTML = message;
	divx.appendChild(close);
	divx.appendChild(span);
	
	return divx
}

function createNavBar(id, nav) {
	
}

/**
 *
 * @param inputdef
 * @param submitDef
 * @returns
 */
function buttonInputBar(inputdef) {
	var divx = document.createElement('div');
	divx.setAttribute('class', 'input-group mb-3');
	
	var inp = document.createElement('input');
	inp.setAttribute('type', inputdef['type']);
	inp.setAttribute('aria-label', inputdef['label']);
	inp.setAttribute('aria-describedby', 'button-addon2');
	divx.appendChild(inp);
	
	var divgrp = document.createElement('input-group-append');
	var btn = document.createElement('button');
	btn.setAttribute('class', 'btn btn-outline-secondary');
	btn.setAttribute('type', 'button');
	btn.innerHTML = inputdef['button'];
	btn.setAttribute('onclick', inputdef['onclick']);
	divgrp.addpendChild(btn);
	divx.appendChild(divgrp);
	/*
	<div class="input-group mb-3">
	  <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2">
	  <div class="input-group-append">
	    <button class="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
	  </div>
	</div>
	*/
	return divx;
}

