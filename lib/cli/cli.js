/**
 * Module dependencies.
 */
var path = require('path');
var minimist = require('minimist');
var pgbuild = require('../main');

var build = require('./build');
var login = require('./login');
var logout = require('./logout');
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
        build(parsed, function (err, data) {
            callback(err, data);
        });
    } else if (command === "login") {
        login(function (err, result) {
            callback(err, result);
        }); 
    } else if (command === "logout") {
       logout(function (err, result) {
            callback(err, result);
        }); 
    } else {
        help();
    }
};
