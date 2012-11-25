/*
 * Module dependencies.
 */

var fs = require('fs');

/**
 * Create module.
 *
 * Creates an application on the local filesystem and remotely on PhoneGap Build.
 */

var create = function(options, callback) {
    // must be fresh path
    if (fs.existsSync(options.path)) {
        console.error(options.path, 'already exists');
        return;
    }

    // create remote and local projects
    create.remote({ name: options.name, api: options.api }, function(e) {
        create.local({ path: options.path }, function(e) {
            callback(e);
        });
    });
};

create.local = require('./create/local');
create.remote = require('./create/remote');

module.exports = create;
