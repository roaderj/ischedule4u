var tasks = require('../Data/tasks.json');

// Get all task
exports.getTask = function(req, res) {
	var info = tasks;
	// Return all tasks
	res.json(info);
}

exports.getTag = function(req, res) {
	var info = tasks['setting'];
	// Return all tags
	res.json(info);
}

exports.setTag = function(req, res) {
	var user = req.body.user;
	var tag = req.body.tag;
	if (user in tasks['setting']) {
		tasks['setting'][user].push(tag);
	}
	else {
		tasks['setting'][user] = [];
		tasks['setting'][user].push(tag);
	}
	// Return all tags
	res.json("success");
}

exports.updateTask = function(req, res) {
	var user = req.body.user;
	var taskID = req.body.id;
	var task = req.body.task;
	tasks[user][taskID] = task;
	res.json("success");
}

exports.createTask = function(req, res) {
	var user = req.body.user;
	var task = req.body.task;
	if (!(user in tasks)) {
		tasks[user] = [task];
	}
	else {
		tasks[user].push(task);
	}
	res.json("success");
}

exports.deleteTask = function(req, res) {
	var user = req.body.user;
	var taskID = req.body.id;
	tasks[user].splice(taskID,1);
	console.log(tasks);
	res.json("success");
}