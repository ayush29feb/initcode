#!/usr/bin/env node

var fs = require('fs'),
	argv = require('optimist').argv,
	program = require('commander'),
	repl = require('repl');

program
    .version('0.0.1')
    .usage('<keywords>')
    .parse(process.argv);

console.log(program.args);

// var json = {
// 	"lang": argv.lang
// };

// fs.writeFile("schema.json", JSON.stringify(json, null, 4), function(err){
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log("Awesome! It works.");
// 	}
// });