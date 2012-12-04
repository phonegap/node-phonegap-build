/*
 * Module dependencies.
 */

var config = require('../../lib/phonegap-build/config'),
    shell = require('shelljs'),
    path = require('path'),
    fs = require('fs'),
    data;

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
        beforeEach(function() {
            spyOn(shell, 'mkdir');
        });

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
                expect(shell.mkdir).toHaveBeenCalled();
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
        beforeEach(function() {
            spyOn(config, 'load');
            data = { token: 'abc123' };
        });

        it('should require the data parameter', function() {
            expect(function() { config.save(); }).toThrow();
        });

        it('should require the callback parameter', function() {
            expect(function() { config.save(data); }).toThrow();
        });

        it('should try to load the config file', function() {
            config.save(data, function(e) {});
            expect(config.load).toHaveBeenCalled();
        });

        describe('successful load', function() {
            beforeEach(function() {
                config.load.andCallFake(function(callback) {
                    callback(null, { token: 'abc123' });
                });
            });

            it('should try to write to config file', function() {
                spyOn(fs, 'writeFile');
                config.save({}, function(e) {});
                expect(fs.writeFile).toHaveBeenCalled();
                expect(fs.writeFile.mostRecentCall.args[0]).toEqual(
                    path.join(config.path, 'config.json')
                );
            });

            describe('successful write', function() {
                beforeEach(function() {
                    spyOn(fs, 'writeFile').andCallFake(function(filepath, data, callback) {
                        callback(null);
                    });
                });

                it('should support appending keys', function(done) {
                    config.save({ username: 'link' }, function(e) {
                        var data = JSON.parse(fs.writeFile.mostRecentCall.args[1]);
                        expect(data).toEqual({ token: 'abc123', username: 'link' });
                        done();
                    });
                });

                it('should support replacing keys', function(done) {
                    config.save({ token: 'def456' }, function(e) {
                        var data = JSON.parse(fs.writeFile.mostRecentCall.args[1]);
                        expect(data).toEqual({ token: 'def456' });
                        done();
                    });
                });

                it('should trigger callback without an error', function(done) {
                    config.save({ token: 'def456' }, function(e) {
                        expect(e).toBeNull();
                        done();
                    });
                });
            });

            describe('failed write', function() {
                beforeEach(function() {
                    spyOn(fs, 'writeFile').andCallFake(function(filepath, data, callback) {
                        callback(new Error('no write access'));
                    });
                });

                it('should trigger callback with an error', function(done) {
                    config.save({ token: 'def456' }, function(e) {
                        expect(e).toEqual(jasmine.any(Error));
                        done();
                    });
                });
            });
        });

        describe('failed load', function() {
            beforeEach(function() {
                config.load.andCallFake(function(callback) {
                    callback(new Error('no write access'));
                });
            });

            it('should trigger callback with an error', function(done) {
                config.save(data, function(e) {
                    expect(e).toEqual(jasmine.any(Error));
                    done();
                });
            });
        });
    });
});
