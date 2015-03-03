var data = require('../Data/tasks.json');

exports.view = function(req, res){
  res.render('addTask');
};

exports.altView = function(req, res){
  res.render('addTaskAlt');
};
