/*
 * Module dependencies.
 */

var fs = require('fs');
var util = require('util');
var path = require('path');
var PhoneGap = require('./phonegap-build');

/*
* Load package.json
*/

var packageJSON = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));

/**
 * Command Line Interface object
 */

function CLI() {
}

/*
 * Inherit prototype of PhoneGap Build object
 */

util.inherits(CLI, PhoneGap);

/**
 * Version command
 */

CLI.prototype.version = function() {
    console.log(packageJSON.version);
};

/**
 * Help command
 */

CLI.prototype.help = function() {
    var exec = path.basename(process.argv[1]);
    var output = [
        '',
        '  Usage: ' + exec +' [options] [commands]',
        '',
        '  Commands:',
        '',
        '    login                log into PhoneGap Build',
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

/*
 * Expose the CLI object
 */

module.exports = CLI;
