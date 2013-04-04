/*!
 * Module dependencies
 */

var events = require('events'),
    client = require('phonegap-build-api'),
    config = require('../common/config');

/**
 * Login.
 *
 * Authenticates with PhoneGap Build, saves the token, and return an API object.
 * When the save token exists, the authentication step is skipped.
 *
 * Options:
 *
 *   - `options` {Object} contains the login credentials.
 *   - [`options.username`] {String} is the username.
 *   - [`options.password`] {String} is the password.
 *   - [`callback`] {Function} is called after the login.
 *     - `e` {Error} is null on a successful login attempt.
 *     - `api` {Object} the API object defined by phonegap-build-rest
 *
 * Events:
 *
 *   - `error` is triggered on an error.
 *     - `e` {Error} details the error.
 */

module.exports = function(options, callback) {
    // require options
    if (!options) throw new Error('requires options parameter');

    // callback is optional
    callback = callback || function() {};

    // login
    execute.call(this, options, callback);

    return this;
};

/*!
 * Execute Login.
 */

var execute = function(options, callback) {
    var self = this;

    // lookup the token
    config.global.load(function(e, data) {
        // no config or token key
        if (e || !data.phonegap || !data.phonegap.token) {
            // require options
            if (!options) {
                e = new Error('username and password are required');
                self.emit('error', e);
                callback(e);
                return;
            }

            // require options.username
            if (!options.username) {
                e = new Error('username is required');
                self.emit('error', e);
                callback(e);
                return;
            }

            // require options.password
            if (!options.password) {
                e = new Error('password is required');
                self.emit('error', e);
                callback(e);
                return;
            }

            // authenticate with phonegap build api
            client.auth(options, function(e, api) {
                if (e) {
                    self.emit('error', e);
                    callback(e);
                    return;
                }

                // data
                data = data || {};
                data.phonegap = data.phonegap || {};
                data.phonegap.token = api.token;

                // save the data
                config.global.save(data, function(e) {
                    // do not provide api on error
                    if (e) {
                        self.emit('error', e);
                        callback(e);
                        return;
                    }

                    // complete
                    callback(null, api);
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
                'token': data.phonegap.token
            });

            callback(null, api);
        }
    });
};
