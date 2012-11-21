/*
 * Module dependencies
 */

var App = require('./phonegap-build/app');
var User = require('./phonegap-build/user');
var Create = require('./phonegap-build/create');

/*
 * Instances of the public root objects
 */

var user = new User();
var app = new App(user);
var create = new Create(user);

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
PhoneGap.prototype.create = create;
PhoneGap.prototype.defaults = user.defaults;

/*
 * Expose the public object
 */

module.exports = PhoneGap;
