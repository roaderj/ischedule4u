
/**
 * Module dependencies.
 */

var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var index = require('./routes/index');
var login = require('./routes/login');
var signup = require('./routes/signup');
var editSchedule = require('./routes/editSchedule');
var addTask = require('./routes/addTask');
var editTask = require('./routes/editTask');
var blank = require('./routes/blank');
var userinfo = require('./routes/user');
var getTask = require('./routes/getTask');

//var project = require('./routes/project');
// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
app.get('/login', login.view);
app.get('/signup', signup.view);
app.get('/addTask', addTask.view);
app.get('/editTask/:id', editTask.view);
app.get('/editSchedule', editSchedule.view);
app.get('/blank', blank.view);
app.get('/getTask', getTask.getTask);
app.post('/user_login', userinfo.loginCheck);
app.post('/user_signup', userinfo.signupCheck);
app.post('/updateTask', getTask.updateTask);
app.post('/deleteTask', getTask.deleteTask);
//app.get('/project/:name', project.viewProject);
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
