/**
 * Module dependencies.
 */

var path = require('path');
var pgbuild = require('../main');
var clibuild = require('./remote.build');

/**
 * Parse command-line arguments.
 *
 * Inspects the arguments and calls the appropriate action.
 *
 * Options:
 *
 *   - `argv` {Object} is an optimist.argv object.
 *   - `[callback]` {Function} is called on completion.
 */

module.exports = function(argv, callback) {
    // optional callback
    callback = callback || function() {};

    // parse process.argv for easy --flag handling
    // skipped when already parsed
    if (!argv._) {
        argv = require('minimist')(argv.slice(2), {
            boolean: [
                'h', 'help'
            ]
        });
    }

    argv.platforms = ['ios'];

    clibuild(argv, function (e, data) {
        if(!e) {
            console.log("build complete");
        }
        callback(e, data);
    }); 
};
