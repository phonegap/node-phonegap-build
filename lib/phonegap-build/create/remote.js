/*
 * Module dependencies.
 */

var config = require('../../common/config'),
    zip = require('./zip'),
    path = require('path');

/**
 * Create remote application.
 *
 * Options:
 *
 *   - `options` {Object} is the remote application data.
 *   - `options.api` {Object} is the API object defined by phonegap-build-rest.
 *   - `callback` {Function} is the completion callback.
 *     - `e` {Error} is null unless there is an error.
 */

module.exports = function(options, callback) {
    // require parameters
    if (!options) throw new Error('missing options parameter');
    if (!options.api) throw new Error('missing options.api parameter');
    if (!callback) throw new Error('missing callback parameter');

    // setup the zip input and output paths
    var paths = {
        www: path.join(process.cwd(), 'www'),
        build: path.join(process.cwd(), 'build')
    };

    // compress app for upload
    zip.compress(paths.www, paths.build, function(e, filename) {
        if (e) {
            callback(e);
            return;
        }

        // app url
        var url = '/apps';

        // post headers for phonegap build api
        var headers = {
            form: {
                data: {
                    title: 'My App', // @TODO replace with content of config.xml
                    create_method: 'file'
                },
                file: filename
            }
        };

        // create app on phonegap build
        options.api.post(url, headers, function(e, response) {
            zip.cleanup(filename);

            if (e) {
                callback(e);
                return;
            }

            // update config.json
            config.local.load(function(e, data) {
                if (e) {
                    callback(e);
                    return;
                }

                // add app id to config.json
                data['phonegap-build'] = data['phonegap-build'] || {};
                data['phonegap-build'].id = response.id;

                config.local.save(data, function(e) {
                    callback(e);
                });
            });
        });
    });
};

/*!
 * Module dependencies.
 */

//var events = require('events'),
//    config = require('../../common/config'),
//    zip = require('../create/zip'),
//    path = require('path');

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
 *   - [`callback`] {Function} is triggered after the build is complete.
 *     - `e` {Error} is null unless there is an error.
 */

//module.exports = function(options, callback) {
//    // require options
//    if (!options) throw new Error('requires option parameter');
//    if (!options.api) throw new Error('requires option.api parameter');
//    if (!options.platforms) throw new Error('requires option.platforms parameter');
//    if (!callback) throw new Error('requires callback parameter');

//    // paths for zip input and output
//    var paths = {
//        www: path.join(process.cwd(), 'www'),
//        build: path.join(process.cwd(), 'build')
//    };

//    // compress the app
//    zip.compress(paths.www, paths.build, function(e, filename) {
//        if (e) {
//            callback(e);
//            return;
//        }

//        // lookup app id
//        config.local.load(function(e, data) {
//            if (e) {
//                callback(e);
//                return;
//            }

//            // app url
//            var url = '/apps/' + data['phonegap-build'].id;

//            // put headers for zip file upload
//            var headers = {
//                form: {
//                    file: filename
//                }
//            };

//            // build app with phonegap build
//            options.api.put(url, headers, function(e, response) {
//                zip.cleanup(filename);

//                if (e) {
//                    callback(e);
//                    return;
//                }

//                var buildData = {
//                    id: data['phonegap-build'].id,
//                    api: options.api,
//                    platforms: options.platforms
//                };

//                // wait for the platform build to be completed
//                module.exports.waitForComplete(buildData, function(e) {
//                    if (e) {
//                        callback(e);
//                        return;
//                    }

//                    callback(null);
//                });
//            });
//        });
//    });
//};

/**
 * Wait for Build to Complete
 *
 * Continually queries the application build status. When the specified platform
 * build status changes to `complete` or `error`, then trigger the callback.
 *
 * Options:
 *
 *   - `options` {Object} defines the application and platform to watch.
 *   - `options.api` {Object} is the api object to access phonegap build.
 *   - `options.id` {Number} is the app ID to query.
 *   - `options.platforms` {Array} is a set of platform names to watch.
 *   - `callback` {Function} is triggered when the build is finished.
 *     - `e` {Error} is null unless there is an error.
 */

//module.exports.waitForComplete = function(options, callback) {
//    // required arguments
//    if (!options) throw new Error('missing options parameter');
//    if (!options.api) throw new Error('missing options.api parameter');
//    if (!options.id) throw new Error('missing options.id parameter');
//    if (!options.platforms) throw new Error('missing options.platforms parameter');
//    if (!callback) throw new Error('missing callback parameter');

//    var url = '/apps/' + options.id;
//    var platform = options.platforms[0];

//    // get the app info
//    options.api.get(url, function(e, data) {
//        if (e) {
//            callback(e);
//            return;
//        }

//        // lookup the progress of a specific platform
//        var status = data.status[platform];

//        // trigger callback with error because the app build progress has
//        // an error state
//        // @TODO is there a way to lookup info about the error?
//        if (status === 'error') {
//            callback(new Error('error occured while building the ' + platform + ' app'));
//        }
//        // trigger callback because the app has completed building
//        else if (status === 'complete') {
//            callback(null);
//        }
//        // pause to avoid slamming the API before re-checking the progress
//        else {
//            setTimeout(function() {
//                module.exports.waitForComplete(options, callback);
//            }, 5000);
//        }
//    });
//};
