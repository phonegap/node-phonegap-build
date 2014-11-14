/*!
 * Module dependencies.
 */

var pgbuild = require('../main');
var console = require('./console');
var login = require('./remote.login');

/**
 * $ phonegap remote build <platform>
 *
 * Build a specific platform. Eventually, it should support building multiple
 * platforms.
 *
 * The `phonegap.remote.build()` function will handle login requirements and
 * the login event handler is set with the CLI login function.
 *
 * Options:
 *
 *   - `argv` {Object} is an optimist object.
 *   - `callback` {Function} is a completion callback.
 *     - `e` {Error} is null unless there was an error.
 *     - `data` {Object} describes the built app.
 */

module.exports = function(argv, callback) {
console.log(argv, callback);
    // display help when missing required parameter <platform>
    // $ phonegap remote build
/*
    if (argv._.length <= 2) {
        argv._.unshift('help');
        this.cli.argv(argv, callback);
        return;
    }
*/
    console.log("login, buddy");
    console.log(argv);

    // build data
    var data = {
        platforms: [argv._[2]]
    };

    // console.prompt setup
    var promptOptions = {
        // use provided values
        override: data,

        // prompt properties
        data: {
            properties: {
                username: {
                    required: true,
                    description: 'enter username:'
                },
                password: {
                    hidden: true,
                    required: true,
                    description: 'enter password:'
                }
            }
        }
    };

    // begin prompting
    console.prompt(promptOptions, function(e, result) {
        console.log(e,result);
        if(e) {
            console.log(e);
            callback(e, result);
            return;
        }
console.log(argv);
        login(result, function(e,d) {
            console.log(e, d);

        });


        callback(e, result);
    });

    // build the project
/*    pgbuild.build(data, function(e, data) {
        if (!e) {
            console.log("build complete");
        }
        callback(e, data);
    });*/
};
