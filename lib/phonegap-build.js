/**
 * PhoneGap Build object.
 */

function PhoneGapBuild() {
}

/*
 * PhoneGap Build prototype chain composed of isolated actions.
 */

PhoneGapBuild.prototype.login = require('./phonegap-build/login');
PhoneGapBuild.prototype.logout = require('./phonegap-build/logout');
PhoneGapBuild.prototype.create = require('./phonegap-build/create');
PhoneGapBuild.prototype.build = require('./phonegap-build/build');

/*
 * Expose the PhoneGapBuild object.
 */

module.exports = PhoneGapBuild;
