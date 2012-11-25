/**
 * Command line create command.
 *
 * For now, forward to the original PhoneGap Build create.
 *
 * Options:
 *
 *   - `argv` {Object} is an optimist object.
 *   - `callback` {Function} is a completion callback.
 */

module.exports = function(argv, callback) {
    this.phonegapbuild.create(argv, callback);
};
