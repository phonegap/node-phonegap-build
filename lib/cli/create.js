/*!
 * Module dependencies.
 */

var fs = require('fs'),
    path = require('path');

/**
 * Command line create command.
 *
 * For now, forward to the original PhoneGap Build create.
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

    // require login before creating a project
    self.login(argv, function(e, api) {
        if (e) {
            callback(e);
            return;
        }

        // project info
        var data = {
            api: api,
            path: path.resolve(argv._[1])
        };

        // create the project
        self.phonegapbuild.create(data, function(e) {
            if (e) {
                console.log('Failed to create a new project:', e);
            }
            else {
                console.log('Created a new project at', data.path);
            }

            callback(e);
        });
    });
};
