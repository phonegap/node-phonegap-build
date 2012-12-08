/*
 * Module dependencies.
 */

var shell = require('shelljs'),
    path = require('path'),
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

        // create project by copying template
        shell.cp('-R', module.exports.templatePath, options.path);

        callback(null);
    });
};

/**
 * Project template path.
 *
 * This points to the bundled project template.
 * 
 * You can override this to use your own custom project.
 */

module.exports.templatePath = path.resolve('./res/project');
