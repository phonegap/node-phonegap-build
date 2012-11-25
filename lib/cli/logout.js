/**
 * Command line logout.
 *
 * For now, forward to the original PhoneGap Build logout.
 *
 * Options:
 *
 *   - `argv` {Object} is an optimist object.
 *   - `callback` {Function} is a completion callback.
 */

module.exports = function(argv, callback) {
    this.phonegapbuild.logout(argv, callback);
};
