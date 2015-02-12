'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

function initializePage() {
	getTasks();
}

function getTasks() {
	$.get("/getTask", displayTask);
}

function displayTask(result) {
	var user = getCookie("email");
	if (!(user in result)) {
		var text = "<p style='margin-top:0.5%''><font  " + 
			"color='#FFFFFF'> There is no task right now </font> </p>" + 
			"<a href='/addTask' >Add task?</a>";
		$('#clicktoedit').html(text);
		return -1;
	}
	var tasks = result[user];
	var post = "";
	var days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
	for (var i=0; i<tasks.length; i++) {
		var task = tasks[i];
		var repeat = "";
		var stime = task['start-time'];
		var etime = task['end-time'];
		if (task['is_repeat'] == 0) {
			var date = moment(stime);
			repeat = "Date: " + date.year() + "/" + date.month() + 
				"/" + date.date();
			stime = date.hour() + ":" + date.minutes();
			date = moment(etime);
			etime = date.hour() + ":" + date.minutes();
		} 
		else {
			for (var j=0; j<task['repeat'].length; j++) {
				repeat = "Repeat: " + days[task['repeat'][j]-1] + " ";
			}
		} 
		post += "<a href='/addTask'>";
		post += "<div class = 'userTask' id = 'task" + i + "'>"
		post += "<p style='background-color:#222222;padding:0.5%'>";
		post += "<font color='#FFFFFF'>" + task['name'] + "</font><br>";
		post += "<font style='margin-left:0.5%' color='#FFFFFF'>Duration: " +
			task['duration'] + "</font><br>";
		post += "<font style='margin-left:0.5%' color='#FFFFFF'>Priority: " + 
			task['priority'] + "</font><br>";
		post += "<font style='margin-left:0.5%' color='#FFFFFF'>Location: " +
			task['location'] + "</font><br>";
		post += "<font style='margin-left:0.5%' color='#FFFFFF'>" + 
			stime + "-" + etime + "</font><br>";
		post += "<font style='margin-left:0.5%' color='#FFFFFF'>" +
			repeat + "</font><br>";
		post += "<font style='margin-left:0.5%' color='#FFFFFF'>Related To: " +
			task['tag'] + "</font>";
		post += "</p>";
		post += "</div></a><br>";
	}
	$('#displaySchedule').html(post);
}




