'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

var taskID = "";
var user = "";

function initializePage() {
	// Get tasks from database
	$.get("/getTask", displayTask);
	hide();
	$('#updateEdit').click(updateTask);
	$('#deleteTask').click(deleteTask);
}

// Update task
function updateTask() {
	var duration = $('#durationHour').val() + ":" + $('#durationMinutes').val();
	var repeat = [];
	var stime = $('#setTimeStart').val();
	var etime = $('#setTimeEnd').val();
	var date = $('#setDateBox').val();
	if (document.getElementById("setRepeat").checked) {
		var is_repeat = 1;
		for (var i=1;i<8;i++) {
			if (document.getElementById("repeated"+i).checked) {
				repeat.push(i);
			}
		}
	}
	else {
		var is_repeat = 0;
		stime = date + "T" + stime;
		etime = date + "T" + etime;
	}
	var task = {
      "name": $('#taskName').val(),
      "priority": $('#setPriority').val(),
      "location": $('#setLocationBlank').val(),
      "duration": duration,
      "start-time": stime,
      "end-time": etime,
      "tag": $('#TagList').val(),
      "date": date,
      "is_repeat": is_repeat,
      "repeat": repeat
    };
    $.post("/updateTask", {user: user, id: taskID, task: task}, done);
}

function done(result) {
	window.location = "/";
}

// Delete task
function deleteTask() {
	$.post("/deleteTask", {user: user, id: taskID}, done);
}

// Callback of the get tasks
// Display the select task
function displayTask(result) {
	// Get current user
	user = getCookie("email");
	// This user has no task, go back to schedule
	if (!(user in result)) {
		window.location = "/editSchedule";
	}
	var query = window.location.pathname;
	var vars = query.split('/');
	// Get the select task id
	taskID = parseInt(vars[vars.length-1]);	
	var tasks = result[user];
	var task = tasks[taskID];
	// This task id is not exist, go back to schedule
	if (!task) {
		window.location = "/editSchedule";
	}
	var stime = task['start-time'];
	var etime = task['end-time'];
	document.getElementById("setTimeCheck").checked = true;
	document.getElementById("setLocation").checked = true;
	var date = "";
	// Repeat task
	if (task['is_repeat'] == 1) {
		document.getElementById("setRepeat").checked = true;
		$('.dateRepeatChecked').show();
		$('#setDate').hide();
		for (var i=0;i<task['repeat'].length;i++) {
			document.getElementById("repeated"+task['repeat'][i]).checked = true;
		}
	}
	// One time task
	else {
		vars = stime.split('T');
		date = vars[0];
		stime = vars[1];
		vars = etime.split('T');
		etime = vars[1];
		$('#setDateBox').val(date);
		$('#setDate').show();
		$('.dateRepeatChecked').hide();
	}
	var duration = task['duration'];
	vars = duration.split(':');
	// Show name
	$('#taskName').val(task['name']);
	// Show duration
	$('#durationHour').val("" + parseInt(vars[0]));
	$('#durationMinutes').val("" + parseInt(vars[1]));
	// Show set time
	$('#setTimeStart').val(stime);
	$('#setTimeEnd').val(etime);
	// Show location
	$('#setLocationBlank').val(task['location']);
	// Show priority
	$('#setPriority').val(task['priority']);
	// Show tag
	if (task['tag'] != "") {
		$('#TagList').val(task['tag']);
		document.getElementById("setTag").checked = true;
		$('.setTagList').show();
	}
	else {
		$('.setTagList').hide();
	}
}

// Hide unclick blanks
function hide() {
  	$('#setTimeCheck').click(function() {
		$('#setTimeCheckBox')[this.checked ? "show" : "hide"]();	
  	});
  	$('#setLocation').click(function() {
		$('.setLocationCheckBox')[this.checked ? "show" : "hide"]();	
  	});
  	$('.repeated').click(function() {
		$('.dateRepeatChecked')[this.checked ? "show" : "hide"]();	
		$('#setDate')[this.checked ? "hide" : "show"]();
  	}); 
  	$('.setTag').click(function() {
		$('.setTagList')[this.checked ? "show" : "hide"]();
  	});
}
