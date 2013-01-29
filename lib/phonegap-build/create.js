/*!
 * Module dependencies.
 */

var events = require('events'),
    fs = require('fs');

/**
 * Create a New App.
 *
 * Creates an application on the local filesystem and also remotely on
 * PhoneGap Build. The remote application is linked by storing the app ID
 * inside the application's config file.
 *
 * Options:
 *
 *   - `options` {Object} is data required to create an app
 *     - `api` {Object} is a phonegap-build-rest API object.
 *     - `path` {String} is a directory path for the app.
 *     - `name` {String} is the app name give to PhoneGap Build.
 *   - [`callback`] {Function} is triggered after creating the app.
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
    if (!options.path) throw new Error('requires option.path parameter');
    if (!options.name) throw new Error('requires option.name parameter');

    // optional callback
    callback = callback || function() {};

    // event support
    var emitter = new events.EventEmitter();
    emitter.on('error', callback);
    emitter.on('complete', function() {
        callback(null);
    });

    // create app
    process.nextTick(function() {
        execute(options, emitter);
    });

    return emitter;
};

/*!
 * Create local project.
 */

module.exports.local = require('./create/local');

/*!
 * Create remote project.
 */

module.exports.remote = require('./create/remote');

/*!
 * Execute Create.
 */

var execute = function(options, emitter) {
    // create local project
    module.exports.local({ path: options.path }, function(e) {
        if (e) {
            emitter.emit('error', e);
            return;
        }

        // create remote project
        module.exports.remote(options, function(e) {
            if (e) {
                emitter.emit('error', e);
                return;
            }

            emitter.emit('complete');
        });
    });
};
