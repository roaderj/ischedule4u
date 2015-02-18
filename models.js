
var Mongoose = require('mongoose');


var TaskSchema = new Mongoose.Schema({
	"user": String,
	"taskName": String,
	"duration": String,
	"date": String,
	"location": String,
	"start-time": String,
    "end-time": String,
    "tag": String,
    "is_repeat": { type: Boolean, default: false },
    "repeat": [Number]
  // fields are defined here
});

exports.Task = Mongoose.model('Task', TaskSchema);


