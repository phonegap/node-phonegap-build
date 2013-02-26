/**
 * Command line logout.
 *
 * Logout of the current account and report whether it was a success or failure.
 *
 * Options:
 *
 *   - `argv` {Object} is an optimist object.
 *   - `callback` {Function} is a completion callback.
 */

module.exports = function(argv, callback) {
    this.phonegapbuild.logout(argv, function(e) {
        if (e) {
            console.log('Failed to logout:', e.message);
        }
        else {
            console.log('You are now logged out of PhoneGap Build.');
        }

        callback(e);
    });
};
