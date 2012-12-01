/*
 * Module dependencies.
 */

var path = require('path');

/*
 * Find the CLI process name. e.g. $ phonegap-build
 */

var processName = path.basename(process.argv[1]);

/**
 * Help command.
 *
 * Outputs the usage information for the command-line.
 *
 * Options:
 *
 *   - `argv` {Object} is an optimist object.
 *   - `callback` {Function} is a completion callback.
 */

module.exports = function(argv, callback) {
    var help = [
        '',
        '  Usage: ' + processName + ' [options] [commands]',
        '',
        '  Commands:',
        '',
        '    login                log into PhoneGap Build',
        '    create               create a PhoneGap project',
        '    help                 output usage information',
        '',
        '  Options:',
        '',
        '    -v, --version        output version number',
        '    -h, --help           output usage information',
        ''
    ];

    console.log(help.join('\n'));
    callback();
};
