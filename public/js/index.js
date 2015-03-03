'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

var user = "";

function initializePage() {
	$(".v_a_page_switch").click(function(){
		woopra.track("a_version_page_change");
	});
	$(".v_b_page_switch").click(function(){
		woopra.track("b_version_page_change");
	});
	user = getCookie("email");
	getEvents();
}

// Get tasks from database
function getEvents() {
	var blank = "";
	$.post("/getTask", {user: user, taskID: blank}, setCalendar);
}

// all the tasks
var tasks = [];
var scrollTime = '24:59';
// Callback of get tasks
function setCalendar(result) {
	// Add all tasks to tasks array
	//console.log(result);
	addTasks(result);
	// Format calendar
	if (scrollTime == '24:59')
		scrollTime = '07:00';
    $('#calendar').fullCalendar({
    	// Calendar option
        header : {
            left: 'prev,today,next',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        }, 
        // Load events
        events : tasks, 
        allDaySlot : false,
        // Scroll down to default time
        scrollTime : scrollTime,
        // Pop up when event is clicked
        eventClick : function(event) {
        	//var vars = event['startTime'].split('T');
        	//var stime = vars[vars.length-1];
        	//vars = event['endTime'].split('T');
        	//var etime = vars[vars.length-1];
        	var locationMessage = "";
        	if (event['location'] != "") {
        		locationMessage = "\nLocation: " + event['location'];
        	}
        	//console.log(event['start']);
        	alert('Task: ' + event.title + 
        		'\nType: ' + event['taskType'] + 
        		locationMessage +
        		'\nTime: ' + event['startTime'] + 
        		'-' + event['endTime']);
        }
    });
}

// Push all tasks on to the tasks array
function addTasks(userTasks) {
	// Get current user
	//var user = getCookie("email");
	// There is no task associated
	//if (!(user in result))
	//	return -1;
	// Get the tasks of this user
	//var userTasks = result[user];
	// Push each task
	for (var i=0; i<userTasks.length;i++) {
		var task = userTasks[i];
		if (task['start-time'] < scrollTime)
			scrollTime = task['start-time'];
		//console.log(task['start-time']);
		var color = "Chocolate";
		if (task['type'] == "Homework" || task['type'] == "Programming" || task['type'] == "Reading")
			color = "LimeGreen";
		else if (task['type'] == "Exam")
			color = "red";
		else if (task['type'] == "Fitness")
			color = "darkorange";
		else if (task['type'] == "Class")
			color = "CornflowerBlue";
		// Repeat task
		if (task['is_repeat'] == true) {
			for (var j=0;j<task['repeat'].length;j++) {
				if (task['repeat'][j] == 7)
					task['repeat'][j] = 0;
			}
			var taskModified = {
				title : task['name'],
				location : task['location'],
				startTime : task['start-time'],
				endTime: task['end-time'],
				//tag: task['tag'],
				start : task['start-time'],
				end : task['end-time'],
				dow : task['repeat'],
				taskType : task['type'],
				color: color
			};
		}
		else {
			// One time task
			var starttime = task['date'] + "T" + task['start-time'];
			var endtime = task['date'] + "T" + task['end-time'];
			var taskModified = {
				title : task['name'],
				location : task['location'],
				startTime : task['start-time'],
				endTime: task['end-time'],
				//tag: task['tag'],
				start : starttime,
				end : endtime,
				taskType : task['type'],
				color: color
			};
		}
		tasks.push(taskModified);
	}
}







