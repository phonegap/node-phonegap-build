/*
 * Module dependencies
 */

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

    /**
     * Default username and password
     */
    this.defaults = {};
};

/**
 * Login
 *
 * A login attempt goes through the following steps:
 *
 *   1. If `api` exists, then return it.
 *   2. If token exists, create and return `api`.
 *   3. Attempt to login with `options` or `defaults` and return `api`
 *   4. Return an `Error`.
 *
 * Options:
 *
 *   - [`options`] {Object} contains the login credentials.
 *   - [`options.username`] {String} is the username.
 *   - [`options.password`] {String} is the password.
 *   - `callback(e)` {Function} is called after the login.
 *     - `e` {Error} is null on a successful login attempt.
 */

User.prototype.login = function() {
    var self = this;

    var options = (arguments.length > 1) ? arguments[0] : null;
    var callback = (arguments.length > 1) ? arguments[1] : arguments[0];

    if (!options) {
        this.defaults(function(defaults) {
            options = defaults;
        });
    }

    if (!callback) {
        callback = function() {};
    }

    if (this.api) {
        return callback(null, this.api);
    }

    client.auth(options, function(e, api) {
        if (e) return callback(e);
        self.api = api;
        callback(null, self.api);
    });
};

/**
 * Login default credentials.
 */

User.prototype.defaults = function(callback) {
    callback({
        username: '',
        password: ''
    });
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
