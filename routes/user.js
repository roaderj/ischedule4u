var users = require('../Data/user.json');
var models = require('../models');

// Check login info
exports.loginCheck = function(req, res) {
	// email
	var email = req.body.email;
	// password
	var password = req.body.password;
	// Check email and password
	//var checkRes = check(email,password);
	models.User
		.find({"email":email})
		.exec(afterQuery);
	// Return result
	function afterQuery(err, user) {
    	//console.log(user);
    	var checkRes = false;
    	if (err) 
        console.log(err);
    	if (user.length < 1)
    		checkRes = false;
    	else {
    		if (user[0]['password'] == password)
				checkRes = true;
	    	else checkRes = false;
    	}
    	res.json(checkRes);
  	}
}

// Check signup info
exports.signupCheck = function(req, res) {
	// email
	var email = req.body.email;
	// password
	var password = req.body.password;
	// Check if the email has been used
	models.User
		.find({"email":email})
		.exec(afterQuery);
	// Return result
	function afterQuery(err, user) {
    	//console.log(user);
    	var checkRes = false;
    	if (err) 
        console.log(err);
    	if (user.length > 0)
    		checkRes = false;
    	else {
    		create(email,password);
    		checkRes = true;
    	}
    	res.json(checkRes);
  	}
	// Return result
	//res.json(checkRes);
}

// Create user on to the database
function create(email,password) {
	// New user info
	var newUser = new models.User({
    	"email":email,
    	"password":password
  	});
  	newUser.save(function(err){
    if (err) { 
      console.log(err); 
    }
  });
}

