/*!
 * Module dependencies.
 */

var PhoneGapBuild = require('../lib/phonegap-build'),
    phonegapbuild = new PhoneGapBuild();

/*!
 * PhoneGapBuild specification.
 */

describe('phonegapbuild', function() {
    it('should have a login action', function() {
        expect(phonegapbuild.login).toEqual(jasmine.any(Function));
    });

    it('should have a logout action', function() {
        expect(phonegapbuild.logout).toEqual(jasmine.any(Function));
    });

    it('should have a create action', function() {
        expect(phonegapbuild.create).toEqual(jasmine.any(Function));
    });

    it('should have a build action', function() {
        expect(phonegapbuild.build).toEqual(jasmine.any(Function));
    });
});
