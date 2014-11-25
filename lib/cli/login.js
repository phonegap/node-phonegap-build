/*!
 * Module dependencies.
 */

var pgbuild = require('../main');
var console = require('./console');
var config = require('../common/config');

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

   // check login status
    config.global.load(function(err, data) {
        if (!err && data && data.phonegap && data.phonegap.token) {
            // already logged in, login will sort things out 
            pgbuild.login({}, function(err, api) {
                callback(err, api);
            }); 
            return;
        } else if (err) {
            callback(err, data);
            return;
        }

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
    });
};
