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

/*
 * Expose the public interface
 */

module.exports = {
    'app': app,
    'login': user.login,
    'logout': user.logout
};
