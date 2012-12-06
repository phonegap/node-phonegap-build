/*
 * Module dependencies
 */

var client = require('phonegap-build-rest'),
    config = require('./config.js');

/**
 * Login
 *
 * Authenticates with PhoneGap Build, saves the token, and return an API object.
 * When the save token exists, the authentication step is skipped.
 *
 * Options:
 *
 *   - `options` {Object} contains the login credentials.
 *   - `options.username` {String} is the username.
 *   - `options.password` {String} is the password.
 *   - `callback(e)` {Function} is called after the login.
 *     - `e` {Error} is null on a successful login attempt.
 *     - `api` {Object} the API object defined by phonegap-build-rest
 */

module.exports = function(options, callback) {
    // callback is optional
    callback = callback || function() {};

    // lookup the token
    config.load(function(e, data) {
        // no config or token key
        if (e || !data.token) {
            // require options
            if (!options) {
                callback(new Error('username and password are required'));
                return;
            }

            // require username
            if (!options.username) {
                callback(new Error('username is required'));
                return;
            }

            // require password
            if (!options.password) {
                callback(new Error('password is required'));
                return;
            }

            // authenticate with phonegap build api
            client.auth(options, function(e, api) {
                if (e) {
                    callback(e);
                    return;
                }

                // save token to config
                config.save({ 'token': api.token }, function(e) {
                    // do not provide api on error
                    if (e) {
                        api = undefined;
                    }

                    callback(e, api);
                });
            });
        }
        else {
            // create phonegap build api
            var api = new client.API({
                'protocol': 'https:',
                'host': 'build.phonegap.com',
                'port': '443',
                'path': '/api/v1',
                'token': data.token
            });

            callback(null, api);
        }
    });
};
