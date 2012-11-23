/*
 * Module dependencies.
 */

var fs = require('fs'),
    path = require('path'),
    shell = require('shelljs'),
    prompt = require('prompt'),
    createHelp = require('./create/help'),
    createLocal = require('./create/local'),
    createRemote = require('./create/remote');

/**
 * Create module.
 *
 * Creates an application on the local filesystem and remotely on PhoneGap Build.
 */

var Create = function(user) {

    /**
     * Create the application.
     */

    var create = function(options) {
        // $ phonegap-build create
        if (options._.length <= 1) {
            return createHelp();
        }

        // $ phonegap-build create help
        if (options._[1] === 'help') {
            return createHelp();
        }

        // $ phonegap-build create --help
        if (options.help) {
            return createHelp();
        }

        // $ phonegap-build create -h
        if (options.h) {
            return createHelp();
        }

        // app info
        var app = {
            path: path.resolve(options._[1]),
            name: options.name
        };

        // must be fresh path
        if (fs.existsSync(app.path)) {
            console.error(app.path, 'already exists');
            return;
        }

        // log in to get the API
        user.login(function(e, api) {
            create.remote({ title: app.name, api: api }, function(e) {
                create.local({ path: app.path }, function(e) {
                    // done
                });
            });
        });
    };

    create.local = createLocal;
    create.remote = createRemote;
    create.help = createHelp;

    return create;
};

module.exports = Create;
