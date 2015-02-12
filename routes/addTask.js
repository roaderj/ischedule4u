var data = require('../Data/tasks.json')

exports.view = function(req, res){
  res.render('addTask');

};

exports.addTask = function(req, res)
{
  var name = req.param('taskName');
  var newTask =
  {
    "name": name,
    "priority": "",
    "location": "",
    "duration": "",
    "start-time": "",
    "end-time": "",
    "tag": "",
    "date":"",
    "repeat": ""
  }
  console.log(newTask);
  data["tasks"].push(newTask);
};
