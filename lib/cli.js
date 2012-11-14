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

CLI.prototype.argv = require('./cli/argv');

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

CLI.prototype.login = require('./cli/login');

/*
 * Expose the CLI object
 */

module.exports = CLI;
