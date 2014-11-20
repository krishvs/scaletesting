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
app.get('/', function(req,res){
	console.log('I have req');
	var faye_auth_params = {
      "userId"  : req.param('current_user_id') ? req.param('current_user_id') : 1,
      "name" : req.param('current_user') ? req.param('current_user') : "Tobi" ,
      "accountId"  : req.param('current_account_id') ? req.param('current_account_id') : 1,
      "domainName"  : req.param('current_account_full_domain') ? req.param('current_account_full_domain') : "lvh.me" ,
      "auth"  : req.param('current_user') ? req.param('current_user') : "Tobi",
      "secure"  : req.param('current_account_ssl_enabled') ? req.param('current_account_ssl_enabled') : false 
    }
	res.render('index', { 
		faye_auth_params: JSON.stringify(faye_auth_params),
		current_user : req.param('current_user'),
		current_user_id : req.param('current_user_id') ? req.param('current_user_id') : 1,
		agent_names : req.param('agent_names') ? req.param('agent_names') : "names",
		ticket_path: req.param('ticket_path') ? req.param('ticket_path') : "http://lvh.me:3000/helpdesk/tickets/131",
		ticket_id: req.param('ticket_id') ? req.param('ticket_id') : 1,
		ticket_reply_channel: req.param('ticket_reply_channel') ? req.param('ticket_reply_channel') : "/lvh.me/collision/131/reply",
		ticket_channel: req.param('ticket_channel') ? req.param('ticket_channel') : "/lvh.me/collision/131",
		base_channel: req.param('base_channel') ? req.param('base_channel') : "/lvh.me/collision/131",
		view_channel: req.param('view_channel') ? req.param('view_channel') : "/lvh.me/collision/131/view",
		agent_collision_ticket_channel: req.param('agent_collision_ticket_channel') ? req.param('agent_collision_ticket_channel') : "/lvh.me/collision/131"
	});
	// res.render('socket',{});
});

app.listen(80);
console.log('listening on port 80');
console.log('try:');
console.log('  GET /');
