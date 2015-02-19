'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

var taskID = "";
var user = "";

function initializePage() {
	// Get tasks from database
	user = getCookie("email"); // Get the current user
	hide();
	var query = window.location.pathname;
	//console.log(query);
	var vars = query.split('/');
	// Get the select task id
	taskID = vars[vars.length-1];
	//console.log(taskID);
	$.post("/getTask", {user: user, taskID: taskID},displayTask);
	$('#updateEdit').click(updateTask);
	$('#deleteTask').click(deleteTask);
}

// Update task
function updateTask() {
	var duration = $('#durationHour').val() + ":" + $('#durationMinutes').val();
	var type = $('#TypeList').val();
	var repeat = [];
	var stime = $('#setTimeStart').val();
	var etime = $('#setTimeEnd').val();
	var date = $('#setDateBox').val();
	if (document.getElementById("setRepeat").checked) {
		var is_repeat = false;
		date = "";
		for (var i=1;i<8;i++) {
			if (document.getElementById("repeated"+i).checked) {
				repeat.push(i);
			}
		}
	}
	else {
		var is_repeat = false;
	}
	// Adding new tag to db
	//var newTag = $('#otherTag').val();
	//var tag = $('#TagList').val();
	//if ($('#TagList').val() == 'other' && newTag != "") {
	//	$.post("/setTag", {user: user, tag: newTag}, function(){});
	//	tag = newTag;
	//}
	var task = {
	  //"_id": taskID,
	  "user": user,
      "name": $('#taskName').val(),
      "priority": $('#setPriority').val(),
	  "type": type,
      "location": $('#setLocationBlank').val(),
      "duration": duration,
      "start-time": stime,
      "end-time": etime,
      //"tag": tag,
      "date": date,
      "is_repeat": is_repeat,
      "repeat": repeat
    };
    $.post("/updateTask", {user: user, taskID: taskID, task: task}, done);
}

// Go back to homepage
function done(result) {
	window.location = "/";
}

// Delete task
function deleteTask() {
	$.post("/deleteTask", {user: user, taskID: taskID}, function(result){
    	window.location = "/editSchedule";
    });
}

// Callback of the get tasks
// Display the select task
function displayTask(result) {
	// Get current user
	// This user has no task, go back to schedule
	//if (!(user in result)) {
	//	window.location = "/editSchedule";
	//}
	// This task id is not exist, go back to schedule
	if (result.length < 1) {
		window.location = "/editSchedule";
	}
	var task = result[0];
	//console.log(task);
	var stime = task['start-time'];
	var etime = task['end-time'];
	document.getElementById("setTimeCheck").checked = true;
	document.getElementById("setLocation").checked = true;
	var date = task['date'];
	// Repeat task
	if (task['is_repeat'] == true) {
		document.getElementById("setRepeat").checked = true;
		$('.dateRepeatChecked').show();
		$('#setDate').hide();
		for (var i=0;i<task['repeat'].length;i++) {
			document.getElementById("repeated"+task['repeat'][i]).checked = true;
		}
	}
	// One time task
	else {
		$('#setDateBox').val(date);
		$('#setDate').show();
		$('.dateRepeatChecked').hide();
	}
	var duration = task['duration'];
	var vars = duration.split(':');
	//console.log(parseInt(vars[1]));
	// Show name
	$('#taskName').val(task['name']);
	// Show Type
	$('#TypeList').val(task['type']);
	// Show duration
	$('#durationHour').val(vars[0]);
	$('#durationMinutes').val(vars[1]);
	// Show set time
	$('#setTimeStart').val(stime);
	$('#setTimeEnd').val(etime);
	// Show location
	$('#setLocationBlank').val(task['location']);
	// Show priority
	$('#setPriority').val(task['priority']);
	// Show tag
	//if (task['tag'] != "") {
	//	$('#TagList').val(task['tag']);
	//	document.getElementById("setTag").checked = true;
	//	$('.setTagList').show();
	//}
	//else {
	//	$('.setTagList').hide();
	//}
}

// Hide unclick blanks
function hide() {
	//$('#otherTag').hide();
	$('#Advanced').hide();

  	$('#setTimeCheck').click(function() {
		$('#setTimeCheckBox')[this.checked ? "show" : "hide"]();
  	});

		$("#AdvancedButton").click(function()
		{
			$("#Advanced").toggle();
		});

  	$('#setLocation').click(function() {
		$('.setLocationCheckBox')[this.checked ? "show" : "hide"]();
  	});
  	$('.repeated').click(function() {
		$('.dateRepeatChecked')[this.checked ? "show" : "hide"]();
		$('#setDate')[this.checked ? "hide" : "show"]();
  	});
  	//$('.setTag').click(function() {
	//	$('#TagList')[this.checked ? "show" : "hide"]();
  	//});
  	//$('#TagList').change(function() {
  	//	if ($('#TagList').val() == 'other') {
  	//		$('#otherTag').show();
  	//	}
  	//	else {
  	//		$('#otherTag').hide();
  	//	}
  	//});
  	//$.get("/getTag",setTag);
}

// Callback function of getTag
// Display all tags
/*
function setTag(result) {
	var tags = result[user];
	if (!tag) {
		for (var i=0;i<tags.length;i++) {
			var tag = tags[i];
			$('#TagList').append("<option value='" + tag +
				"'>" + tag + "</option>");
		}
	}

}
*/
