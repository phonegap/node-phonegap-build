/*!
 * Module dependencies.
 */

var events = require('events'),
    config = require('../common/config'),
    path = require('path');

/**
 * Build an app using PhoneGap Build.
 *
 * Builds the application using PhoneGap/Build. If the application does not
 * exist, then it is first created. Currently, the build task only supports
 * file transfers (zip) but will be extended to git repositories in the future.
 *
 * Options:
 *
 *   - `options` {Object} is data required for building a platform.
 *   - `options.api` {Object} is the phonegap-build-api API object.
 *   - `options.platforms` {Array} is a collection of platform names {String} that
 *                         specify the platforms to build.
 *   - [`callback`] {Function} is triggered after the build is complete.
 *     - `e` {Error} is null unless there is an error.
 *
 * Events:
 *
 *   - `error` is trigger on an error.
 *     - `e` {Error} details the error.
 *   - `complete` is trigger when no error occurs.
 */

module.exports = function(options, callback) {
    // require options
    if (!options) throw new Error('requires option parameter');
    if (!options.api) throw new Error('requires option.api parameter');
    if (!options.platforms) throw new Error('requires option.platforms parameter');

    // optional callback
    callback = callback || function() {};

    // event support
    var emitter = new events.EventEmitter();
    emitter.on('error', callback);
    emitter.on('complete', function() {
        callback(null);
    });

    // build
    process.nextTick(function() {
        execute(options, emitter);
    });

    return emitter;
};

/*!
 * Helper modules.
 */

module.exports.create = require('./create/remote');
module.exports.build = require('./build/remote');

/*!
 * Execute.
 */

var execute = function(options, emitter) {
    // generic callback
    var callback = function(e) {
        if (e) {
            emitter.emit('error', e);
        }
        else {
            emitter.emit('complete');
        }
    };

    // lookup app id
    config.local.load(function(e, data) {
        if (e) {
            emitter.emit('error', e);
            return;
        }

        // expose event emitter
        options.emitter = emitter;

        if (data.phonegap && data.phonegap.id) {
            module.exports.build(options, callback);
        }
        else {
            module.exports.create(options, callback);
        }
    });
};
