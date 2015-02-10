'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

function initializePage() {
	document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
	$('#submitBtn').click(loginSubmit);
}

var email = "#"
var checkbox = false;

function loginSubmit(e) {
	e.preventDefault();
	email = document.getElementById("email").value;
	var password = document.getElementById("password").value;
	checkbox = document.getElementById("remember-me").checked;
	//console.log(email);
	//console.log(password);
	//var check = check(email,password);
	//console.log(check);
	$.post("/user_login", {email: email, password: password}, check);
}

function check(result) {
	//console.log(!result);
	if (result) {
		var cookie_string = "email=" + email;
		//console.log(cookie_string);
		if (checkbox) {
			var expiration_date = new Date();
			expiration_date.setFullYear(expiration_date.getFullYear() + 1);
			cookie_string += "; expires=" + expiration_date.toGMTString();
		}
		document.cookie = cookie_string;
		window.location = "/";
	}
	else {
		var err = "<p style='color:red;'>The email or the password is incorrect.</p>";
		$('.login-error').html(err);
	}
}