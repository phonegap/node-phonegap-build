/*
 * Module dependencies.
 */

var path = require('path');

/*
 * Find the CLI process name. e.g. $ phonegap-build
 */

var processName = path.basename(process.argv[1]);

/**
 * Create help command.
 *
 * Outputs the usage information for the create command.
 *
 * Options:
 *
 *   - `argv` {Object} is an optimist object.
 *   - `callback` {Function} is a completion callback.
 */

module.exports = function(argv, callback) {
    var help = [
        '',
        '  Usage: ' + processName + ' create <path> [options]',
        '',
        '  Description:',
        '',
        '    Create a new application locally and remotely.',
        '',
        '  Options:',
        '',
        '    -n, --name           your application name',
        '',
        '  Examples:',
        '',
        '    $ ' + processName + ' create ./my-app',
        '    $ ' + processName + ' create ./my-app --name "My App"',
        ''
    ];

    console.log(help.join('\n'));
    callback();
};
