var tasks = require('../Data/tasks.json');
var models = require('../models');

// Get all task
exports.getTask = function(req, res) {
	var user = req.body.user;
	var taskID = req.body.taskID;
	console.log(taskID);
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
    	console.log(tasks);
    	if(err) console.log(err);
    	res.json(tasks);
  	}
}

/*
exports.getTag = function(req, res) {
	var info = tasks['setting'];
	// Return all tags
	res.json(info);
	res.send('ok');
}*/
/*
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
	res.send('ok');
}*/

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
      	/*.find({"user":user,"_id":taskID})
      	.remove()
      	.exec(function(err){
        	if (err) { 
          		console.log(err); 
        	}
        	var newTask = new models.Task(task);
			newTask.save(function(err){
				if (err) { 
    	  			console.log(err); 
    			}
    			res.json("success");
			});
      	});
	*/
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