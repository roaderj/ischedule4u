'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

function initializePage() {
	$('#submitBtn').click(signupSubmit);
}

// Submit signup info
function signupSubmit(e) {
	e.preventDefault();
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
	// email
	var email = document.getElementById("email").value;
	// password
	var password = document.getElementById("password").value;
	// confirm password
	var confirmPass = document.getElementById("confirmPass").value;
	// Email is empty
	if (email == "") {
		var err = "<p style='color:red;'>Please enter an email address.</p>";
		$('.signup-error').html(err);
	} 
	// Password is empty
	else if (!(email.match(mailformat))) {
		var err = "<p style='color:red;'>You have entered an invalid email address.</p>";
		$('.signup-error').html(err);
	}
	else if (password == "") {
		var err = "<p style='color:red;'>Please enter a password.</p>";
		$('.signup-error').html(err);
	} 
	// Password and confirm password are not matched
	else if (password != confirmPass) {
		var err = "<p style='color:red;'>Confirm password is different from password.</p>";
		$('.signup-error').html(err);
	}
	// post the signup info
	else {
		$.post("/user_signup", {email: email, password: password}, check);
	}
}

// Callback of post the signup info
// If true, go to login page; if false, the account is existed
function check(result) {
	// The email has been used
	if (!result) {
		var err = "<p style='color:red;'>The email has already been used.</p>";
		$('.signup-error').html(err);
	}
	// Signup success
	else {
		alert("Success!");
		// Go back to login page
		window.location="/login";
	}
}