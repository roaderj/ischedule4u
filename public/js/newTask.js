 'use strict';

 $(document).ready(function() {
	initializePage();
})

var user = "";

function initializePage() {
	//console.log("Javascript connected!");
	user = getCookie("email");
	defaultSetting()
	hide();
  	$('#submitBtn').click(addTask);
}

// Default setting
function defaultSetting() {
	var today = new Date();
	var day = today.getDate();
	var month = today.getMonth()+1; //January is 0!
	var year = today.getFullYear();
	var hour = today.getHours();
	var minute = today.getMinutes();
	if (hour<10) {
		hour='0'+hour;
	}
	if (minute<10) {
		minute='0'+minute;
	}
	var time = hour + ":" + minute;
	if(day<10) {
	    day='0'+day;
	} 
	if(month<10) {
    	month='0'+month;
	} 
	$('#setDateBox').val(year + "-" + month + "-" + day);
	$('#setTimeStart').val(time);
	$('#setTimeEnd').val(time);
	$('#TagList').val("blank");
}

// Hide not checked box
function hide() {
	$('#setTimeCheckBox').hide();
	$('.setLocationCheckBox').hide();
	$('.dateRepeatChecked').hide();
	$('#TagList').hide();
	$('#otherTag').hide();
	$('#setDate').show();
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
		$('#TagList')[this.checked ? "show" : "hide"]();
  	});
  	$('#TagList').change(function() {
  		if ($('#TagList').val() == 'other') {
  			$('#otherTag').show();
  		}
  		else {
  			$('#otherTag').hide();
  		}
  	});
  	$.get("/getTag",setTag);
}

// Display all tags
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

// Add task to db
function addTask() {
	var name = $('#taskName').val();
	if (name == "") {
		$('#addError').html("<p style='color:red'>Please enter a name for the Task.</p>");
		return -1;
	}
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
	// Add new tag to db
	var newTag = $('#otherTag').val();
	var tag = $('#TagList').val();
	if ($('#TagList').val() == 'other' && newTag != "") {
		$.post("/setTag", {user: user, tag: newTag}, function(){});
		tag = newTag;
	}
	var task = {
      "name": name,
      "priority": $('#setPriority').val(),
      "location": $('#setLocationBlank').val(),
      "duration": duration,
      "start-time": stime,
      "end-time": etime,
      "tag": tag,
      "date": date,
      "is_repeat": is_repeat,
      "repeat": repeat
    };
    $.post("/createTask", {user: user, task: task}, done);
}

// Go back to homepage
function done(result) {
	window.location = "/";
}





// Didn't use below



function callback(result){
	var user = result[getCookie("email")];
	console.log(user);
	var taskJson = {
		"name": $('#taskName').val(),
		"priority": $('#prioritySelect').val(),
		"location": $('.setLocationCheckBox').val(),
		"duration": $('#hour').val()+":"+$('#minute').val(),
		"start-time": $('#setTimeStart').val(),
		"end-time": $('#setTimeEnd').val(),
		"tag": $('.setTagList').val(),
		"date": "",
		"is_repeat": 0,
		"repeat": []
	};
	
	if($('.repeated').prop('checked')){
		taskJson.is_repeat = 1;
		taskJson.date = "Repetitive Task";
		console.log("repeate checked");
		if($('#repeatedMonday').prop('checked')){
			taskJson.repeat.push(1);
		}
		if($('#repeatedTuesday').prop('checked')){
			taskJson.repeat.push(2);
		}
		if($('#repeatedWednesday').prop('checked')){
			taskJson.repeat.push(3);
		}
		if($('#repeatedThursday').prop('checked')){
			taskJson.repeat.push(4);
		}
		if($('#repeatedFriday').prop('checked')){
			taskJson.repeat.push(5);
		}
		if($('#repeatedSaturday').prop('checked')){
			taskJson.repeat.push(6);
		}
		if($('#repeatedSunday').prop('checked')){
			taskJson.repeat.push(7);
		}
	}
	else{
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();

		if(dd<10) {
			dd='0'+dd
		} 

		if(mm<10) {
			mm='0'+mm
		} 

		today = mm+'/'+dd+'/'+yyyy;
		taskJson.date = "One Time Task: " + today;
	}
	user.push(taskJson);
	console.log(user);
}

function submit(){
	
	$.get('/getTask', callback);
	
}