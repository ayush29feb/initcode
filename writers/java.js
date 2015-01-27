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

	// Sets the SuperClass
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
			// Methods
			curLine = curLine.substr(1);
			if(curLine.startsWith('--')) {
				curLine = curLine.substr(2);
				var method = {
					name: curLine.substr(0, curLine.indexOf(' ')).s,
					type: 'void',
					access: 'public',
					param: 'int x'
				}
				code.methods.push(method);
			} 
			// Fields
			else if (curLine.startsWith('-')) {
				curLine = curLine.substr(1);
				var field = {
					name: curLine.substr(0, curLine.indexOf(' ')).s,
					type: 'int',
					access:'private'
				}
				code.fields.push(field);
			} 
			// Subclass
			else {
				var subData = '';
				while(i < lines.length){
					curLine = str(lines[i] + ' ');
					subData += curLine.substr(1).s + '\n';
					i++;
				}
				subData = subData.substring(0, subData.length - 1);
				var oneSubClassArr = getClassBlocks(subData);
				for(var j = 0; j < oneSubClassArr.length; j++) {
					readClass(oneSubClassArr[j], files, code.className);
				}
			}
		}
	}

	// Push it to the files
	files.push(code);
}

var writeClass = function(codeObject, dir) {
	// Create Buffer
	var fileData = '';
	
	// Class Defination
	fileData += snippents.classDef(codeObject.className, codeObject.superClass) + "\n\n";

	// Fields Defination
	for(var i = 0; i < codeObject.fields.length; i++){
		fileData += snippents.field(codeObject.fields[i]);
	}
	fileData += '\n';

	//Methods defs
	for(var i = 0; i < codeObject.methods.length; i++){
		fileData += snippents.method(codeObject.methods[i]);
	}
	fileData += '\n';

	fileData += '}';
	// Create the file
	fs.writeFile(dir + '/' + codeObject.className + '.java', fileData, function(err) {
	    if(err) { console.log(err); } 
	    else { console.log("Created " + dir + '/' + codeObject.className + '.java'); }
	});
}

var snippents = {
	classDef: function(className, superClass) {
		var result = 'public class ' + className;
		if(superClass) {
			result += ' extends ' + superClass; 
		}
		result += ' {';
		return result;
	},

	field: function(field) {
		var result = '\t' + field.access + ' ' + field.type + ' ' + field.name + ';\n';
		return result;
	},

	method: function(method) {
		var result = '\t' + method.access + ' ' + method.type + ' ' + method.name + '(' + method.param + ') {\n\n\t}\n';
		return result;
	}
}

// divides the class strings
var getClassBlocks = function(data) {
	result = [];
	// array of the lienes of the data
	dataArr = str(data).lines();
	
	// loop thorugh the data to creates the results
	var block = '';
	for(var i = 0; i < dataArr.length; i++){
		// Block is one of the Code that we will push in result
		var curLine = str(dataArr[i]);
		if(curLine.startsWith('\t')) {
			block += curLine.s + '\n';
		} else {
			result.push(block.substring(0, block.length - 1));
			block = curLine.s + '\n';
		}
	}
	result.push(block.substring(0, block.length - 1));
	result = result.slice(1);
	return result;
}

module.exports = {
	data: null,
	files: [],
	read: function(data) {
		var oneClassArr = getClassBlocks(data);
		for(var i = 0; i < oneClassArr.length; i++) {
			readClass(oneClassArr[i], this.files);
		}
	},
	write: function(dir) {
		for(var i = 0; i < this.files.length; i++){
			writeClass(this.files[i], dir);
		}
	}
}