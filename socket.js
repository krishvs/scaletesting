    var hashed_params = {
      "previous_clients": []
    }

    var data = {"data":"BtRSYyiiauZLwJV1UpglLyuemUoy7tkRAD9k3v93UrA=\n"};
    var hashed_params = data;
    hashed_params["agent_collision_view"] = "/lvh.me/collision/133/view"
    hashed_params["user_name"] = "Support";
    console.log('I have agent_collision feature');
    agentcollision_reply_params = {
      "reply_channel" : "/lvh.me/collision/133/reply",
      "user_name" : "Support"
    };
    var count = 0;

    if (system.args.length === 1) {
		count = 1;
	    console.log('Try to pass some args when invoking this script!');
	}else {
	    count = system.args[1];
	    console.log('The vlaue of tabls is '+count);
	}
        
    

    var agentcollision = function()
    {
      var node_socket = require('socket.io-client')('http://chrome-1880321364.us-east-1.elb.amazonaws.com/',{'force new connection':true});
      node_socket.on('connect', function(){
        console.log('I have connected');
      });
      node_socket.on('chrome_extension',function(data){
        if(data.action === 'connect'){
          hashed_params['previous_clients'] =[];
          previous_clientIds = [];
          node_socket.emit('chrome_extension_connect',hashed_params);
        }
      });
      node_socket.on('message', function(params){
           console.log('have message here',params);
      });

      node_socket.on('view_event', function(params){
           console.log('have view here',params);
      });
      node_socket.on('reply_event', function(params){
           console.log('have reply here',params);
      });
      node_socket.on('reply_event_stop', function(params){
           console.log('have reply stop here',params);
      });

      node_socket.on('disconnect', function(){
        console.log('I am in disconnect');
      });
    }
    for(var i=0; i < count; i++ ){
    	agentcollision();
	}