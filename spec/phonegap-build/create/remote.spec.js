/*
 * Module dependencies.
 */

var create = require('../../../lib/phonegap-build/create/remote'),
    config = require('../../../lib/common/config'),
    zip = require('../../../lib/phonegap-build/create/zip'),
    shell = require('shelljs'),
    path = require('path'),
    fs = require('fs'),
    options;

/*
 * Remote create specification.
 */

describe('create(options, callback)', function() {
    beforeEach(function() {
        options = {
            name: 'My App',
            path: 'path/to/app.zip',
            api: {
                post: function() {
                    // spy stub
                }
            }
        };
        spyOn(options.api, 'post');
        spyOn(zip, 'compress');
        spyOn(zip, 'cleanup');
        spyOn(config.local, 'load');
        spyOn(config.local, 'save');
        spyOn(process, 'chdir');
    });

    it('should require parameter options', function() {
        expect(function() {
            options = undefined;
            create(options, function(e) {});
        }).toThrow();
    });

    it('should require parameter options.api', function() {
        expect(function() {
            options.api = undefined;
            create(options, function(e) {});
        }).toThrow();
    });

    it('should require parameter callback', function() {
        expect(function() {
            create(options);
        }).toThrow();
    });

    it('should try to zip application', function() {
        create(options, function(e) {});
        expect(zip.compress).toHaveBeenCalledWith(
            path.join(process.cwd(), 'www'),
            path.join(process.cwd(), 'build'),
            jasmine.any(Function)
        );
    });

    describe('successful zip', function() {
        beforeEach(function() {
            zip.compress.andCallFake(function(wwwPath, buildPath, callback) {
                callback(null, '/path/to/build/www.zip');
            });
        });

        it('should try to make a post request', function() {
            create(options, function(e) {});
            expect(options.api.post).toHaveBeenCalledWith(
                jasmine.any(String),
                jasmine.any(Object),
                jasmine.any(Function)
            );
        });

        describe('successful post request', function() {
            beforeEach(function() {
                options.api.post.andCallFake(function(path, headers, callback) {
                    callback(null, { id: '10' });
                });
            });

            it('should delete zip archive', function() {
                create(options, function(e) {});
                expect(zip.cleanup).toHaveBeenCalled();
            });

            it('should try to load config.json', function() {
                create(options, function(e) {});
                expect(config.local.load).toHaveBeenCalled();
            });

            describe('successful load config.json', function() {
                beforeEach(function() {
                    config.local.load.andCallFake(function(callback) {
                        callback(null, {});
                    });
                });

                it('should try to save config.json', function() {
                    create(options, function(e) {});
                    expect(config.local.save).toHaveBeenCalled();
                });

                describe('successful save config.json', function() {
                    beforeEach(function() {
                        config.local.save.andCallFake(function(data, callback) {
                            callback(null);
                        });
                    });

                    it('should trigger callback without an error', function(done) {
                        create(options, function(e) {
                            expect(e).toBeNull();
                            done();
                        });
                    });
                });

                describe('failed save config.json', function() {
                    beforeEach(function() {
                        config.local.save.andCallFake(function(data, callback) {
                            callback(new Error('could not write config.json'));
                        });
                    });

                    it('should trigger callback with an error', function(done) {
                        create(options, function(e) {
                            expect(e).toEqual(jasmine.any(Error));
                            done();
                        });
                    });
                });
            });

            describe('failed to load config.json', function() {
                beforeEach(function() {
                    config.local.load.andCallFake(function(callback) {
                        callback(new Error('could not read config.json'));
                    });
                });

                it('should not call config.save', function() {
                    create(options, function(e) {});
                    expect(config.local.save).not.toHaveBeenCalled();
                });

                it('should trigger callback with an error', function(done) {
                    create(options, function(e) {
                        expect(e).toEqual(jasmine.any(Error));
                        done();
                    });
                });
            });
        });

        describe('failed post request', function() {
            beforeEach(function() {
                options.api.post.andCallFake(function(path, headers, callback) {
                    callback(new Error('PhoneGap Build did not respond'));
                });
            });

            it('should delete zip archive', function() {
                create(options, function(e) {});
                expect(zip.cleanup).toHaveBeenCalled();
            });

            it('should trigger callback with an error', function(done) {
                create(options, function(e) {
                    expect(e).toEqual(jasmine.any(Error));
                    done();
                });
            });
        });
    });

    describe('failed zip', function() {
        beforeEach(function() {
            zip.compress.andCallFake(function(wwwPath, buildPath, callback) {
                callback(new Error('Write access denied'));
            });
        });

        it('should not make a post request', function() {
            create(options, function(e) {});
            expect(options.api.post).not.toHaveBeenCalled();
        });

        it('should trigger callback with an error', function(done) {
            create(options, function(e) {
                expect(e).toEqual(jasmine.any(Error));
                done();
            });
        });
    });
});
