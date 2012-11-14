/*
 * Module dependencies.
 */

var fs = require('fs');
var util = require('util');
var path = require('path');
var prompt = require('prompt');
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
 * Parse the arguments
 */

CLI.prototype.parse = function(argv) {
    if (argv.version || argv.v) {
        this.version();
        return;
    }

    if (argv.help || argv.h) {
        this.help();
        return;
    }

    if (!argv._.length) {
        this.help();
        return;
    }

    try {
        this[argv._[0]]();
    } catch(e) {
        this.unknown();
    }
};

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

/**
 * Unknown command
 */

CLI.prototype.unknown = function(command) {
    console.log('Unknown command:', command);
};

/**
 * Login command
 */

var _login = CLI.prototype.login;
CLI.prototype.login = function() {
    var options = {
        properties: {
            name: {
                required: true,
                description: 'Enter your username:'
            },
            password: {
                required: true,
                hidden: true,
                description: 'Enter your password:'
            }
        }
    };

    prompt.colors = false;
    prompt.message = '';
    prompt.delimiter = '';
    prompt.start();

    prompt.get(options, function(e, input) {
        _login(input, function(e) {
            // @TODO halt on invalid authentications
            // @TODO forward on valid authentications
        });
    });
};

/*
 * Expose the CLI object
 */

module.exports = CLI;
