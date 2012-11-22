/*
 * Module dependencies.
 */

var fs = require('fs'),
    path = require('path'),
    shell = require('shelljs');

/**
 * Create module.
 *
 * Creates an application on the local filesystem and remotely on PhoneGap Build.
 */

var Create = function(user) {

    /**
     * Create the application.
     */

    var create = function(options) {
        // $ phonegap-build create
        if (options._.length <= 1) {
            return help();
        }

        // $ phonegap-build create help
        if (options._[1] === 'help') {
            return help();
        }

        // $ phonegap-build create --help
        if (options.help) {
            return help();
        }

        // $ phonegap-build create -h
        if (options.h) {
            return help();
        }

        var appPath = path.resolve(options._[1]);

        if (fs.existsSync(appPath)) {
            console.error(appPath, 'already exists');
        }
        else {
            shell.mkdir('-p', appPath);
            console.log('created app:', appPath);
        }
    };

    /**
     * Display create help dialog.
     */

    var help = function() {
        var exec = path.basename(process.argv[1]);
        var output = [
            '',
            '  Usage: ' + exec +' create <path> [options]',
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
            '    $ ' + exec + ' create ./my-app',
            '    $ ' + exec + ' create ./my-app --name "My App"',
            ''
        ];

        console.log(output.join('\n'));
    };

    return create;
};

module.exports = Create;
