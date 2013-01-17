/**
 * Command line build command.
 *
 * Build a specific platform. Eventually, it should support building multiple
 * platforms.
 *
 * Options:
 *
 *   - `argv` {Object} is an optimist object.
 *   - `callback` {Function} is a completion callback.
 *     - `e` {Error} is null unless there was an error.
 */

module.exports = function(argv, callback) {
    var self = this;

    // display help when missing required parameter <platform>
    if (argv._.length <= 1) {
        self.help.build(argv, callback);
        return;
    }

    // require login
    self.login(argv, function(e, api) {
        if (e) {
            callback(e);
            return;
        }

        // build data
        var data = {
            api: api,
            platforms: [ argv._[1] ]
        };

        // build the project
        self.phonegapbuild.build(data, function(e) {
            if (e) {
                console.log('Failed to build the project:', e);
            }
            else {
                console.log('Built the project for the', data.platforms[0], 'platform');
            }

            callback(e);
        });
    });
};
