'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

function initializePage() {
	// Get tasks from database
	$.get("/getTask", displayTask);
	hide();
	$('#updateEdit').click(updateTask);
	$('#deleteTask').click(deleteTask);
}

// Update task
function updateTask() {
	
}

// Delete task
function deleteTask() {
	
}

// Callback of the get tasks
// Display the select task
function displayTask(result) {
	// Get current user
	var user = getCookie("email");
	// This user has no task, go back to schedule
	if (!(user in result)) {
		window.location = "/editSchedule";
	}
	var query = window.location.pathname;
	var vars = query.split('/');
	// Get the select task id
	var taskID = parseInt(vars[vars.length-1]);	
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
	var setTime = "";
	// Repeat task
	if (task['is_repeat'] == 1) {
		document.getElementById("setRepeat").checked = true;
		$('.dateRepeatChecked').show();
		for (var i=0;i<task['repeat'].length;i++) {
			document.getElementById("repeated"+task['repeat'][i]).checked = true;
		}
	}
	// One time task
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
	var duration = task['duration'];
	vars = duration.split(':');
	// Show name
	$('#taskName').val(task['name']);
	// Show duration
	$('#durationHour').val("" + parseInt(vars[0]));
	$('#durationMinutes').val("" + parseInt(vars[1]));
	// Show set time
	$('#setTimeBlank').val(setTime);
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
		$('.setTimeCheckBox')[this.checked ? "show" : "hide"]();	
  	});
  	$('#setLocation').click(function() {
		$('.setLocationCheckBox')[this.checked ? "show" : "hide"]();	
  	});
  	$('.repeated').click(function() {
		$('.dateRepeatChecked')[this.checked ? "show" : "hide"]();	
  	}); 
  	$('.setTag').click(function() {
		$('.setTagList')[this.checked ? "show" : "hide"]();
  	});
}
