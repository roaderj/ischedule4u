var tasks = require('../Data/tasks.json');
var models = require('../models');

// Get all task
exports.getTask = function(req, res) {
	var user = req.body.user;
	console.log(user);
	models.Task
      .find({"user":user})
      .exec(afterQuery);

    function afterQuery(err, tasks) {
    	console.log(tasks);
    	if(err) console.log(err);
    	res.json(tasks);
  	}
}


exports.getTag = function(req, res) {
	/*var info = tasks['setting'];
	// Return all tags
	res.json(info);*/
	res.send('ok');
}

exports.setTag = function(req, res) {
	/*var user = req.body.user;
	var tag = req.body.tag;
	if (user in tasks['setting']) {
		tasks['setting'][user].push(tag);
	}
	else {
		tasks['setting'][user] = [];
		tasks['setting'][user].push(tag);
	}
	// Return all tags
	res.json("success");*/
	res.send('ok');
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
	var newTask = new models.Task({
		"user": user,
		"taskName": task['name'],
		"duration": task['duration'],
		"date": task['date'],
		"location": task['location'],
		"start-time": task['start-time'],
    	"end-time": task['end-time'],
    	"tag": task['tag'],
    	"is_repeat": task['is_repeat'],
    	"repeat": task['repeat']
	});
	newPost.save(function(err){
		if (err) { 
    	  console.log(err); 
    	}
    	res.send("OK");
	});
}

exports.deleteTask = function(req, res) {
	var taskID = req.body.id;
	models.Task
      .find({"_id":taskID})
      .remove()
      .exec(function(err){
        if (err) { 
          console.log(err); 
        }
        res.send("OK");
      });
}