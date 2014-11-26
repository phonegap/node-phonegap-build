/*
 * Module dependencies.
 */

var path = require('path');
var fs = require('fs');

/**
 * Create the project configuration file.
 *
 * creates the project configuration file as a JSON object.
 *
 * Options:
 *
 *   - `callback` {Function} is triggered after loading the configuration file.
 *     - `e` {Error} is null unless there is an error.
 *     - `data` {Object} is a JSON representation of the configuration file.
 */
module.exports.create = function(callback) {
    var buildpath = path.join(process.cwd(), '.pgbuild');
    var configpath = path.join(buildpath, 'config.json');
    var stub = { phonegap: {} }; 

    fs.mkdir(buildpath, function (err) {
            fs.writeFile(configpath, JSON.stringify(stub), function (err) {
                callback();
            });
        });
};


/**
 * Load the project configuration file.
 *
 * Loads the project configuration file as a JSON object.
 *
 * Options:
 *
 *   - `callback` {Function} is triggered after loading the configuration file.
 *     - `e` {Error} is null unless there is an error.
 *     - `data` {Object} is a JSON representation of the configuration file.
 */

module.exports.load = function(callback) {
    // require callback parameter
    if (!callback) throw new Error('missing callback parameter');

    var filepath = path.join(process.cwd(), '.pgbuild', 'config.json');
    
    fs.readFile(filepath, {encoding: 'utf-8'},function(err, data) {
        if (err) {
            module.exports.create(function(){
                module.exports.load(callback); 
            });        
        } else {
            callback(err, JSON.parse(data)); 
        }
    });
};

/**
 * Save the project configuration file.
 *
 * Saves the project configuration file as a stringified representation of
 * the JSON object.
 *
 * Options:
 *
 *   - `data` {Object} is the configuration data to save.
 *   - `callback` {Object} is trigger after the file is saved.
 *     - `e` {Error} is null unless there is an error.
 */

module.exports.save = function(data, callback) {
    // required parameters
    if (!data) throw new Error('missing data parameter');
    if (!callback) throw new Error('missing callback parameter');

    var filepath = path.join(process.cwd(), '.pgbuild', 'config.json');

    fs.writeFile(filepath, JSON.stringify(data), {encoding:'utf-8'}, function(e) {
        if (e) {
            module.exports.create(function(){
                module.exports.save(data, callback);
            });
        } else {
            callback();
        }
    });
};
