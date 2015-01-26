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
	var writer = writers[program.args[0]];
}


// ReadingFile
// fs.readFile(program.args[0], 'utf8', function (err, data) {
//   if (err) {
//     return console.log(err);
//   }
//   console.log(data);
// });

// Command Line Input
// var rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });