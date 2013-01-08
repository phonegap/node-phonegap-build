/*
 * Module dependencies.
 */

var fs = require('fs');

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
 *   - `callback` {Function} is triggered after creating the app.
 *     - `e` {Error} is null unless there is an error.
 */

module.exports = function(options, callback) {
    // require options
    if (!options) throw new Error('requires option parameter');
    if (!options.api) throw new Error('requires option.api parameter');
    if (!options.path) throw new Error('requires option.path parameter');
    if (!options.name) throw new Error('requires option.name parameter');

    // optional callback
    callback = callback || function() {};

    // create local project
    module.exports.local({ path: options.path }, function(e) {
        if (e) {
            callback(e);
            return;
        }
        // create remote project
        module.exports.remote(options, function(e) {
            callback(e);
        });
    });
};

/**
 * Create local project.
 */

module.exports.local = require('./create/local');

/**
 * Create remote project.
 */

module.exports.remote = require('./create/remote');
