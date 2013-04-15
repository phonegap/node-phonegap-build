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
    // $ phonegap-build help <command>
    if (typeof this[argv._[0]][argv._[1]] === 'function') {
        this[argv._[0]][argv._[1]](argv, callback);
    }
    // $ phonegap-build help
    else {
        var help = [
            '',
            '  Usage: ' + argv.$0 + ' [options] [commands]',
            '',
            '  Description:',
            '',
            '    PhoneGap Build command-line tool.',
            '',
            '  Commands:',
            '',
            '    login                login to phonegap build',
            '    logout               logout of phonegap build',
            '    create <path>        create a phonegap project',
            '    build [platform]     build a specific platform',
            '    help [commands]      output usage information',
            '    version              output version number',
            '',
            '  Options:',
            '',
            '    -v, --version        output version number',
            '    -h, --help           output usage information',
            '',
            'With no command is specified abuild is assumed. Without',
            'a platform a build is executed for \'android\'.',
            '',
            '  Examples:',
            '',
            '    ' + argv.$0,
            '    ' + argv.$0 + ' help create',
            '    ' + argv.$0 + ' create path/to/my-app',
            ''
        ];

        console.log(help.join('\n'));
        callback(null);
    }
};
