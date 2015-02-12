var tasks = require('../Data/tasks.json');

exports.getTask = function(req, res) {
	// get a random palette from the top ones
	var info = tasks;
	res.json(info);
}