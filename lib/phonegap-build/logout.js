/*
 * Module dependencies.
 */

var config = require('../common/config');

/**
 * Logout
 *
 * Logout the user by deleting the token key from the config file.
 *
 * Options:
 *
 *   - `args` {Object} is unused and should be `{}`.
 *   - `callback` {Function} is a callback function.
 *     - `e` {Error} is null unless there is an error.
 */

module.exports = function(args, callback) {
    // require args parameter
    if (!args) {
        throw new Error('missing args parameter');
    }

    // require callback parameter
    if (!callback) {
        throw new Error('missing callback parameter');
    }

    // read config file
    config.global.load(function(e, data) {
        if (e) {
            callback(e);
            return;
        }

        // log out by removing user auth token
        data.token = undefined;

        config.global.save(data, function(e) {
            callback(e);
        });
    });
};
