
/*
 * GET home page.
 */

exports.view = function(req, res){
  res.render('index');
};

exports.altView = function(req, res){
  res.render('indexAlt');
};