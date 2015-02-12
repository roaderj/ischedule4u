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
        	var stime = moment(event['start']);
        	var etime = moment(event['end']);
        	var shour = stime.hour();
        	var sminute = stime.minutes();
        	var ehour = etime.hour();
        	var eminute = etime.minutes();
        	alert('Task: ' + event.title + 
        		'\nLocation: ' + event['location'] +
        		'\nTime: ' + shour + ':' + sminute + 
        		'-' + ehour + ':' + eminute);
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
			var taskModified = {
				title : task['name'],
				location : task['location'],
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
				start : task['start-time'],
				end : task['end-time']
			};
		}
		tasks.push(taskModified);
	}
}







