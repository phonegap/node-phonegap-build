/*
 * Module dependencies.
 */

var path = require('path');

/**
 * Display help dialog for create.
 */

module.exports = function() {
    var exec = path.basename(process.argv[1]);
    var output = [
        '',
        '  Usage: ' + exec +' create <path> [options]',
        '',
        '  Description:',
        '',
        '    Create a new application locally and remotely.',
        '',
        '  Options:',
        '',
        '    -n, --name           your application name',
        '',
        '  Examples:',
        '',
        '    $ ' + exec + ' create ./my-app',
        '    $ ' + exec + ' create ./my-app --name "My App"',
        ''
    ];

    console.log(output.join('\n'));
};
