var fs = require('fs');

exports.load = function(file, callback) {
	fs.readFile(file, 'utf8', function(err, data){
		if (err) { return console.log(err); }
		callback(data);
	})
};

exports.writer = {
	java: require('./java.js')
};