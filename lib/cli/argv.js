/**
 * Module dependencies.
 */

var path = require('path');
var pgbuild = require('../main');
var build = require('./remote.build');
var help = require('./help');

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

    console.log(argv);

    

    if (argv._[0] === "build") {
        build(argv, function (e, data) {
            if(!e) {
                console.log("build complete");
            }
console.log(e);
            callback(e, data);
        });
    } else {
        help();
    }
};
