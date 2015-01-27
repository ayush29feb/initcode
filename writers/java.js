var fs = require('fs'),
	str = require('string');

var readClass = function(data, files, superClass) {
	var code = {
		className: null,
		isMain: false,
		superClass: null,
		fields: [],
		methods: []
	}
	if(superClass){
		code.superClass = superClass;
	}
	// Do Stuff to fill the code
	var lines = str(data).lines();
	for(var i = 0; i < lines.length; i++) {
		var curLine = str(lines[i] + ' ');
		// Push The Class Name
		// later add the option funcitonality
		if(!curLine.startsWith('\t')){
			code.className = curLine.substr(0, curLine.indexOf(' ')).s;
			code.isMain = curLine.contains(' -m ');
		} else {
			curLine = curLine.substr(1);
			if(curLine.startsWith('--')) {
				curLine = curLine.substr(1);
				var method = {
					name: curLine.substr(0, curLine.indexOf(' ')).s
				}
				code.methods.push(method);
			} else if (curLine.startsWith('-')) {
				curLine = curLine.substr(2);
				var field = {
					name: curLine.substr(0, curLine.indexOf(' ')).s
				}
				code.fields.push(field);
			} else {
				readClass(curLine.s, files, code.className);
			}
		}
	}

	// Push it to the files
	files.push(code);
}

var writeClass = function(codeObject, dir) {
	// Create Buffer


	// Create the file
}

module.exports = {
	data: null,
	files: [],
	read: function(data) {
		readClass(data, this.files);
		console.log(this.files);
	},
	write: function(dir) {

	}
}