/*
 * Module dependencies.
 */

var zip = require('./zip'),
    path = require('path');

/**
 * Create remote application.
 *
 * Options:
 *
 *   - `options` {Object} is the remote application data.
 *   - `options.name` {String} is the title passed to Build.
 *   - `options.path` {String} is the path to the app.
 *   - `options.api` {Object} is the API object defined by phonegap-build-rest.
 *   - `callback` {Function} is the completion callback.
 *     - `e` {Error} is null unless there is an error.
 */

module.exports = function(options, callback) {
    // require parameters
    if (!options) throw new Error('missing options parameter');
    if (!options.name) throw new Error('missing options.name parameter');
    if (!options.path) throw new Error('missing options.path parameter');
    if (!options.api) throw new Error('missing options.api parameter');
    if (!callback) throw new Error('missing callback parameter');

    // compress app for upload
    zip.compress(options.path, function(e, zippath) {
        if (e) {
            callback(e);
            return;
        }

        // post headers for phonegap build api
        var headers = {
            form: {
                data: {
                    title: options.name,
                    create_method: 'file'
                },
                file: zippath
            }
        };

        // create app on phonegap build
        options.api.post('/apps', headers, function(e, response) {
            zip.cleanup();
            callback(e);
        });
    });
};
