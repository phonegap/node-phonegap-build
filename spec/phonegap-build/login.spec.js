/*
 * Module dependencies.
 */

var login = require('../../lib/phonegap-build/login'),
    config = require('../../lib/phonegap-build/config'),
    client = require('phonegap-build-api'),
    options,
    config;

/*
 * Specification for login.
 */

describe('login(options, callback)', function() {
    beforeEach(function() {
        options = { username: 'zelda', password: 'tr1force' };
        spyOn(client, 'auth');
        spyOn(config, 'load');
        spyOn(config, 'save');
    });

    it('should not require callback', function() {
        expect(function() {
            login(options);
        }).not.toThrow();
    });

    it('should try to lookup token', function() {
        login(options, function(e, api) {});
        expect(config.load).toHaveBeenCalled();
    });

    describe('successful token lookup', function() {
        beforeEach(function() {
            config.load.andCallFake(function(callback) {
                callback(null, { 'email': 'zelda@hyrule.org', 'token': 'abc123' });
            });
        });

        it('should trigger callback without an error', function(done) {
            login(options, function(e, api) {
                expect(e).toBeNull();
                done();
            });
        });

        it('should trigger callback with an api object', function(done) {
            login(options, function(e, api) {
                expect(api).toBeDefined();
                done();
            });
        });
    });

    describe('failed token lookup', function() {
        beforeEach(function() {
            config.load.andCallFake(function(callback) {
                callback(new Error('config not found at ~/.phonegap-build'));
            });
        });

        it('should require option.username', function(done) {
            options.username = undefined;
            login(options, function(e, api) {
                expect(e).toBeDefined();
                expect(api).not.toBeDefined();
                done();
            });
        });

        it('should require option.password', function(done) {
            options.password = undefined;
            login(options, function(e, api) {
                expect(e).toBeDefined();
                expect(api).not.toBeDefined();
                done();
            });
        });

        it('should try to authenticate', function() {
            login(options, function() {});
            expect(client.auth).toHaveBeenCalledWith(
                options,
                jasmine.any(Function)
            );
        });

        describe('successful authentication', function() {
            beforeEach(function() {
                client.auth.andCallFake(function(options, callback) {
                    callback(null, {});
                });
            });

            it('should try to save token', function() {
                login(options, function(e, api) {});
                expect(config.save).toHaveBeenCalled();
            });

            describe('successfully saved token', function() {
                beforeEach(function() {
                    config.save.andCallFake(function(data, callback) {
                        callback(null);
                    });
                });

                it('should trigger callback without an error', function(done) {
                    login(options, function(e, api) {
                        expect(e).toBeNull();
                        done();
                    });
                });

                it('should trigger callback with an api object', function(done) {
                    login(options, function(e, api) {
                        expect(api).toBeDefined();
                        done();
                    });
                });
            });

            describe('failed to save token', function() {
                beforeEach(function() {
                    config.save.andCallFake(function(data, callback) {
                        callback(new Error('No write permission'));
                    });
                });

                it('should trigger callback with an error', function(done) {
                    login(options, function(e, api) {
                        expect(e).toBeDefined();
                        done();
                    });
                });

                it('should trigger callback without an api object', function(done) {
                    login(options, function(e, api) {
                        expect(api).not.toBeDefined();
                        done();
                    });
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
                login(options, function(e, api) {
                    expect(e).toBeDefined();
                    done();
                });
            });

            it('should trigger callback without an api object', function(done) {
                login(options, function(e, api) {
                    expect(api).not.toBeDefined();
                    done();
                });
            });
        });
    });
});
