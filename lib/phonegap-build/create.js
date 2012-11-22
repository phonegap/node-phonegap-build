/*
 * Module dependencies.
 */

var fs = require('fs'),
    path = require('path'),
    shell = require('shelljs'),
    prompt = require('prompt');

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

        // app info
        var app = {
            path: path.resolve(options._[1]),
            name: options.name
        };

        // must be fresh path
        if (fs.existsSync(app.path)) {
            console.error(app.path, 'already exists');
            return;
        }

        // log in to get the API
        user.login(function(e, api) {
            // prompt data
            var data = {
                properties: {
                    name: {
                        required: true,
                        description: 'Enter the app name:'
                    }
                }
            };

            // prompt setup
            prompt.override = app;
            prompt.colors = false;
            prompt.message = '';
            prompt.delimiter = '';
            prompt.start();

            // begin prompting the user
            prompt.get(data, function(e, result) {
                app.name = result.name;
                shell.mkdir('-p', app.path);
                console.log('created app:', app.path);
            });
        });
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
