var data = require('../Data/tasks.json')

exports.view = function(req, res){
  res.render('editTask');
};

exports.altView = function(req, res){
  res.render('editTaskAlt');
};