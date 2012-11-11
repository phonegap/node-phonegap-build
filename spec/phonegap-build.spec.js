var phonegap = require('../lib/phonegap-build');

describe('phonegap-build', function() {
    describe('login', function() {
        it('should be a function', function() {
            expect(phonegap.login).toEqual(jasmine.any(Function));
        });
    });

    describe('logout', function() {
        it('should be a function', function() {
            expect(phonegap.logout).toEqual(jasmine.any(Function));
        });
    });

    describe('app', function() {
        it('should be an object', function() {
            expect(phonegap.app).toEqual(jasmine.any(Function));
        });
    });
});
