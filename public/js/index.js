'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

function initializePage() {
	getEvents();
}

// Get tasks from database
function getEvents() {
	$.get("/getTask", setCalendar);
}

// all the tasks
var tasks = [];

// Callback of get tasks
function setCalendar(result) {
	// Add all tasks to tasks array
	addTasks(result);
	// Format calendar
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
        scrollTime : '06:00:00',
        // Pop up when event is clicked
        eventClick : function(event) {
        	var vars = event['startTime'].split('T');
        	var stime = vars[vars.length-1];
        	vars = event['endTime'].split('T');
        	var etime = vars[vars.length-1];
        	var tagMessage = "";
        	if (event['tag'] != "") {
        		tagMessage = "\nTag: " + event['tag'];
        	}
        	alert('Task: ' + event.title + 
        		'\nLocation: ' + event['location'] +
        		'\nTime: ' + stime + 
        		'-' + etime +tagMessage);
        }
    });
}

// Push all tasks on to the tasks array
function addTasks(result) {
	// Get current user
	var user = getCookie("email");
	// There is no task associated
	if (!(user in result))
		return -1;
	// Get the tasks of this user
	var userTasks = result[user];
	// Push each task
	for (var i=0; i<userTasks.length;i++) {
		var task = userTasks[i];
		// Repeat task
		if (task['is_repeat'] == 1) {
			for (var j=0;j<task['repeat'].length;j++) {
				if (task['repeat'][j] == 7)
					task['repeat'][j] = 0;
			}
			var taskModified = {
				title : task['name'],
				location : task['location'],
				startTime : task['start-time'],
				endTime: task['end-time'],
				tag: task['tag'],
				start : task['start-time'],
				end : task['end-time'],
				dow : task['repeat']
			};
		}
		else {
			// One time task
			var taskModified = {
				title : task['name'],
				location : task['location'],
				startTime : task['start-time'],
				endTime: task['end-time'],
				tag: task['tag'],
				start : task['start-time'],
				end : task['end-time']
			};
		}
		tasks.push(taskModified);
	}
}







