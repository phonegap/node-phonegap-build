/*
 * Module dependencies.
 */

var cordova = require('cordova'),
    fs = require('fs');

/**
 * Create local project.
 *
 * Creates the project directory specified by `options.path` and populates it
 * with a standards PhoneGap project template.
 *
 * Options:
 *
 *   - `options` {Object} is the project configuration.
 *   - `options.path` {String} is the file system path to create application.
 *   - `callback` {Function} is the completion callback.
 *     - `e` {Error} is null unless there is an error.
 */

module.exports = function(options, callback) {
    // require options
    if (!options) throw new Error('requires option parameter');
    if (!options.path) throw new Error('requires option.path parameter');

    // optional callback
    callback = callback || function() {};

    // check if path exists
    fs.exists(options.path, function(exists) {
        if (exists) {
            callback(new Error('path already exists'));
            return;
        }

        // create cordova project
        try {
            cordova.create(options.path);
        } catch(e) {
            callback(e);
            return;
        }

        callback(null);
    });
};
