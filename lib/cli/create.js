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
 */

module.exports = function(argv, callback) {
    var self = this;

    // $ phonegap-build create
    if (argv._.length <= 1) {
        self.create.help(argv, callback);
        return;
    }

    // $ phonegap-build create help
    if (argv._[1] === 'help') {
        self.create.help(argv, callback);
        return;
    }

    // $ phonegap-build create --help
    if (argv.help) {
        self.create.help(argv, callback);
        return;
    }

    // $ phonegap-build create -h
    if (argv.h) {
        self.create.help(argv, callback);
        return;
    }

    // require login before creating a project
    self.login(argv, function(e, api) {
        if (e) {
            callback(e);
            return;
        }

        // prompt for app name
        createPrompt(argv, function(e, argv) {
            if (e) {
                callback(e);
                return;
            }

            // create the project
            self.phonegapbuild.create({
                api: api,
                path: path.resolve(argv._[1]),
                name: argv.name || argv.n
            }, callback);
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
