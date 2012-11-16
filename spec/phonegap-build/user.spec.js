var client = require('phonegap-build-rest'),
    User = require('../../lib/phonegap-build/user'),
    user,
    options;

describe('user', function() {
    beforeEach(function() {
        user = new User();
        options = { username: 'zelda', password: 'tr1force' };
    });

    describe('login', function() {
        beforeEach(function() {
            spyOn(client, 'auth').andCallFake(function(options, callback) {
                callback(null, {});
            });
        });

        it('should be a function', function() {
            expect(user.login).toEqual(jasmine.any(Function));
        });

        describe('when api exists', function() {
            it('should return the api object', function(done) {
                user.api = {};
                user.login({}, function(e, api) {
                    expect(api).toBeDefined();
                    done();
                });
            });
        });

        describe('when using options', function() {
            it('should authenticate with the options', function(done) {
                user.login(options, function(e, api) {
                    expect(client.auth).toHaveBeenCalledWith(options, jasmine.any(Function));
                    done();
                });
            });

            it('return api object', function(done) {
                user.login(options, function(e, api) {
                    expect(api).toBeDefined();
                    done();
                });
            });
        });

        describe('with using defaults', function() {
            beforeEach(function() {
                user.defaults = function(callback) {
                    callback({ username: 'rick', password: 'z0mb1es' });
                };
            });

            it('should authenticate with the defaults', function(done) {
                user.login(function(e, api) {
                    expect(client.auth).toHaveBeenCalledWith({
                        username: 'rick',
                        password: 'z0mb1es'
                    }, jasmine.any(Function));
                    done();
                });
            });

            it('return api object', function(done) {
                user.login(function(e, api) {
                    expect(api).toBeDefined();
                    done();
                });
            });
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
