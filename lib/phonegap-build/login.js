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
 *   - `complete` is trigger when there is no error.
 *     - `api` {API} is instance of phonegap-build-api object.
 */

module.exports = function(options, callback) {
    // callback is optional
    callback = callback || function() {};

    // event support
    var emitter = new events.EventEmitter();
    emitter.on('error', callback);
    emitter.on('complete', function(api) {
        callback(null, api);
    });

    // login
    process.nextTick(function() {
        execute(options, emitter);
    });

    return emitter;
};

/*!
 * Execute Login.
 */

var execute = function(options, emitter) {
    // lookup the token
    config.global.load(function(e, data) {
        // no config or token key
        if (e || !data.token) {
            // require options
            if (!options) {
                emitter.emit('error', new Error('username and password are required'));
                return;
            }

            // require options.username
            if (!options.username) {
                emitter.emit('error', new Error('username is required'));
                return;
            }

            // require options.password
            if (!options.password) {
                emitter.emit('error', new Error('password is required'));
                return;
            }

            // authenticate with phonegap build api
            client.auth(options, function(e, api) {
                if (e) {
                    emitter.emit('error', e);
                    return;
                }

                // save token to config
                config.global.save({ 'token': api.token }, function(e) {
                    // do not provide api on error
                    if (e) {
                        emitter.emit('error', e);
                        return;
                    }

                    emitter.emit('complete', api);
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

            emitter.emit('complete', api);
        }
    });
};
