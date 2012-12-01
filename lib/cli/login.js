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
 */

module.exports = function(argv, callback) {
    var self = this;

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
            callback(e);
            return;
        }

        self.phonegapbuild.login(result, callback);
    });
};
