/*
 * Module dependencies.
 */

var prompt = require('prompt');

/**
 * Create remote application.
 *
 * Options:
 *
 *   - `options` {Object} is the remote application data.
 *   - `options.title` {String} is the title passed to Build.
 *   - `options.api` {Object} is the API object defined by phonegap-build-rest.
 *   - `callback` {Function} is the completion callback.
 *     - `e` {Error} is null unless there is an error.
 */

module.exports = function(options, callback) {
    // prompt data
    var data = {
        properties: {
            name: {
                required: true,
                description: 'Enter the app name:'
            }
        }
    };

    // prompt setup
    prompt.override = options;
    prompt.colors = false;
    prompt.message = '';
    prompt.delimiter = '';
    prompt.start();

    // begin prompting the user
    prompt.get(data, function(e, result) {
        if (!e) {
            console.log('created "'+result.title+'" on PhoneGap Build');
        }
        callback(e);
    });
};
