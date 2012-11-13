#!/usr/bin/env node

/*
 * Module dependencies.
 */

var argv = require('optimist').argv;
var CLI = require('../lib/phonegap-build-cli');
var cli = new CLI();

/*
 * Parse the arguments
 */

if (argv.version || argv.v) {
    cli.version();
    process.exit();
}

if (argv.help || argv.h) {
    cli.help();
    process.exit();
}

if (!argv._.length) {
    cli.help();
    process.exit();
}

try {
    cli[argv._[0]]();
} catch(e) {
    console.log('Unknown command:', argv._.join(' '));
}
