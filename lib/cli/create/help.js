/**
 * Help commmand for create.
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
        '  Usage: ' + argv.$0 + ' create [options] <path>',
        '',
        '  Synopsis:',
        '',
        '    Create a new application locally and remotely.',
        '',
        '  Options:',
        '',
        '    -n, --name           your application name',
        '',
        '  Examples:',
        '',
        '    $ ' + argv.$0 + ' create ./my-app',
        '    $ ' + argv.$0 + ' create ./my-app --name "My App"',
        ''
    ];

    console.log(help.join('\n'));

    callback(null);
};
