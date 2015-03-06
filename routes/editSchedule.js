
var data = require('../Data/tasks.json');

exports.view = function(req, res){
  res.render('EditSchedule', data);
};
