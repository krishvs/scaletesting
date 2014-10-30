var scale_count = process.argv[2];
var per_scale = process.argv[3];

for(var i=0;i< scale_count; i++){
	var exec = require('child_process').exec,
	    child;

	child = exec('phantomjs /data/scaletest/current/index.js '+per_scale,
	  function (error, stdout, stderr) {
	    console.log('stdout: ' + stdout);
	    console.log('stderr: ' + stderr);
	    if (error !== null) {
	      console.log('exec error: ' + error);
	    }
	});
}