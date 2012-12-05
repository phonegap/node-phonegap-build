/*
 * Module dependencies.
 */

var logout = require('../../lib/phonegap-build/logout'),
    config = require('../../lib/phonegap-build/config');

/*
 * Specification for logout.
 */

describe('logout(options, callback)', function() {
    beforeEach(function() {
        spyOn(config, 'load');
        spyOn(config, 'save');
    });

    it('should require options parameter', function() {
        expect(function() { logout(undefined, function(e) {}); }).toThrow();
    });

    it('should require callback parameter', function() {
        expect(function() { logout({}, undefined); }).toThrow();
    });

    it('should try to load the config', function() {
        logout({}, function(e) {});
        expect(config.load).toHaveBeenCalled();
    });

    describe('successfully load config', function() {
        beforeEach(function() {
            config.load.andCallFake(function(callback) {
                callback(null, {
                    email: 'zelda@nintendo.com',
                    token: 'abc123'
                });
            });
        });

        it('should try to save the config', function() {
            logout({}, function(e) {});
            expect(config.save).toHaveBeenCalled();
        });

        describe('successfully saved config', function() {
            beforeEach(function() {
                config.save.andCallFake(function(data, callback) {
                    callback(null);
                });
            });

            it('should delete the token key', function() {
                logout({}, function(e) {});
                expect(config.save.mostRecentCall.args[0].token).not.toBeDefined();
            });

            it('should preserve the remaining keys', function() {
                logout({}, function(e) {});
                expect(config.save.mostRecentCall.args[0]).toEqual(
                    { email: 'zelda@nintendo.com' }
                );
            });

            it('should trigger callback without an error', function(done) {
                logout({}, function(e) {
                    expect(e).toBeNull();
                    done();
                });
            });
        });

        describe('failed to save config', function() {
            beforeEach(function() {
                config.save.andCallFake(function(data, callback) {
                    callback(new Error('no write access'));
                });
            });

            it('should trigger callback with an error', function(done) {
                logout({}, function(e) {
                    expect(e).toEqual(jasmine.any(Error));
                    done();
                });
            });
        });
    });

    describe('failed to load config', function() {
        beforeEach(function() {
            config.load.andCallFake(function(callback) {
                callback(new Error('no read access'));
            });
        });

        it('should trigger callback without an error', function(done) {
            logout({}, function(e) {
                expect(e).toEqual(jasmine.any(Error));
                done();
            });
        });
    });
});
