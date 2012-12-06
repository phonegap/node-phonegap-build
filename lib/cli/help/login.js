/**
 * Help command for login.
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
        '  Usage: ' + argv.$0 + ' login [options]',
        '',
        '  Synopsis:',
        '',
        '    Log into your PhoneGap Build account.',
        '',
        '  Options:',
        '',
        '    -u, --username       your username',
        '    -p, --password       your password',
        '',
        '  Examples:',
        '',
        '    $ ' + argv.$0 + ' login',
        '    $ ' + argv.$0 + ' login --username mwbrooks',
        '    $ ' + argv.$0 + ' login --u mwbrooks',
        ''
    ];

    console.log(help.join('\n'));

    callback(null);
};
