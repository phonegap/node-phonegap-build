/**
 * Module dependencies.
 */
var path = require('path');
var minimist = require('minimist');
var pgbuild = require('../main');

var build = require('./build');
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
    var command;
    var parsed;

    callback = callback || function() {};

    parsed = minimist(argv.slice(2), {
        boolean: ['h', 'help']
    });

    command = parsed._[0];
    if (command === 'build') {
    console.log('buildy build build');
        build(parsed, function (err, data) {
            if(err) {
                console.log(err);
            }
            callback(err, data);
        });
    } else if (command === "login") {
        //call login
        
    } else if (command === "logout") {
        //call logout
        
    } else {
        help();
    }
};
