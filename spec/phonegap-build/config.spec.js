/*
 * Module dependencies.
 */

var config = require('../../lib/phonegap-build/config'),
    path = require('path'),
    fs = require('fs');

/*
 * Specification for config.
 */

describe('config', function() {
    describe('config.path', function() {
        it('should be a valid dirname', function() {
            var dirname = path.dirname(config.path);
            expect(fs.existsSync(dirname)).toBe(true);
        });
    });

    describe('config.load(callback)', function() {
        it('should require the callback function', function() {
            expect(function() { config.load(); }).toThrow();
        });

        it('should try to find config file', function() {
            spyOn(fs, 'existsSync');
            config.load(function(e, data) {});
            expect(fs.existsSync).toHaveBeenCalled();
            expect(fs.existsSync.mostRecentCall.args[0]).toMatch(
                path.join(config.path, 'config.json')
            );
        });

        describe('successfully found config file', function() {
            beforeEach(function() {
                spyOn(fs, 'existsSync').andReturn(true);
            });

            it('should read config file', function() {
                spyOn(fs, 'readFile');
                config.load(function(e, data) {});
                expect(fs.readFile).toHaveBeenCalled();
                expect(fs.readFile.mostRecentCall.args[0]).toMatch(
                    path.join(config.path, 'config.json')
                );
            });

            describe('successfully read config file', function() {
                beforeEach(function() {
                    spyOn(fs, 'readFile').andCallFake(function(filepath, callback) {
                        callback(null, '{ "token": "abc123" }');
                    });
                });

                it('should trigger callback without an error', function(done) {
                    config.load(function(e, data) {
                        expect(e).toBeNull();
                        done();
                    });
                });

                it('should trigger callback with config file object', function(done) {
                    config.load(function(e, data) {
                        expect(data).toEqual({ token: 'abc123' });
                        done();
                    });
                });
            });

            describe('failed reading config file', function() {
                beforeEach(function() {
                    spyOn(fs, 'readFile').andCallFake(function(filepath, callback) {
                        callback(new Error('file does not exist'));
                    });
                });

                it('should trigger callback with an error', function(done) {
                    config.load(function(e, data) {
                        expect(e).toEqual(jasmine.any(Error));
                        done();
                    });
                });

                it('should trigger callback without config file object', function(done) {
                    config.load(function(e, data) {
                        expect(data).not.toBeDefined();
                        done();
                    });
                });
            });
        });

        describe('config file missing', function() {
            beforeEach(function() {
                spyOn(fs, 'existsSync').andReturn(false);
            });

            it('should try to create config file', function() {
                spyOn(fs, 'writeFile');
                config.load(function(e, data) {});
                expect(fs.writeFile).toHaveBeenCalled();
                expect(fs.writeFile.mostRecentCall.args[0]).toMatch(
                    path.join(config.path, 'config.json')
                );
            });

            describe('successfully create config file', function() {
                beforeEach(function() {
                    spyOn(fs, 'writeFile');
                    fs.writeFile.andCallFake(function(filepath, data, callback) {
                        callback(null);
                    });
                });

                it('should trigger callback without an error', function(done) {
                    config.load(function(e, data) {
                        expect(e).toBeNull();
                        done();
                    });
                });

                it('should trigger callback with config file object', function(done) {
                    config.load(function(e, data) {
                        expect(data).toEqual({});
                        done();
                    });
                });
            });

            describe('failed creating config file', function() {
                beforeEach(function() {
                    spyOn(fs, 'writeFile');
                    fs.writeFile.andCallFake(function(filepath, data, callback) {
                        callback(new Error('no write access'));
                    });
                });

                it('should trigger callback with an error', function(done) {
                    config.load(function(e, data) {
                        expect(e).toEqual(jasmine.any(Error));
                        done();
                    });
                });

                it('should trigger callback without config file object', function(done) {
                    config.load(function(e, data) {
                        expect(data).not.toBeDefined();
                        done();
                    });
                });
            });
        });
    });

    describe('config.save(data, callback)', function() {
    });
});
