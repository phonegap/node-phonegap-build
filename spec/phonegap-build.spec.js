var PhoneGap = require('../lib/phonegap-build');
var phonegap;

describe('phonegap-build', function() {
    beforeEach(function() {
        phonegap = new PhoneGap();
    });

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
            expect(phonegap.app).toEqual(jasmine.any(Object));
        });
    });
});
