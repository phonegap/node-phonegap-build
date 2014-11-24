#!/usr/bin/env node

/*!
 * Module dependencies.
 */

var cli = require('../lib/cli/cli');

/*!
 * Run the command-line client.
 */
cli(process.argv, function(e) {
    if (e) {
        process.exit(e.exitCode || 1);
    }
});
