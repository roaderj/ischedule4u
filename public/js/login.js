'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

function initializePage() {
	// Log out when user get to this page
	document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
	$('#submitBtn').click(loginSubmit);
}

var email = "#"
var checkbox = false;

// Submit login info
function loginSubmit(e) {
	e.preventDefault();
	// email
	email = document.getElementById("email").value;
	// password
	var password = document.getElementById("password").value;
	// if it is keep logged in
	checkbox = document.getElementById("remember-me").checked;
	// post the login info
	$.post("/user_login", {email: email, password: password}, check);
}

// Callback of post the login info
// If true, login; if false, the account is not matched
function check(result) {
	// Login success
	if (result) {
		var cookie_string = "email=" + email;
		// Cookie will be remain for a year
		if (checkbox) {
			var expiration_date = new Date();
			expiration_date.setFullYear(expiration_date.getFullYear() + 1);
			cookie_string += "; expires=" + expiration_date.toGMTString();
		}
		document.cookie = cookie_string;
		// Go to homepage
		window.location = "/";
	}
	// Login fail
	else {
		// Display error message
		var err = "<p style='color:red;'>The email or the password is incorrect.</p>";
		$('.login-error').html(err);
	}
}