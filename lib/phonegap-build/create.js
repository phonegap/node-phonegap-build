/*!
 * Module dependencies.
 */

var events = require('events'),
    path = require('path');

/**
 * Create a New App.
 *
 * Creates an application on the local filesystem.
 * The remote application is created on-demand during the first build.
 *
 * Options:
 *
 *   - `options` {Object} is data required to create an app
 *     - `api` {Object} is a phonegap-build-rest API object.
 *     - `path` {String} is a directory path for the app.
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

    // optional callback
    callback = callback || function() {};

    // validate path
    options.path = path.resolve(options.path);

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
 * Define helper.
 */

module.exports.local = require('./create/local');

/*!
 * Execute.
 */

var execute = function(options, emitter) {
    // create local project
    module.exports.local({ path: options.path }, function(e) {
        if (e) {
            emitter.emit('error', e);
            return;
        }

        emitter.emit('complete');
    });
};
