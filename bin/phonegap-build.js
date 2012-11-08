#!/usr/bin/env node

/*
 * Module dependencies.
 */

var fs = require('fs');
var path = require('path');
var program = require('commander');

/*
 * Load package.json
 */

var packageJSON = JSON.parse(fs.readFileSync(path.join(__dirname,'..','package.json'), 'utf8'));

/*
 * Version
 */

program.version(packageJSON.version);

/*
 * Command-line help
 */

program
    .command('help')
    .description('display help')
    .action(function(){
        program.help();
    });

/*
 * Parse the command-line arguments
 */

program.parse(process.argv);

if (!program.args.length) {
    program.outputHelp();
}
