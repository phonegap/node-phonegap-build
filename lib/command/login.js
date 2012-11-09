/**
 * Login command for PhoneGap Build.
 *
 * Attempts to log into PhoneGap Build using the account information:
 *   1. Set in the `options` argument
 *   2. Set in the `defaults` object
 *
 * Options:
 *
 *   - [`options`] {Object} includes the login account details.
 *   - [`options.username`] {String} is the account username.
 *   - [`options.password`] {String} is the account password.
 *   - [`callback`] {Function} is called after the login attempt.
 */
var login = function(options, callback) {
};

/**
 * Default login account information.
 *
 * Each property can be a primitive value or function that returns a primitive
 * value.
 *
 * Options:
 *
 *   - `username` {String|Function}
 *   - `password` {String|Function}
 */
login.defaults = {
    'username': '',
    'password': ''
};

module.exports = login;
