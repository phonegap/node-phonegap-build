#!/usr/bin/env node

/*
 * Module dependencies.
 */

var program = require('commander');

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
