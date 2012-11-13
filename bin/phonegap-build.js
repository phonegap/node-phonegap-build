#!/usr/bin/env node

/*
 * Module dependencies.
 */

var argv = require('optimist').argv;
var CLI = require('../lib/phonegap-build-cli');

/*
 * Run the command-line client
 */

var cli = new CLI().parse(argv);
