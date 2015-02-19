
var Mongoose = require('mongoose');


var TaskSchema = new Mongoose.Schema({
	"user": String,
	"name": String,
	"duration": String,
	"type": String,
	"priority": String,
	"date": String,
	"location": String,
	"start-time": String,
    "end-time": String,
    "is_repeat": { type: Boolean, default: false },
    "repeat": [Number],
    "dateModified": { type: Date, defualt: Date.now}
  // fields are defined here
});

var UserSchema = new Mongoose.Schema({
	"email": String,
	"password": String
  // fields are defined here
});

exports.Task = Mongoose.model('Task', TaskSchema);
exports.User = Mongoose.model('User', UserSchema);


