/*
 * Module dependencies.
 */

var fs = require('fs'),
    path = require('path'),
    prompt = require('prompt');

/**
 * Command line create command.
 *
 * For now, forward to the original PhoneGap Build create.
 *
 * Options:
 *
 *   - `argv` {Object} is an optimist object.
 *   - `callback` {Function} is a completion callback.
 *     - `e` {Error} is null unless there was an error.
 */

module.exports = function(argv, callback) {
    var self = this;

    // display help on $ phonegap-build create
    if (argv._.length <= 1) {
        self.help.create(argv, callback);
        return;
    }

    // require login before creating a project
    self.login(argv, function(e, api) {
        if (e) {
            callback(e);
            return;
        }

        // map the option -n to --name
        argv.name = argv.name || argv.n;

        // prompt for app name
        createPrompt(argv, function(e, argv) {
            if (e) {
                callback(e);
                return;
            }

            // project data
            var data = {
                api: api,
                path: path.resolve(argv._[1]),
                name: argv.name
            };

            // create the project
            self.phonegapbuild.create(data, function(e) {
                if (e) {
                    console.log('Failed to create a new project');
                }
                else {
                    console.log('Created project "' + data.name + '" at ' + data.path);
                }

                callback(e);
            });
        });
    });
};

function createPrompt(argv, callback) {
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
    prompt.override = argv;
    prompt.colors = false;
    prompt.message = '';
    prompt.delimiter = '';
    prompt.start();

    // begin prompting
    prompt.get(data, function(e, result) {
        if (e) {
            callback(e);
            return;
        }

        argv.name = result.name;
        callback(null, argv);
    });
}
