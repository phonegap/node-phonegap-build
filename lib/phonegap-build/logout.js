/**
 * Logout
 *
 * Deletes the API instance.
 */

module.exports = function(args, callback) {
    this.api = null;
    callback();
};
