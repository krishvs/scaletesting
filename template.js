<html>
<head>
	<script type="text/javascript" src="/jquery.js" ></script>
	<script type="text/javascript" src="/faye.js" ></script>
</head>
<body>
	<h1>Faye stress testing client</h1>
	<div class="ticket-notifications" id="agent_collision_show">
		<div class="view-flip" rel="notice-popover"  id="agents_viewing" data-object="viewing" data-placement="right" title="Currently viewing">
		  <a href="#">
		    <div class="flip-front"></div>
		    <div class="flip-back">0</div>
		  </a>
		</div>

		<div class="reply-flip" rel="notice-popover" id="agents_replying" data-object="replying" data-placement="right" title="Currently replying">
		  <a href="#">
		    <div class="flip-front"></div>
		    <div class="flip-back">0</div>
		  </a>
		</div>
	</div>
	<script type="text/javascript">
	  jQuery(document).ready(function() {
	    var data = {
	      current_user_id : "<%= current_user_id %>",
	      faye_host : "<%= faye_host %>",
	      client_opts : {
	        retry: 10,
	        timeout: 120
	      },
	      faye_server : "<%= faye_server %>",
	      faye_auth_params : "<%= faye_auth_params %>",
	      current_user : "<%= current_user_name %>", 
	      agent_names : <%= raw current_account.agent_names_from_cache.to_json %>
	    };
	    channels = {};
		data['agent_collision_show'] = {
			ticket_path : "/lvh.me/collision/131/",
			ticket_id : "<%= ticket_id %>",
			ticket_reply_channel : "<%= ticket_reply_channel %>",
			ticket_channel : "<%= ticket_channel %>"
		}
		channels["<%= ticket_channel %>"] = window.AgentCollisionShow.ticketChannelCallback;
		channels["<%= ticket_view_channel %>"] = window.AgentCollisionShow.viewChannelCallback;
	    window.channels = channels;
	    window.FreshdeskNode.data(data).addChannels(channels).init();
	  });
	</script>
</body>
</html>