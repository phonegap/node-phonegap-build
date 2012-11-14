/*
 * Module dependencies.
 */

var util = require('util');
var prompt = require('prompt');
var PhoneGap = require('./phonegap-build');


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

CLI.prototype.argv = function(argv) {
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

CLI.prototype.version = require('./cli/version');

/**
 * Help command
 */

CLI.prototype.help = require('./cli/help');

/**
 * Unknown command
 */

CLI.prototype.unknown = require('./cli/unknown');

/**
 * Login command
 */

var _login = CLI.prototype.login;

CLI.prototype.login = function() {
    var options = {
        properties: {
            username: {
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
        if (e) return;

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
