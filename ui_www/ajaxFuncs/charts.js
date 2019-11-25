google.load('visualization', '1', {packages: ['orgchart', 'corechart']});
google.setOnLoadCallback(gCallBack);

function gCallBack() {
}

function drawOrgChart(losdata) {
	data = new google.visualization.DataTable();
	data.addColumn('string', 'iboname');
	data.addColumn('string', 'sponsor');
	data.addColumn('string', 'tooltip');
	
	for (x=0; x < losdata.length; x++) {
		//p.innerText = lObj.iboname + "/"+ lObj.sponsor; 
		lObj = losdata[x];
		if (lObj.sponsor == "null") 
			data.addRow([lObj.iboname, null, lObj.sponsor]);
		else
			data.addRow([lObj.iboname, lObj.sponsor, lObj.sponsor]);
	}
	chartDraw(data);

 

}

function chartDraw( visArray ) {
	data =  visArray; 
	var chart = new google.visualization.OrgChart(document.getElementById('org'));
        chart.draw(data, {allowHtml: false});
}


function pieChart( dataseries ) {
	//iboname, pvolume
	chartData = JSON.parse(dataseries);
	gdata = new google.visualization.DataTable();
	gdata.addColumn('string', 'iboname');
	gdata.addColumn('number', 'volume');
	for (i=0; i < chartData.length; i++) {
		pData = chartData[i]
		gdata.addRow([pData.iboName, parseFloat(pData.pvolume)]);
	}

	var pchart = new google.visualization.PieChart(document.getElementById('pulse'));
        pchart.draw(gdata, {
				title : 'Group Volume', 
				legend: 'none',
				pieSliceText: 'label'
			});
}


function comboChart ( dataseries) {
	chartData = JSON.parse(dataseries);
	gdata = new google.visualization.DataTable();
	gdata.addColumn('date', 'Date');
	
	lastIdx = chartData.length - 1;
	//alert('LastIdx:'+ lastIdx);
	volser = chartData[lastIdx].volumeseries;

	//alert('Length:'+ volser.length);
	for (i=0; i < volser.length; i++) {
	   vobj = volser[i];
	   gdata.addColumn('number', vobj.name);
	}

        gdata.addColumn('number', 'Total Volume');
	var tVolPos = volser.length; 
	/*Insert Data into rows*/
	for (i=0; i < chartData.length; i++) {
		cObj = chartData[i];
		dts  = chartData[i].date.split('-'); 
	
		volseries = chartData[i].volumeseries; 
		volArr = new Array();
		volArr.push(new Date(dts[0],dts[1],dts[2]) );

		//alert('LData:'+ volseries.length);
		totalVol=0;
		for (j=0; j < volseries.length; j++) {
			vol = parseFloat(volseries[j].pvolume);
			volArr.push(vol);
			totalVol = totalVol + vol; 
		}
		if (volArr.length < tVolPos) {
			diff = tVolPos - volArr.length;
			for (j=0; j < 2; j++) {
				volArr.push(0);
			}
		}
		
		volArr.push(totalVol);
		tVolPos = volArr.length; 
		gdata.addRow(volArr)
	}
	
	tVolPos = tVolPos-2; 
	alert('VolPos: '+ tVolPos);
	 var ac = new google.visualization.ComboChart(document.getElementById('pulse'));
         ac.draw(gdata, {
          title : 'Volume By Date',
          vAxis: {title: "Volume"},
          hAxis: {title: "Date"},
	  legend: {position: 'bottom'}, 
          seriesType: "line",
          series: { tVolPos : {type: "line"}}
	  }
        );


}

function personalVolumeChart2 ( dataseries) {
	chartData = JSON.parse(dataseries);
	id = 'pulse';
	//alert('-->'+  dataseries);

	var dataArray = new Array(); 
	for (i=0; i < chartData.length; i++) {
		cObj = chartData[i];
		el = [ cObj.dateseries , cObj.totalvolume];
		//el = [ cObj.date , cObj.totalvolume];
		dataArray.push(el);
	}
		
	/*
	$.plot('#pulse', [ {data : dataArray, label : "Volume" } ], 
		{ series : { 
				lines : {show: true }, 
				points: {show: true, fill: false}  
			   }
		}, 
		{ xaxis: {
			show : true,  
			mode: "categories",
			//minTickSize: [1, "day" ], 
			timeformat: "%Y/%m/%d" 
			}
		}, 
		
	   ); 
	*/

}

function personalVolumeChart ( dataseries ) {
	chartData = JSON.parse(dataseries);
	id = 'pulse';

	gdata = new google.visualization.DataTable();
	gdata.addColumn('date', 'Date');
	gdata.addColumn('number', 'Volume');

	date = null;
	for (i=0; i < chartData.length; i++) {
		cObj = chartData[i];
		d    = cObj.date;
		dts  = d.split('-');
		date = new Date(cObj.dateseries);
		gdata.addRow( [new Date(dts[0],dts[1]-1,dts[2]), cObj.totalvolume]  );
	}
	
	var ch = new google.visualization.LineChart(document.getElementById(id)); 
	ch.draw(gdata,
			 {
				title   : 'Volume For '+ date.toJSON() , 
				hAxis   : {slantedText: true, format : "dd"}, 
				curveType: "function",
				pointSize: 2,   
				legend : { position: 'none' }
			 }
          );

}



function volumeStackChart( dataseries ) {
	chartData = JSON.parse(dataseries);
	id = 'pulse';
	var dataArray = new Array(); 
	for (i=0; i < chartData.length; i++) {
		iboObj = chartData[i];
		iboVolSeries = iboObj.volumeseries;
		var d0 = new Array(); 
		var d1 = new Array(); 
		max = iboVolSeries.length; 
		for (j=0; j < max;  j++) {
			vEl = iboVolSeries[j];
			dt = new Date(parseInt(vEl.date) );
			yy = dt.getYear(); mm = dt.getMonth(); dd = dt.getDay(); 

			el = [dt, parseFloat(vEl.pvolume)];

			//alert('EL:'+ el);
			ex = [max-j, parseFloat(vEl.pvolume)+2];
			d0.push(el);
			d1.push(ex);
		}


		dObj = { "data" : d0,  
			"label" : iboObj.name 
			};

		dataArray.push(dObj);

	}
	//alert('-->'+ dataArray[2].label + '---' + dataArray[2].data );
	var stack = 1,	bars = true, lines = false, steps = false;
	$.plot('#pulse', 
		  dataArray
		   , 
		{ series : { 
				stack: true, 
				bars : {show: true, barwidth: 0.5 }  
			   }
		}, 
		{ xaxis: {
			show : true,  
			mode: "time", 
			tickLength: 0, 
			color : "black"
			}
		}
	   ); 


}




