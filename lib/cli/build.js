/*!
 * Module dependencies.
 */

var console = require('./console'),
    qrcode = require('qrcode-terminal');

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
 *     - `data` {Object} describes the built app.
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
            platforms: [argv._[1]]
        };

        // build the project
        var build = self.phonegapbuild.build(data, function(e, appData) {
            if (e) {
                console.error('failed to build the app:', e);
            }
            else {
                console.log('generating the QR code...');

                // generate the qrcode
                qrcode.generate(
                    'https://build.phonegap.com' +
                    appData.download[data.platforms[0]] +
                    '?auth_token=' + api.token
                );

                console.log('install the app by scanning the QR code');
            }

            callback(e, appData);
        });
    });
};
