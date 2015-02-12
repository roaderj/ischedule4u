var tasks = require('../Data/tasks.json');

// Get all task
exports.getTask = function(req, res) {
	var info = tasks;
	// Return all tasks
	res.json(info);
}