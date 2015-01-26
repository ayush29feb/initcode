var fs = require('fs'),
	str = require('string');

module.exports = {
	data: null,
	files: [],
	read: function(data) {
		var lines = str(data).lines();
		console.log(lines);
	},
	write: function(dir) {

	}
}