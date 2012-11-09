/**
 * Login command for PhoneGap Build.
 *
 * Attempts to log into PhoneGap Build using account information from:
 *
 *   1. values in the `options`
 *   2. values in the operating system keychain
 *   3. values in the `defaults`
 *
 * Options:
 *
 *   - [`options`] {Object} includes the login account details.
 *   - [`options.username`] {String} the username to use.
 *   - [`options.password`] {String} the password to use.
 *   - [`callback`] {Function} called after the login attempt.
 */
var login = function(options, callback) {
    // var account = options || keystore || defaults
    // client.auth(account, function(e, api) {
    //   if (e) return callback(e)
    //   Event.emit('login', api);
    //   callback(null);
    // });
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

/**
 * Expose `login` and `login.defaults`
 */
module.exports = login;
