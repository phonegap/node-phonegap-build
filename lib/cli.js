/*
 * Module dependencies.
 */

var PhoneGapBuild = require('./phonegap-build');


/**
 * Command line interface object.
 */

function CLI() {
    this.phonegapbuild = new PhoneGapBuild();
}

/**
 * Command line commands.
 */

CLI.prototype.argv = require('./cli/argv');
CLI.prototype.unknown = require('./cli/unknown');
CLI.prototype.version = require('./cli/version');
CLI.prototype.help = require('./cli/help');
CLI.prototype.login = require('./cli/login');
CLI.prototype.logout = require('./cli/logout');
CLI.prototype.create = require('./cli/create');
CLI.prototype.create.help = require('./cli/create/help');

/*
 * Expose the CLI object.
 */

module.exports = CLI;
