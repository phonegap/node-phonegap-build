/**
 * Module dependencies.
 */

var fs = require('fs'),
    path = require('path');

/*
* Load package.json.
*/

var packagePath = path.join(__dirname, '..', '..', 'package.json'),
    packageJSON = JSON.parse(fs.readFileSync(packagePath), 'utf8');

/**
 * Version command.
 *
 * Outputs the version to the console.
 */

module.exports = function() {
    console.log(packageJSON.version);
};
