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
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;
	var confirmPass = document.getElementById("confirmPass").value;
	console.log(email);
	console.log(password);
	console.log(confirmPass);
	if (password != confirmPass) {
		var err = "<p style='color:red;'>The email or the password is incorrect.</p>";
		$('.signup-error').html(err);
	}
	else {
		$.post("/user_signup", {email: email, password: password}, check);
	}
}

function check(result) {
	console.log(result);
	if (!result) {
		var err = "<p style='color:red;'>The email has already been used.</p>";
		$('.signup-error').html(err);
	}
	else {
		window.location="/login";
	}
}