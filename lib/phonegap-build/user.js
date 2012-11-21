/*
 * Module dependencies
 */

var prompt = require('prompt');
var client = require('phonegap-build-rest');

/**
 * User module
 *
 * Manages user authentication and exposes an instance of `phonegap-build-rest`.
 * Additional modules that need to access the PhoneGap Build API should accept
 * the `User` instance as a constructor parameter.
 */

var User = function() {
    /**
     * API instance of `phonegap-build-rest`
     */
    this.api = null;
};

/**
 * Login
 *
 * A login attempt goes through the following steps:
 *
 *   1. If `api` exists, then return it.
 *   2. If token exists, create and return `api`.
 *   3. Attempt to login with `options` and return `api`
 *   4. Return an `Error`.
 *
 * Options:
 *
 *   - [`options`] {Object} contains the login credentials.
 *   - [`options.username`] {String} is the username.
 *   - [`options.password`] {String} is the password.
 *   - `callback(e)` {Function} is called after the login.
 *     - `e` {Error} is null on a successful login attempt.
 *     - `api` {Object} the API object defined by phonegap-build-rest
 */

User.prototype.login = function() {
    var self = this;

    var options = (arguments.length > 1) ? arguments[0] : null;
    var callback = (arguments.length > 1) ? arguments[1] : arguments[0];

    // `callback` is required
    if (!callback) {
        throw new Error('callback is required');
    }

    // when `api` exists just return it
    if (self.api) {
        return callback(null, self.api);
    }

    // set default username and password
    options = options || {};
    options.username = options.username || options.u;
    options.password = options.password || options.p;

    // define `authCallback` to handle client authentication result
    var authCallback = function(e, api) {
        if (e) {
            console.log('Invalid account');
            return callback(e);
        }

        self.api = api;
        self.api.username = options.username;

        console.log('Logged in as:', options.username);
        callback(null, self.api);
    };

    // set the login defaults for the command-line.
    // this should be refactored to `lib/cli/login.js`.
    var loginDefaults = function(options, callback) {
        // prompt data to be gathered
        var data = {
            properties: {
            }
        };

        // prompt for username unless it is defined
        if (!options.username) {
            data.properties.username = {
                'default': '',
                'description': 'Enter your username:'
            };
        }

        // prompt for password unless it is defined
        if (!options.password) {
            data.properties.password = {
                'default': '',
                'description': 'Enter your password:'
            };
        }

        // prompt setup
        prompt.colors = false;
        prompt.message = '';
        prompt.delimiter = '';
        prompt.start();

        // begin prompting the user
        prompt.get(data, function(e, result) {
            callback(result);
        });
    };

    // when username or password are missing, fall back on the default values.
    // then attempt to login.
    if (!options.username || !options.password) {
        loginDefaults(options, function(opt) {
            // workaround: set username so authCallback can view it
            if (opt.username) {
                options.username = opt.username;
            }
            client.auth(opt, authCallback);
        });
    }
    else {
        client.auth(options, authCallback);
    }
};


/**
 * Logout
 *
 * Deletes the API instance.
 */

User.prototype.logout = function() {
    this.api = null;
};

/*
 * Expose User object
 */

module.exports = User;
