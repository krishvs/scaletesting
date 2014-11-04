/**
 * Module dependencies.
 */

var express = require('express');
var logger = require('morgan');
var app = express();

// log requests
app.use(logger('dev'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use('/static', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/css'));
app.use(express.static(__dirname + '/public/js'));
views_dir = __dirname + '/views';
app.set('views', __dirname + '/views');

var return_data = {"ticket_permission":1,"group_ids":[1]}

app.get('/agents',function(req,res){
	res.json(return_data);
});


app.get('/', function(req,res){
	console.log('I have req');
	var faye_auth_params = {
      userId  : req.param('current_user_id') ? req.param('current_user_id') : 1,
      name : req.param('current_user') ? req.param('current_user') : "Tobi" ,
      accountId  : req.param('current_account_id') ? req.param('current_account_id') : 1,
      domainName  : req.param('current_account_full_domain') ? req.param('current_account_full_domain') : "lvh.me" ,
      auth  : req.param('current_user') ? req.param('current_user') : "Tobi",
      secure  : req.param('current_account_ssl_enabled') ? req.param('current_account_ssl_enabled') : false 
    }
	res.render('refresh', { 
		agent_names : req.param('agent_names') ? req.param('agent_names') : "names",
		faye_auth_params: JSON.stringify(faye_auth_params),
		current_user : req.param('current_user'),
		current_user_id : req.param('current_user_id') ? req.param('current_user_id') : 1,
		auto_refresh_channel: req.param('auto_refresh_channel') ? req.param('auto_refresh_channel') : '/lvh.me/refresh' 
	});
});

app.listen(4000);
console.log('listening on port 4000');
console.log('try:');
console.log('  GET /');
