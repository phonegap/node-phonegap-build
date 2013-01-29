/*!
 * Module dependencies.
 */

var events = require('events'),
    config = require('../common/config');

/**
 * Logout.
 *
 * Logout the user by deleting the token key from the config file.
 *
 * Options:
 *
 *   - `args` {Object} is unused and should be `{}`.
 *   - [`callback`] {Function} is a callback function.
 *     - `e` {Error} is null unless there is an error.
 *
 * Events:
 *
 *   - `error` is trigger on an error.
 *     - `e` {Error} details the error.
 *   - `complete` is trigger when there is no error.
 */

module.exports = function(args, callback) {
    // require args parameter
    if (!args) {
        throw new Error('missing args parameter');
    }

    // optional callback
    callback = callback || function(e) {};

    // event support
    var emitter = new events.EventEmitter();
    emitter.on('error', callback);
    emitter.on('complete', callback);

    // logout
    process.nextTick(function() {
        execute(args, emitter);
    });

    return emitter;
};

/*!
 * Execute Logout.
 */

var execute = function(args, emitter) {
    // read global config file
    config.global.load(function(e, data) {
        if (e) {
            emitter.emit('error', e);
            return;
        }

        // log out by removing user auth token
        data.token = undefined;
        config.global.save(data, function(e) {
            if (e) {
                emitter.emit('error', e);
                return;
            }

            emitter.emit('complete', null);
        });
    });
};
