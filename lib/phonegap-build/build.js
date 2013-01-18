/*
 * Module dependencies.
 */

var config = require('../common/config'),
    zip = require('./create/zip'),
    path = require('path');

/**
 * Build an app using PhoneGap Build.
 *
 * The build task will compress the application, upload it to PhoneGap Build,
 * and poll until the platform's build status is complete or an error is
 * encountered.
 *
 * Options:
 *
 *   - `options` {Object} is data required for building a platform.
 *   - `options.api` {Object} is the phonegap-build-api API object.
 *   - `options.platforms` {Array} is a collection of platform names {String} that
 *                         specify the platforms to build.
 *   - `callback` {Function} is triggered after the build is complete.
 *     - `e` {Error} is null unless there is an error.
 */

module.exports = function(options, callback) {
    // require options
    if (!options) throw new Error('requires option parameter');
    if (!options.api) throw new Error('requires option.api parameter');
    if (!options.platforms) throw new Error('requires option.platforms parameter');

    // optional callback
    callback = callback || function() {};

    // paths for zip input and output
    var paths = {
        www: path.join(process.cwd(), 'www'),
        build: path.join(process.cwd(), 'build')
    };

    // compress the app
    zip.compress(paths.www, paths.build, function(e, filename) {
        if (e) {
            callback(e);
            return;
        }

        // lookup app id
        config.local.load(function(e, data) {
            if (e) {
                callback(e);
                return;
            }

            // app url
            var url = '/apps/' + data['phonegap-build'].id;

            // put headers for zip file upload
            var headers = {
                form: {
                    file: filename
                }
            };

            // build app with phonegap build
            options.api.put(url, headers, function(e, response) {
                zip.cleanup(filename);
                callback(e);
            });
        });
    });
};
