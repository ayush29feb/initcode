#!/usr/bin/env node

var fs = require('fs'),
	readline = require('readline'),
	program = require('commander'),
	repl = require('repl');

var writers = require('./writers');

program
    .version('0.0.1')
    .usage('<language> <File> <FolderName>')
    .parse(process.argv);


if(program.args.length != 3) {
	program.help();
} else {
	writers.load(program.args[1], function(data){
		var writer = writers.writer[program.args[0]];
		writer.read(data);
	})
}


// Command Line Input
// var rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });