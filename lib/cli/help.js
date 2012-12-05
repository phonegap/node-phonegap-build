/**
 * Help command.
 *
 * Outputs the usage information for the command-line.
 *
 * Options:
 *
 *   - `argv` {Object} is an optimist object.
 *   - `callback` {Function} is null unless there is an error.
 */

module.exports = function(argv, callback) {
    var help = [
        '',
        '  Usage: ' + argv.$0 + ' [options] [commands]',
        '',
        '  Synopsis:',
        '',
        '    PhoneGap Build command-line environment.',
        '',
        '  Commands:',
        '',
        '    login                login to phonegap build',
        '    logout               logout of phonegap build',
        '    create <path>        create a phoengap project',
        '    help                 output usage information',
        '',
        '  Options:',
        '',
        '    -v, --version        output version number',
        '    -h, --help           output usage information',
        '',
        '  Additional Help:',
        '',
        '    $ ' + argv.$0 + ' <commands> help',
        '    $ ' + argv.$0 + ' <commands> --help',
        '    $ ' + argv.$0 + ' <commands> -h',
        ''
    ];

    console.log(help.join('\n'));

    callback(null);
};
