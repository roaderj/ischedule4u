'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})
var user = "";

function initializePage() {
	user = getCookie("email");
	getTasks();
}

// Get tasks from database
function getTasks() {
	var blank = "";
	$.post("/getTask", {user: user, taskID: blank}, displayTask);
}

// Callback of get tasks
// Display all the tasks
function displayTask(tasks) {
	// There is no task associated

	if (tasks.length < 1) {
		var text = "<p style='margin-top:0.5%''><font  " +
			"class='word1'> There is no task right now </font> </p>" +
			"<a href='/addTask' class='linkcolor'>Add task?</a>";
		$('#clicktoedit').html(text);
		return -1;
	}
	var post = "";
	var days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
	// Display each task
	for (var i=0; i<tasks.length; i++) {
		var task = tasks[i];
		var repeat = "";
		var stime = task['start-time'];
		var etime = task['end-time'];
		// One time task
		if (task['is_repeat'] == 0) {
			// Display date if not repeat
			repeat = "Date: " + task['date'];
		}
		// Repeat task
		else {
			repeat = "Repeat: ";
			for (var j=0; j<task['repeat'].length; j++) {
				// Display the day of repeat
				repeat += days[task['repeat'][j]-1] + " ";
			}
		}
		var location = task['location'];
		if (location == "")
			location = "Unknown";
		// Display the task info
		post += "<a href='/editTask/" + task["_id"] + "'>";
		post += "<div class = 'userTask' id = 'task" + i + "'>"
		post += "<p style='background-color:#222222;padding:0.5%;opacity: 0.7;filter: alpha(opacity=70);'>";
		post += "<font color='#FFFFFF'>" + task['name'] + "</font><br>";
		post += "<font style='margin-left:0.5%' color='#FFFFFF'>Duration: " +
			task['duration'] + "</font><br>";
		post += "<font style='margin-left:0.5%' color='#FFFFFF'>Type: " +
			task['type'] + "</font><br>";
		post += "<font style='margin-left:0.5%' color='#FFFFFF'>Priority: " +
			task['priority'] + "</font><br>";
		post += "<font style='margin-left:0.5%' color='#FFFFFF'>Location: " +
			location + "</font><br>";
		post += "<font style='margin-left:0.5%' color='#FFFFFF'>" +
			stime + "-" + etime + "</font><br>";
		post += "<font style='margin-left:0.5%' color='#FFFFFF'>" +
			repeat + "</font><br>";
		post += "</p>";
		post += "</div></a><br>";
	}
	$('#displaySchedule').html(post);
}
