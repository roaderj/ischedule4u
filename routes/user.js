var users = require('../Data/user.json');

// Check login info
exports.loginCheck = function(req, res) {
	// email
	var email = req.body.email;
	// password
	var password = req.body.password;
	// Check email and password
	var checkRes = check(email,password);
	// Return result
	res.json(checkRes);
}

// Check signup info
exports.signupCheck = function(req, res) {
	// email
	var email = req.body.email;
	// password
	var password = req.body.password;
	// Check if the email has been used
	var checkRes = exist(email,password);
	// Return result
	res.json(checkRes);
}

// Check if the email has been used
// If not, create this user on to the database
function exist(email,password) {
	// Check all users
	for (var i=0; i<users.length;i++) {
		var user = users[i];
		// Email has been used
		if (email == user["email"]) {
			return false;
		}
	}
	// Email has not been used, create this user
	create(email,password);
	return true;
}

// Create user on to the database
function create(email,password) {
	// New user info
	var newUser = {"email":email,"password":password};
	// Push to the database
	users.push(newUser);
	// Write to the disk
	var fs = require('fs');
	var outputFilename = 'Data/user.json';
	fs.writeFile(outputFilename,JSON.stringify(users,null,4),function(err) {
		if (err) {
			console.log(err);
		}
	});
}

// Check if the user info is correct
function check(email,password) {
	// Check all user
	for (var i=0; i<users.length;i++) {
		var user = users[i];
		// The user email found
		if (email == user["email"]) {
			// Password match
			if (password == user["password"]) {
				return true;
			}
			// Password not match
			else return false;
		}
	}
	// No user found
	return false;
}
