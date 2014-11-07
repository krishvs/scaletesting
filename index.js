var system = require('system');
var args = [];
var pages = [];
var webpage = require('webpage');
var tabs = 0;
var iterations = 0;
var throttle = 30;
var original_tabs = 0;
var final_tabs = 0;

if (system.args.length === 1) {
	final_tabs = original_tabs = tabs = 1;
    console.log('Try to pass some args when invoking this script!');
}else {
    final_tabs = original_tabs = tabs = system.args[1];
    console.log('The vlaue of tabls is '+tabs);
}

url = 'http://scale-testing-autorefresh-716963887.us-east-1.elb.amazonaws.com/';
args.push(url);

function handle_page(url,count){
	for(var i=0;i<count;i++){
		var current_page = webpage.create();
		current_page.open(url,function(){
			console.log('opening the tab '+url);
			setTimeout(function(){
				original_tabs++;
				console.log('closing the page ',current_page);
				// if(current_page != null){
				// 	current_page.close();
				// }
				if(original_tabs == final_tabs){
					phantom.exit(0);
				}
			},50000);
		});
	}
}

var throttle_interval = setInterval(next_page, 1000);

function next_page(){
	tabs = tabs - throttle;
	if(tabs/throttle > 0){
		handle_page(url,throttle);
	}
	else{
		console.log('clearing the page');
		clearInterval(throttle_interval);  
	}
}