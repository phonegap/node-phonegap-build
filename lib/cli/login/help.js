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
 * Outputs the usage information for the login command.
 *
 * Options:
 *
 *   - `argv` {Object} is an optimist object.
 *   - `callback` {Function} is a completion callback.
 */

module.exports = function(argv, callback) {
    var help = [
        '',
        '  Usage: ' + processName + ' login [options]',
        '',
        '  Description:',
        '',
        '    Login with your PhoneGap Build account.',
        '',
        '  Options:',
        '',
        '    -u, --username       your username',
        '    -p, --password       your password',
        '',
        '  Examples:',
        '',
        '    $ ' + processName + ' login',
        '    $ ' + processName + ' login --username mwbrooks',
        '    $ ' + processName + ' login --u mwbrooks',
        ''
    ];

    console.log(help.join('\n'));
    callback();
};
