var User = require('../../lib/phonegap-build/user'),
    user;

describe('user', function() {
    beforeEach(function() {
        user = new User();
    });

    describe('login', function() {
        it('should be a function', function() {
            expect(user.login).toEqual(jasmine.any(Function));
        });
    });

    describe('logout', function() {
        it('should be a function', function() {
            expect(user.logout).toEqual(jasmine.any(Function));
        });

        it('should delete the api object', function() {
            user.api = {};
            user.logout();
            expect(user.api).toBeNull();
        });
    });
});
