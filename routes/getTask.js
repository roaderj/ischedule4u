var tasks = require('../Data/tasks.json');
var models = require('../models');

// Get all task
exports.getTask = function(req, res) {
	var user = req.body.user;
	var taskID = req.body.taskID;
	//console.log(taskID);
	if (taskID == "") {
	//console.log(user);
		models.Task
     		.find({"user":user})
     		.sort('-dateModified')
      	.exec(afterQuery);
    } else {
    	models.Task
    		.find({"user":user, "_id":taskID})
    		.exec(afterQuery);
    }

    function afterQuery(err, tasks) {
    	//console.log(tasks);
    	if(err) 
        console.log(err);
    	res.json(tasks);
  	}
}

exports.updateTask = function(req, res) {
	var user = req.body.user;
	var taskID = req.body.taskID;
	var task = req.body.task;
	models.Task.update({_id:taskID},task,function(err){
        	if (err) { 
          		console.log(err); 
          	}
          	res.json("success");
        });
}

exports.createTask = function(req, res) {
	var task = req.body.task;
	var newTask = new models.Task(task);
	newTask.save(function(err){
		if (err) { 
    	  console.log(err); 
    	}
    	res.json("success");
	});
}

exports.deleteTask = function(req, res) {
	var user = req.body.user;
	var taskID = req.body.taskID;
	models.Task
      .find({"user":user,"_id":taskID})
      .remove()
      .exec(function(err){
        if (err) { 
          console.log(err); 
        }
        res.json("success");
      });
}