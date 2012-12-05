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
        it('should require the callback function', function() {
            expect(function() { config.load(); }).toThrow();
        });

        it('should try to find config file', function() {
            spyOn(fs, 'exists');
            config.load(function(e, data) {});
            expect(fs.exists).toHaveBeenCalled();
            expect(fs.exists.mostRecentCall.args[0]).toMatch(
                path.join(config.path, 'config.json')
            );
        });

        describe('successfully found config file', function() {
            beforeEach(function() {
                spyOn(fs, 'exists').andCallFake(function(filepath, callback) {
                    callback(true);
                });
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
                spyOn(fs, 'exists').andCallFake(function(filepath, callback) {
                    callback(false);
                });
            });

            it('should try to save a config file', function() {
                spyOn(config, 'save');
                config.load(function(e, data) {});
                expect(config.save).toHaveBeenCalled();
            });

            describe('successfully save config file', function() {
                beforeEach(function() {
                    spyOn(config, 'save').andCallFake(function(data, callback) {
                        callback(null);
                    });
                });

                it('should save an empty object', function() {
                    config.load(function(e, data) {});
                    expect(config.save.mostRecentCall.args[0]).toEqual({});
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

            describe('failed to save config file', function() {
                beforeEach(function() {
                    spyOn(config, 'save').andCallFake(function(data, callback) {
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
            data = { token: 'abc123' };
            spyOn(shell, 'mkdir');
            spyOn(fs, 'writeFile');
        });

        it('should require the data parameter', function() {
            expect(function() { config.save(); }).toThrow();
        });

        it('should require the callback parameter', function() {
            expect(function() { config.save(data); }).toThrow();
        });

        it('should recursively create directories', function() {
            config.save(data, function(e) {});
            expect(shell.mkdir).toHaveBeenCalled();
            expect(shell.mkdir.mostRecentCall.args[0]).toEqual('-p');
        });

        it('should try to write', function() {
            config.save(data, function(e) {});
            expect(fs.writeFile).toHaveBeenCalled();
            expect(fs.writeFile.mostRecentCall.args[0]).toEqual(
                path.join(config.path, 'config.json')
            );
        });

        describe('successful write', function() {
            beforeEach(function() {
                fs.writeFile.andCallFake(function(filepath, data, callback) {
                    callback(null);
                });
            });

            it('should write to the config file', function() {
                config.save(data, function(e) {});
                expect(fs.writeFile.mostRecentCall.args[0]).toEqual(
                    path.join(config.path, 'config.json')
                );
            });

            it('should write the json data', function(done) {
                config.save({ token: 'def456', username: 'link' }, function(e) {
                    var data = JSON.parse(fs.writeFile.mostRecentCall.args[1]);
                    expect(data).toEqual({ token: 'def456', username: 'link' });
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
                fs.writeFile.andCallFake(function(filepath, data, callback) {
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
});
