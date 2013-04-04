/*
 * Module dependencies.
 */

var PhoneGapBuild = require('../../lib/phonegap-build'),
    config = require('../../lib/common/config'),
    client = require('phonegap-build-api'),
    phonegapbuild,
    options;

/*
 * Specification: phonegapbuild.login(options, [callback])
 */

describe('phonegapbuild.login(options, [callback])', function() {
    beforeEach(function() {
        phonegapbuild = new PhoneGapBuild();
        options = { username: 'zelda', password: 'tr1force' };
        spyOn(client, 'auth');
        spyOn(config.global, 'load');
        spyOn(config.global, 'save');
    });

    it('should not require callback', function() {
        expect(function() {
            phonegapbuild.login(options);
        }).not.toThrow();
    });

    it('should return itself', function() {
        expect(phonegapbuild.login(options)).toEqual(phonegapbuild);
    });

    it('should try to lookup token', function() {
        phonegapbuild.login(options, function(e, api) {});
        process.nextTick(function() {
            expect(config.global.load).toHaveBeenCalled();
        });
    });

    describe('successful token lookup', function() {
        beforeEach(function() {
            config.global.load.andCallFake(function(callback) {
                callback(null, {
                    'phonegap': {
                        'token': 'abc123'
                    }
                });
            });
        });

        it('should trigger callback without an error', function(done) {
            phonegapbuild.login(options, function(e, api) {
                expect(e).toBeNull();
                done();
            });
        });

        it('should trigger callback with an api object', function(done) {
            phonegapbuild.login(options, function(e, api) {
                expect(api).toBeDefined();
                done();
            });
        });
    });

    describe('failed token lookup', function() {
        beforeEach(function() {
            config.global.load.andCallFake(function(callback) {
                callback(new Error('config not found at ~/.cordova'));
            });
        });

        it('should require option.username', function(done) {
            options.username = undefined;
            phonegapbuild.login(options, function(e, api) {
                expect(e).toBeDefined();
                expect(api).not.toBeDefined();
                done();
            });
        });

        it('should require option.password', function(done) {
            options.password = undefined;
            phonegapbuild.login(options, function(e, api) {
                expect(e).toBeDefined();
                expect(api).not.toBeDefined();
                done();
            });
        });

        it('should try to authenticate', function() {
            phonegapbuild.login(options, function() {});
            process.nextTick(function() {
                expect(client.auth).toHaveBeenCalledWith(
                    options,
                    jasmine.any(Function)
                );
            });
        });

        describe('successful authentication', function() {
            beforeEach(function() {
                client.auth.andCallFake(function(options, callback) {
                    callback(null, { token: 'abc123' });
                });
            });

            it('should try to save token', function(done) {
                phonegapbuild.login(options, function(e, api) {});
                process.nextTick(function() {
                    expect(config.global.save).toHaveBeenCalled();
                    expect(
                        config.global.save.mostRecentCall.args[0].phonegap.token
                    ).toEqual('abc123');
                    done();
                });
            });

            describe('successfully saved token', function() {
                beforeEach(function() {
                    config.global.save.andCallFake(function(data, callback) {
                        callback(null);
                    });
                });

                it('should trigger callback without an error', function(done) {
                    phonegapbuild.login(options, function(e, api) {
                        expect(e).toBeNull();
                        done();
                    });
                });

                it('should trigger callback with an api object', function(done) {
                    phonegapbuild.login(options, function(e, api) {
                        expect(api).toBeDefined();
                        done();
                    });
                });
            });

            describe('failed to save token', function() {
                beforeEach(function() {
                    config.global.save.andCallFake(function(data, callback) {
                        callback(new Error('No write permission'));
                    });
                });

                it('should trigger callback with an error', function(done) {
                    phonegapbuild.login(options, function(e, api) {
                        expect(e).toEqual(jasmine.any(Error));
                        done();
                    });
                });

                it('should trigger callback without an api object', function(done) {
                    phonegapbuild.login(options, function(e, api) {
                        expect(api).not.toBeDefined();
                        done();
                    });
                });

                it('should trigger "error" event', function(done) {
                    phonegapbuild.on('error', function(e) {
                        expect(e).toEqual(jasmine.any(Error));
                        done();
                    });
                    phonegapbuild.login(options);
                });
            });
        });

        describe('failed authentication', function() {
            beforeEach(function() {
                client.auth.andCallFake(function(options, callback) {
                    callback(new Error('account does not exist'));
                });
            });

            it('should trigger callback an error', function(done) {
                phonegapbuild.login(options, function(e, api) {
                    expect(e).toEqual(jasmine.any(Error));
                    done();
                });
            });

            it('should trigger callback without an api object', function(done) {
                phonegapbuild.login(options, function(e, api) {
                    expect(api).not.toBeDefined();
                    done();
                });
            });

            it('should trigger "error" event', function(done) {
                phonegapbuild.on('error', function(e) {
                    expect(e).toEqual(jasmine.any(Error));
                    done();
                });
                phonegapbuild.login(options);
            });
        });
    });
});
