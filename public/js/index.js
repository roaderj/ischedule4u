'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

function initializePage() {
	getEvents();
}

function getEvents() {
	$.get("/getTask", setCalendar);
}

var tasks = [];

function setCalendar(result) {
	//console.log(result);
	addTasks(result);
	//tasks = [{
		//title : "event1",
		//start : "2015-02-11"
	//}];
    $('#calendar').fullCalendar({
        header : {
            left: 'prev,today,next',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        }, 
        events : tasks, 
        allDaySlot : false,
        scrollTime : '06:00:00',
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

function addTasks(result) {
	var userTasks = result['tasks'];
	//console.log(userTasks.length);
	for (var i=0; i<userTasks.length;i++) {
		var task = userTasks[i];
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







