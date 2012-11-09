#!/usr/bin/env node

/*
 * Module dependencies.
 */

var fs = require('fs');
var path = require('path');
var argv = require('optimist').argv;
var phonegap = require('../lib/phonegap-build');

/*
 * Load package.json
 */

var packageJSON = JSON.parse(fs.readFileSync(path.join(__dirname,'..','package.json'), 'utf8'));

/*
 * Version
 */

phonegap.version = function() {
    console.log(packageJSON.version);
};

/*
 * Help
 */

phonegap.help = function() {
    var exec = path.basename(process.argv[1]);
    var output = [
        '',
        '  Usage: ' + exec +' [options] [commands]',
        '',
        '  Commands:',
        '',
        '    help                 output usage information',
        '',
        '  Options:',
        '',
        '    -v, --version        output version number',
        '    -h, --help           output usage information',
        ''
    ];

    console.log(output.join('\n'));
};

if (argv.version || argv.v) {
    phonegap.version();
    process.exit();
}

if (argv.help || argv.h) {
    phonegap.help();
    process.exit();
}

if (!argv._.length) {
    phonegap.help();
    process.exit();
}

try {
    phonegap[argv._[0]]();
} catch(e) {
    console.log('Unknown command:', argv._.join(' '));
}
