/*!
 * Module dependencies.
 */

var console = require('./console'),
    path = require('path');

/**
 * Command line create command.
 *
 * Creates a PhoneGap project.
 *
 * Options:
 *
 *   - `argv` {Object} is an optimist object.
 *   - `callback` {Function} is a completion callback.
 *     - `e` {Error} is null unless there was an error.
 */

module.exports = function(argv, callback) {
    var self = this;

    // display help on $ phonegap-build create
    if (argv._.length <= 1) {
        self.help.create(argv, callback);
        return;
    }

    // project info
    var data = {
        path: argv._[1]
    };

    // create the project
    self.phonegapbuild.create(data, function(e) {
        if (e) {
            console.error('failed to create the project:', e.message);
        }
        else {
            console.log('created the project:', path.relative('.', data.path));
        }

        callback(e);
    });
};
