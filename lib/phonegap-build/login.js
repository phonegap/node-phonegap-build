/*
 * Module dependencies
 */

var client = require('phonegap-build-rest');

/**
 * Login
 *
 * Authenticate with PhoneGap Build and return an API object.
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
        callback(e, api);
    });
};
