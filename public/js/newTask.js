'use strict';

 $(document).ready(function() {
  initializePage();
})

var user = "";

function initializePage() {
  user = getCookie("email");
  defaultSetting()
  hide();
  $('#setDateBox').datepicker({
      orientation: 'auto left',
        format: 'yyyy-mm-dd'
      });
  $('.createBtn').click(addTask); 
  $('#cancelBtn').click(goBack);
}

function goBack(e) {
    e.preventDefault();
    window.history.go(-1);
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
  $('#TypeList').val("Other");
  $('#setDateBox').val(year + "-" + month + "-" + day);
  $('#setTimeStart').val(time);
  $('#setTimeEnd').val(time);

}

// Hide not checked box
function hide() {
  $('#setTimeCheckBox').hide();
  $('.setLocationCheckBox').hide();
  $('.dateRepeatChecked').hide();
  $('#Advanced').hide();
  $('#setDate').show();

    $('#setTimeCheck').click(function()
    {
      $('#setTimeCheckBox')[this.checked ? "show" : "hide"]();
    });

    $("#AdvancedButton").click(function()
    {
      $("#Advanced").toggle();
    });

    $('#setLocation').click(function()
    {
      $('.setLocationCheckBox')[this.checked ? "show" : "hide"]();
    });

    $('#setRepeat').click(function()
    {
      $('.dateRepeatChecked')[this.checked ? "show" : "hide"]();
      $('#setDate')[this.checked ? "hide" : "show"]();
    });
}

// Add task to db
function addTask(e) {
  e.preventDefault();
  var version = getCookie("version");
  var name = $('#taskName').val();
  if (name == "") {
    $('#addError').html("<p style='color:red'>Please enter a name for the Task.</p>");
    return -1;
  }
  var duration = $('#durationHour').val() + ":" + $('#durationMinutes').val();
  var type = $('#TypeList').val();
  var repeat = [];
  if (document.getElementById("setTimeCheck").checked) {
    var stime = $('#setTimeStart').val();
    var etime = $('#setTimeEnd').val();
  }
  else {
    var today = new Date();
    var shour = today.getHours();
    var sminute = today.getMinutes();
    var ehour = shour + parseInt($('#durationHour').val());
    var eminute = sminute + parseInt($('#durationMinutes').val());
    if (shour<10) {
      shour='0'+shour;
    }
    if (sminute<10) {
      sminute='0'+sminute;
    }
    if (eminute>60) {
      eminute=eminute-60;
      ehour+=1;
    }
    if (ehour>24) {
      ehour=24;
    }
    if (ehour<10) {
      ehour='0'+ehour;
    }
    if (eminute<10) {
      eminute='0'+eminute;
    }
    var stime = shour + ":" + sminute;
    var etime = ehour + ":" + eminute;

  }
  var date = $('#setDateBox').val();
  if (document.getElementById("setRepeat").checked) {
    var is_repeat = true;
    for (var i=1;i<8;i++) {
      if ((document.getElementById("repeated0").checked)||(document.getElementById("repeated"+i).checked)) {
        repeat.push(i);
      }
    }
  }
  else {
    var is_repeat = false;
  }
  var task = {
      "user": user,
      "name": name,
      "priority": $('#setPriority').val(),
      "location": $('#setLocationBlank').val(),
      "type": type,
      "duration": duration,
      "start-time": stime,
      "end-time": etime,
      "date": date,
      "is_repeat": is_repeat,
      "repeat": repeat
    };
  if(!(document.getElementById("setTimeCheck").checked)){
	var blank = "";
	var callbackFunction = function(data) {
		var time = findTime(data, task);
		task['start-time'] = time['start-time'];
		task['end-time'] = time['end-time'];
		$.post("/createTask", {task: task}, done);
	};
	//wait until findTime finish
	$.post("/getTask", {user: user, taskID: blank}, callbackFunction);
  }
  else{
	$.post("/createTask", {task: task}, done);
  }
}

// Go back to homepage
function done(result) {
  window.location = "/";
}

/* finds the intersection of
 * two arrays in a simple fashion.
 *
 * PARAMS
 *  a - first array, must already be sorted
 *  b - second array, must already be sorted
 *
 * NOTES
 *
 *  Should have O(n) operations, where n is
 *    n = MIN(a.length(), b.length())
 * from: http://stackoverflow.com/questions/1885557/simplest-code-for-array-intersection-in-javascript
 */
function intersect(a, b)
{
  var ai=0, bi=0;

  while( ai < a.length && bi < b.length )
  {
     if      (a[ai] < b[bi] ){ ai++; }
     else if (a[ai] > b[bi] ){ bi++; }
     else /* they're equal */
     {
		return true;
     }
  }
  return false;
}

//data => all the tasks binded to the account in list
function findTime(data, currentTask){

	//TODO: check previous task before adding

	var sameDate = [];
	
	var qualified = [];
	
	var today = new Date();
	var tDate = new Date(currentTask['date']);
	var day = (tDate).getDay();
	//console.log(day);
	var time = "";
	var hours = today.getHours();
	var minutes = today.getMinutes();
	if(currentTask['is_repeat']==0){
		if(today.getDate() == parseInt(currentTask['date'].substring(currentTask['date'].length -2,currentTask['date'].length),10)){
			today = new Date();
		}
		else{
			today = new Date(currentTask['date']);
			day = today.getDay();
			hours = 8;
			minutes = 0;
			//starts from 00:00 for other dates
		}
	}
		
	
	if (hours<10) {
      hours='0'+hours;
    }
    if (minutes<10) {
      minutes='0'+minutes;
    }
	time = hours +":" +minutes;
	day++;
	if(day == 7){
		day = 1;
	}
	var i = 0;

	if(currentTask['is_repeat']==1){
		time = "08:00"; // if repeating start time as 8 am
		//collect schedule within those days
		for(i = 0; i < data.length; i++){

			if((data[i])['is_repeat'] == 1){
				if(intersect(currentTask['repeat'],(data[i])['repeat'])){
					qualified.push(data[i]);
					sameDate.push(data[i]);
				}
			}
			else{
				var tempDate = new Date((data[i])['date']);
				var tempDay = tempDate.getDay();
				day++;
				if(tempDay == 7){
					tempDay = 1;
				}
				if(currentTask['repeat'].indexOf(tempDay) != -1){
					qualified.push(data[i]);
					sameDate.push(data[i])
				}
			}
		}
	}
	else{
		for(i = 0; i < data.length; i++){
			if((data[i])['is_repeat'] == 1){
				if((data[i])['repeat'].indexOf(day) != -1){
					sameDate.push(data[i]);
					if(compare((data[i])['start-time'], time) == 1){
						qualified.push(data[i]);
					}
				}
			}
			else{
				if(currentTask['date'].localeCompare((data[i])['date']) == 0 ){
					sameDate.push(data[i]);
					if(compare((data[i])['start-time'], time) == 1){
						qualified.push(data[i]);
					}
				}
			}
		}
	}
	qualified.sort(function(a, b){ return compare(a['start-time'], b['start-time'])});
	sameDate.sort(function(a, b){ return compare(a['start-time'], b['start-time'])});

	i = 0;
	//console.log(qualified.length);
	//console.log(sameDate.length);
	while(i < qualified.length){
		var nearest = qualified[i];
		//09:03 -
		
		if( compare((diff(nearest['start-time'],time)), currentTask['duration']) == 1){
			if(i > 0){
				if(compare(diff(nearest['start-time'],(qualified[i-1])['end-time']), currentTask['duration']) != 1 ){
					i++; continue;
				}
			}
			var flag = false;
			for(var j = 0; j < sameDate.length; j++){
				if(nearest != (sameDate[j]) && currentTask['is_repeat'] == 0){
					if(compare((sameDate[j])['end-time'], (diff(nearest['start-time'], currentTask['duration']))) == 1){
						//problem occurred
						if(compare((sameDate[j])['start-time'], (diff(nearest['start-time'], currentTask['duration']))) == -1){
							flag = true;
							break;
						}
					}
				}
			}
			if(flag==true){
				i++;
				continue;
			}
			//console.log("you there?");
			//if(today.getDate() == parseInt(currentTask['date'].substring(currentTask['date'].length -2,currentTask['date'].length),10)
				//&& compare(nearest['end-time'], time) != -1){
				//i++;
				//continue;
			//}
			currentTask['start-time'] = diff(nearest['start-time'], currentTask['duration']);
			currentTask['end-time'] = nearest['start-time'];
			var t = {
				"start-time": currentTask['start-time'],
				"end-time": currentTask['end-time']
			};
			return t;
		}
		i++;
	}
	i--;
	//find previous
	//no qualified tasks to hook to
	if(qualified.length == 0){
		for(var j = 0; j < sameDate.length; j++){
			if(compare((sameDate[j])['end-time'], time) == 1 && currentTask['is_repeat'] == 0){
				//problem occurred
				if(j == (sameDate.length - 1)){
					var t = {
						"start-time": (sameDate[j])['end-time'],
						"end-time": addTime((sameDate[j])['end-time'], currentTask['duration'])
					};
					return t;
				}
				else{
					var t = {
						"start-time": (sameDate[j+1])['end-time'],
						"end-time": addTime((sameDate[j+1])['end-time'], currentTask['duration'])
					};
					return t;
				}
			}
		}
		var t = {
			"start-time": time,
			"end-time": addTime(time, currentTask['duration'])
		};
		return t;
	}
	//console.log("this is the last resort dude");
	if(compare((qualified[i])['end-time'], time) != -1){
		var t = {
			"start-time": (qualified[i])['end-time'],
			"end-time": addTime((qualified[i])['end-time'], currentTask['duration'])
		};
	}else{
		var t = {
			"start-time": time,
			"end-time": addTime(time, currentTask['duration'])
		};
	}
	return t;
}
function addTime(str0, str1){
	var h = parseInt(str0.substring(0,2),10) + parseInt(str1.substring(0,2),10);
	var m = parseInt(str0.substring(3,5),10) + parseInt(str1.substring(3,5),10);

    if (m>60) {
      m=m-60;
      h+=1;
    }
	if (m<10) {
      m='0'+m;
    }
    if (h>24) {
	  //TODO: make go over extra day
      h=h-24;
    }
    if (h<10) {
      h='0'+h;
    }
    var t = (h + ":" + m);
    return t;
}
function diff(str0, str1){
	var h = parseInt(str0.substring(0,2),10) - parseInt(str1.substring(0,2),10);
	var m = parseInt(str0.substring(3,5),10) - parseInt(str1.substring(3,5),10);
	if(m < 0){
		m = 60 + m;
		h--;
	}
	if (h<10) {
      h='0'+h;
    }
    if (m<10) {
      m='0'+m;
    }
	var r = h+":"+m;
	return r;
}

function compare(str0, str1){
	if(parseInt(str0.substring(0,2),10) < parseInt(str1.substring(0,2),10)){
		return -1;
	}
	else if(parseInt(str0.substring(0,2),10) > parseInt(str1.substring(0,2),10)){
		return 1;
	}
	else{
		if(parseInt(str0.substring(3,5),10) < parseInt(str1.substring(3,5),10)){
			return -1;
		}
		else if(parseInt(str0.substring(3,5),10) > parseInt(str1.substring(3,5),10)){
			return 1;
		}
		else{
			return 0;
		}
	}
}

// Didn't use below



function callback(result){
  var user = result[getCookie("email")];
  var taskJson = {
    "name": $('#taskName').val(),
    "priority": $('#prioritySelect').val(),
    "location": $('.setLocationCheckBox').val(),
    "duration": $('#hour').val()+":"+$('#minute').val(),
    "start-time": $('#setTimeStart').val(),
    "end-time": $('#setTimeEnd').val(),
    "date": "",
    "is_repeat": 0,
    "repeat": []
  };

  if($('#setRepeat').prop('checked')){
    taskJson.is_repeat = 1;
    taskJson.date = "Repetitive Task";
    if($('#repeat'))
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
}

function submit(){

  $.get('/getTask', callback);

}
