/*
 * Module dependencies.
 */

var util = require('util'),
    PhoneGap = require('./phonegap-build');


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
 * Additional CLI commands
 */

CLI.prototype.argv = require('./cli/argv');
CLI.prototype.version = require('./cli/version');
CLI.prototype.help = require('./cli/help');
CLI.prototype.unknown = require('./cli/unknown');

/*
 * Expose the CLI object
 */

module.exports = CLI;
