/*
 * Module dependencies.
 */

var shell = require('shelljs');

/**
 * Create local application.
 *
 * Options:
 *
 *   - `options.path` {String} is the file system path to create application.
 *   - `callback` {Function} is the completion callback.
 *      - `e` {Error} is null unless there is an error.
 */

module.exports = function(options, callback) {
    if (!options.path) {
        callback(new Error('Missing application path parameter.'));
        return;
    }

    shell.mkdir('-p', options.path);
    console.log('created app:', options.path);
    callback(null);
};
