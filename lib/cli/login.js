/*!
 * Module dependencies.
 */

var pgbuild = require('../main'),
    console = require('./console');

/**
 * $ phonegap remote login [options]
 *
 * Prompts for the username and password.
 *
 * Options:
 *
 *   - `argv` {Object} is an optimist object.
 *   - `callback` {Function} is a completion callback.
 *     - `e` {Error} is null unless there is an error.
 *     - `api` {Object} is the phonegap-build-rest API object.
 */

module.exports = function(callback) {
    // check login status

    var promptOptions = {
        // prompt properties
        data: {
            properties: {
                username: {
                    required: true,
                    description: 'enter username:'
                },
                password: {
                    hidden: true,
                    required: true,
                    description: 'enter password:'
                }
            }
        }
    };

    // begin prompting
    console.prompt(promptOptions, function(err, result) {
        if(err) {
            callback(err, result);
            return;
        }
        pgbuild.login(result, function(err, api) {
            callback(err, api);
        });
    }); 
};
