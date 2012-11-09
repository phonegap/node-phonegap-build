var phonegap = require('../lib/phonegap-build');

describe('phonegap-build', function() {
    describe('login', function() {
        it('should exist', function() {
            expect(phonegap.login).toEqual(jasmine.any(Function));
        });
    });
});
