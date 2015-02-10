'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

function initializePage() {
	$('#submitBtn').click(signupSubmit);
}

//var email = "#";
//var password = "#";

function signupSubmit(e) {
	e.preventDefault();
	var username = document.getElementById("username").value;
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;
	console.log(username);
	console.log(email);
	console.log(password);
	var info = {'email': email, 'password': password};
	console.log(password);
	//var check = check(email,password);
	//console.log(check);
	var urllink = "/user?username=" + username;
	$.get(urllink, check);
}

function check(result) {
	console.log(result);
	var check = false;
	for (var i=0; i<result.length;i++) {
		var user = result[i];
		var useremail = user["email"];
		if (email = useremail) {
			check = true;
			if (password == user["password"]) {
				console.log("true");
			}
			else {
				console.log("false");
			}
		}
	}
	console.log("false");
}