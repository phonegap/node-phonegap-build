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
 */

User.prototype.login = function() {
};

/**
 * Logout
 *
 * Deletes the `this.api` instance.
 */

User.prototype.logout = function() {
    this.api = null;
};

/*
 * Expose User object
 */

module.exports = User;
