/*!
 * Module dependencies.
 */

var pgbuild = require('../main');
var console = require('./console');
var login = require('./login');

var allowedplat = ['android', 'ios', 'wp8'];
/**
 * $ phonegap remote build <platform>
 *
 * Options:
 */

module.exports = function(parsed, callback) {
console.log('cli build portion');
    var platform = parsed._[1];

    // validate platform data
    if (allowedplat.indexOf(platform) === -1) {
console.log('error error');
        callback(new Error('platform ' + platform + ' not recognized'));
        return;
    }

    // build data
    var data = {
        platforms: platform
    };

    var execute = function (data, callback) {
        pgbuild.build(data, function(e, data) {
            if (!e) {
                console.log("build complete");
            }
            callback(e, data);
        });
    };
console.log('wtf');
    // call login with empty options
    login(function(err, api) {
        console.log('build calling login module');
        if (err) {
            callback(err);
            return;
        }
        execute(data, callback);
    });
};
