/*
 * Module dependencies.
 */

var shell = require('shelljs'),
    path = require('path'),
    fs = require('fs');

/**
 * Zip a Directory.
 */

module.exports = {

    /**
     * Zip a Directory.
     *
     * Options:
     *
     *   - `wwwPath` {String} is the path to the application's www/.
     *   - `buildPath` {String} is the path to the application's build/.
     *   - `callback` {Function} is trigger after the compress.
     *     - `e` {Error} is null unless there is an error.
     *     - `zipPath` {String} is the path to the zip archive.
     */

    compress: function(wwwPath, buildPath, callback) {
        // require parameters
        if (!wwwPath) throw new Error('missing www/ path argument');
        if (!buildPath) throw new Error('missing build/ path argument');
        if (!callback) throw new Error('missing callback argument');

        fs.exists(wwwPath, function(exists) {
            if (!exists) {
                callback(new Error('www path does not exist: ' + wwwPath));
                return;
            }

            // Phonegap Build expects 'www' to be at the root level in the
            // ZIP-file - we'll keep the old_dir to CD back after the ZIP's
            // been created.
            var old_dir = shell.pwd();
            shell.cd(wwwPath);

            // make build directory
            shell.mkdir('-p', buildPath);

            // set the output zip path
            var zipPath = path.join(buildPath, 'www.zip');

            // shell out to zip. For windows, use native script.
            var cmd;

            if(process.env.OS == "Windows_NT") {
                cmd = 'wscript '+ path.join('..', '..', '..', 'res', 'windows', 'zip.js') + ' ' + zipPath + ' .';
            }
            else {
                cmd = 'zip -r ' + zipPath + ' .';
            }

            var out = shell.exec(cmd, { silent: true });

            // Change back to old directory due to implicit assumptions
            // on the current working directory elsewhere in the script.
            shell.cd(old_dir);

            if (out.code !== 0) {
                module.exports.cleanup(zipPath);
                callback(new Error('failed to create the zip file: ' + zipPath));
            }
            else {
                callback(null, zipPath);
            }
        });
    },

    /**
     * Cleanup Zip Archive.
     *
     * Deletes the zip archive created by `compress(path, callback)` and removes
     * the parent directory if empty.
     *
     * Options:
     *
     *   - `zipPath` {String} is the path to the zip archive.
     */

    cleanup: function(zipPath) {
        var exists,
            basepath = path.dirname(zipPath);

        // remove zip file
        exists = fs.existsSync(zipPath);
        if (exists) {
            shell.rm(zipPath);
        }

        // remove zip directory if empty
        exists = fs.existsSync(basepath);
        if (exists) {
            fs.rmdir(basepath);
        }
    }
};
