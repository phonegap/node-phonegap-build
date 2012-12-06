/*
 * Module dependencies.
 */

var prompt = require('prompt');

/**
 * Command line login.
 *
 * Prompts for the username.
 *
 * Options:
 *
 *   - `argv` {Object} is an optimist object.
 *   - `callback` {Function} is a completion callback.
 *     - `e` {Error} is null unless there is an error.
 *     - `api` {Object} is the phonegap-build-rest API object.
 */

module.exports = function(argv, callback) {
    var self = this;

    // $ phonegap-build login help
    if (argv._[1] === 'help') {
        self.help.login(argv, callback);
        return;
    }

    // prompt properties
    var data = {
        properties: {
            username: {
                required: true,
                description: 'Enter your username:'
            },
            password: {
                hidden: true,
                required: true,
                description: 'Enter your password:'
            }
        }
    };

    // do not prompt for provided --options
    argv.username = argv.username || argv.u;
    argv.password = argv.password || argv.p;
    prompt.override = argv;

    // prompt setup
    prompt.colors = false;
    prompt.message = '';
    prompt.delimiter = '';
    prompt.start();

    // begin prompting
    prompt.get(data, function(e, result) {
        if (e) {
            callback(new Error('Command-line prompt failed.'));
            return;
        }

        self.phonegapbuild.login(result, function(e, api) {
            if (e) {
                e = new Error('Account authentication failed.');
            }

            callback(e, api);
        });
    });
};
