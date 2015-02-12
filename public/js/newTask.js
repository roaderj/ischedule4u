 'use strict';
 $(document).ready(function() {
	initializePage();
})

function initializePage() {
	console.log("Javascript connected!");
	$('.setTimeCheckBox').hide();
	$('.setLocationCheckBox').hide();
	$('.dateRepeatChecked').hide();
	$('.setLocationList').hide();
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
  $('#submitBtn').click(submit);
}

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