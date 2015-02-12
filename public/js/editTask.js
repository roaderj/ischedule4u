'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

function initializePage() {
	$.get("/getTask", displayTask);
	hide();
	$('#updateEdit').click(updateTask);
}

function updateTask() {
	
}

function displayTask(result) {
	var user = getCookie("email");
	if (!(user in result)) {
		window.location = "/editSchedule";
	}
	var query = window.location.pathname;
	var vars = query.split('/');
	var taskID = parseInt(vars[vars.length-1]);	
	//console.log(taskID);
	var tasks = result[user];
	var task = tasks[taskID];
	if (!task) {
		window.location = "/editSchedule";
	}
	var stime = task['start-time'];
	var etime = task['end-time'];
	document.getElementById("setTimeCheck").checked = true;
	document.getElementById("setLocation").checked = true;
	//console.log($('#setTimeCheck''checked'));
	var setTime = "";
	if (task['is_repeat'] == 1) {
		document.getElementById("setRepeat").checked = true;
		$('.dateRepeatChecked').show();
		for (var i=0;i<task['repeat'].length;i++) {
			document.getElementById("repeated"+task['repeat'][i]).checked = true;
		}
	}
	else {
		var date = moment(stime);
		setTime += date.year() + "/" + date.month() + 
				"/" + date.date() + " ";
		stime = date.hour() + ":" + date.minutes();
		date = moment(etime);
		etime = date.hour() + ":" + date.minutes();
		$('.dateRepeatChecked').hide();
	}
	setTime += stime + "-" + etime;
	$('#setTimeBlank').val(setTime);
	if (!(tasks[taskID])) {
		window.location = "/editSchedule";
	}
	$('#taskName').val(task['name']);
	var duration = task['duration'];
	vars = duration.split(':');
	$('#durationHour').val("" + parseInt(vars[0]));
	$('#durationMinutes').val("" + parseInt(vars[1]));
	$('#setLocationBlank').val(task['location']);
	$('#setPriority').val(task['priority']);
	if (task['tag'] != "") {
		$('#TagList').val(task['tag']);
		document.getElementById("setTag").checked = true;
		$('.setTagList').show();
	}
	else {
		$('.setTagList').hide();
	}
}

function hide() {
	//$('.setTimeCheckBox').hide();
	//$('.setLocationCheckBox').hide();
	//$('.setTagList').hide();
  	//$('#setTimeCheck').click(function() {
	//	$('.setTimeCheckBox')[this.checked ? "show" : "hide"]();	
  	//});
  	//$('#setLocation').click(function() {
	//	$('.setLocationCheckBox')[this.checked ? "show" : "hide"]();	
  	//});
  	$('.repeated').click(function() {
		$('.dateRepeatChecked')[this.checked ? "show" : "hide"]();	
  	}); 
  	$('.setTag').click(function() {
		$('.setTagList')[this.checked ? "show" : "hide"]();
  	});
}
