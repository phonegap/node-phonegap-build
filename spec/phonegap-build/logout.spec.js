/*
 * Module dependencies.
 */

var logout = require('../../lib/phonegap-build/logout'),
    config = require('../../lib/common/config');

/*
 * Specification for logout.
 */

describe('logout(options, callback)', function() {
    beforeEach(function() {
        spyOn(config.global, 'load');
        spyOn(config.global, 'save');
    });

    it('should require options parameter', function() {
        expect(function() { logout(undefined, function(e) {}); }).toThrow();
    });

    it('should not require callback parameter', function() {
        expect(function() { logout({}, undefined); }).not.toThrow();
    });

    it('should try to load the config', function(done) {
        logout({}, function(e) {});
        process.nextTick(function() {
            expect(config.global.load).toHaveBeenCalled();
            done();
        });
    });

    describe('successfully load config', function() {
        beforeEach(function() {
            config.global.load.andCallFake(function(callback) {
                callback(null, {
                    phonegap: {
                        email: 'zelda@nintendo.com',
                        token: 'abc123'
                    }
                });
            });
        });

        it('should try to save the config', function(done) {
            logout({}, function(e) {});
            process.nextTick(function() {
                expect(config.global.save).toHaveBeenCalled();
                done();
            });
        });

        describe('successfully saved config', function() {
            beforeEach(function() {
                config.global.save.andCallFake(function(data, callback) {
                    callback(null);
                });
            });

            it('should delete the token key', function(done) {
                logout({}, function(e) {});
                process.nextTick(function() {
                    expect(config.global.save.mostRecentCall.args[0].phonegap.token).not.toBeDefined();
                    done();
                });
            });

            it('should preserve the remaining keys', function(done) {
                logout({}, function(e) {});
                process.nextTick(function() {
                    expect(config.global.save.mostRecentCall.args[0]).toEqual(
                        {
                            phonegap: {
                                email: 'zelda@nintendo.com'
                            }
                        }
                    );
                    done();
                });
            });

            it('should trigger callback without an error', function(done) {
                logout({}, function(e) {
                    expect(e).toBeNull();
                    done();
                });
            });

            it('should trigger "complete" event', function(done) {
                var emitter = logout({});
                emitter.on('complete', function() {
                    done();
                });
            });
        });

        describe('failed to save config', function() {
            beforeEach(function() {
                config.global.save.andCallFake(function(data, callback) {
                    callback(new Error('no write access'));
                });
            });

            it('should trigger callback with an error', function(done) {
                logout({}, function(e) {
                    expect(e).toEqual(jasmine.any(Error));
                    done();
                });
            });

            it('should trigger "error" event', function(done) {
                var emitter = logout({});
                emitter.on('error', function(e) {
                    expect(e).toEqual(jasmine.any(Error));
                    done();
                });
            });
        });
    });

    describe('failed to load config', function() {
        beforeEach(function() {
            config.global.load.andCallFake(function(callback) {
                callback(new Error('no read access'));
            });
        });

        it('should trigger callback with an error', function(done) {
            logout({}, function(e) {
                expect(e).toEqual(jasmine.any(Error));
                done();
            });
        });

        it('should trigger "error" event', function(done) {
            var emitter = logout({});
            emitter.on('error', function(e) {
                expect(e).toEqual(jasmine.any(Error));
                done();
            });
        });
    });
});
