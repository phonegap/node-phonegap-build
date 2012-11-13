/*
 * Module dependencies
 */

var App = require('./phonegap-build/app');
var User = require('./phonegap-build/user');

/*
 * Instances of the public root objects
 */

var user = new User();
var app = new App(user);

/**
 * PhoneGap Build object
 */

function PhoneGap() {
}

/*
 * PhoneGap Build prototype chain composed of isolated actions
 */

PhoneGap.prototype.app = app;
PhoneGap.prototype.login = user.login;
PhoneGap.prototype.logout = user.logout;

/*
 * Expose the public object
 */

module.exports = PhoneGap;
