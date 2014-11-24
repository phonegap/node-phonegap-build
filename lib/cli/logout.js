/*!
 * Module dependencies.
 */

var pgbuild = require('../main');
var console = require('./console');

/**
 * $ phonegap remote logout
 *
 * Logout of the current account and report whether it was a success or failure.
 *
 * Options:
 *
 *   - `argv` {Object} is an optimist object.
 *   - `callback` {Function} is a completion callback.
 */

module.exports = function(callback) {
    pgbuild.logout({}, function(err) {
        if (!err) {
            console.log("logout successful");
        }
        callback(err);
    });
};
