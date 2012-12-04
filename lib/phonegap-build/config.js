/*
 * Module dependencies.
 */

var path = require('path'),
    fs = require('fs');

/**
 * Path to config directory.
 *
 * By default, the config is found under the user's home directory and
 * called '.phonegap-build/'
 *
 * You can override this desired.
 */

module.exports.path = path.join(
    process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'],
    '.phonegap-build'
);

/**
 * Load the config.
 *
 * Returns the content of configuration file.
 * The configuration file is found at `PATH/config.json`.
 * The value of `PATH` is defined by `config.path`.
 *
 * Options:
 *
 *   - `callback` {Function} is triggered with the config data.
 *     - `e` {Error} is null when there is no error.
 *     - `data` {Object} is the JSON content of configuration file.
 */

module.exports.load = function(callback) {
    // require callback
    if (!callback) {
        throw new Error('missing callback argument');
    }

    var filepath = path.join(module.exports.path, 'config.json');

    // check if config exists
    if (fs.existsSync(filepath)) {
        // read config file
        fs.readFile(filepath, function(e, data) {
            if (e) {
                callback(e);
                return;
            }

            // return config file object
            data = JSON.parse(data);
            callback(null, data);
        });
    }
    else {
        // create config file
        var data = '{}';
        fs.writeFile(filepath, data, function(e) {
            if (e) {
                callback(e);
                return;
            }

            // return config file object
            callback(null, JSON.parse(data));
        });
    }
};

/**
 * Save the config.
 *
 * Appends the data to the current configuration document.
 *
 * Options:
 *
 *   - `data` {Object} is the data to append to the config file.
 *   - `callback` {Function} is trigger after the save operation.
 *     - `e` {Error} is null when there is no error.
 */

module.exports.save = function(data, callback) {
    // require data
    if (!data) {
        throw new Error('missing data argument');
    }

    // require callback
    if (!callback) {
        throw new Error('missing callback argument');
    }

    module.exports.load(function(e, _data) {
        if (e) {
            callback(e);
            return;
        }

        // append keys but does not support subkeys
        Object.keys(data).forEach(function(key) {
            _data[key] = data[key];
        });

        // write to config file
        var filepath = path.join(module.exports.path, 'config.json');
        fs.writeFile(filepath, JSON.stringify(_data), function(e) {
            callback(e);
        });
    });
};
