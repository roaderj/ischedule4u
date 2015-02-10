var users = require('../Data/user.json');

exports.loginCheck = function(req, res) {
	// get a random palette from the top ones
	var email = req.body.email;
	var password = req.body.password;
	//console.log(email);
	var checkRes = check(email,password);
	//console.log(checkRes);
	res.json(checkRes);
}

function check(email,password) {
	//console.log(users.length);
	for (var i=0; i<users.length;i++) {
		var user = users[i];
		//console.log(user["email"]);
		if (email == user["email"]) {
			if (password == user["password"]) {
				return true;
			}
			else return false;
		}
	}
	return false;
}