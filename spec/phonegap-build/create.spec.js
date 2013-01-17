/*
 * Module dependencies.
 */

var create = require('../../lib/phonegap-build/create'),
    config = require('../../lib/common/config'),
    zip = require('../../lib/phonegap-build/create/zip'),
    cordova = require('cordova'),
    path = require('path'),
    fs = require('fs'),
    options;

/*
 * Create specification.
 */

describe('create(options, callback)', function() {
    beforeEach(function() {
        options = {
            api: {},
            path: '/some/path/to/app/www',
            name: 'My App'
        };
        spyOn(create, 'remote');
        spyOn(create, 'local');
    });

    it('should require options', function() {
        expect(function() {
            options = undefined;
            create(options, function(e) {});
        }).toThrow();
    });

    it('should require options.api', function() {
        expect(function() {
            options.api = undefined;
            create(options, function(e) {});
        }).toThrow();
    });

    it('should require options.path', function() {
        expect(function() {
            options.path = undefined;
            create(options, function(e) {});
        }).toThrow();
    });

    it('should require options.name', function() {
        expect(function() {
            options.name = undefined;
            create(options, function(e) {});
        }).toThrow();
    });

    it('should not require callback', function() {
        expect(function() {
            create(options);
        }).not.toThrow();
    });

    it('should try to create local project', function() {
        create(options, function(e) {});
        expect(create.local).toHaveBeenCalledWith(
            { path: options.path },
            jasmine.any(Function)
        );
    });

    describe('successfully created local project', function() {
        beforeEach(function() {
            create.local.andCallFake(function(options, callback) {
                callback(null);
            });
        });

        it('should try to create remote project', function() {
            create(options, function(e) {});
            expect(create.remote).toHaveBeenCalledWith(
                { name: options.name, path: options.path, api: jasmine.any(Object) },
                jasmine.any(Function)
            );
        });

        describe('successfully created remote project', function() {
            beforeEach(function() {
                create.remote.andCallFake(function(options, callback) {
                    callback(null);
                });
            });

            it('should trigger called without an error', function(done) {
                create(options, function(e) {
                    expect(e).toBeNull();
                    done();
                });
            });
        });

        describe('failed to create remote project', function() {
            beforeEach(function() {
                create.remote.andCallFake(function(options, callback) {
                    callback(new Error('server did not respond'));
                });
            });

            it('should trigger called with an error', function(done) {
                create(options, function(e) {
                    expect(e).toEqual(jasmine.any(Error));
                    done();
                });
            });
        });
    });

    describe('failed to create local project', function() {
        beforeEach(function() {
            create.local.andCallFake(function(options, callback) {
                callback(new Error('app path already exists'));
            });
        });

        it('should not create remote project', function() {
            create(options, function(e) {});
            expect(create.remote).not.toHaveBeenCalled();
        });

        it('should trigger callback with an error', function(done) {
            create(options, function(e) {
                expect(e).toEqual(jasmine.any(Error));
                done();
            });
        });
    });
});

/*
 * Local create specification.
 */

describe('create.local(options, callback)', function() {
    beforeEach(function() {
        options = { path: '/some/path/to/my/app' };
        spyOn(fs, 'exists');
        spyOn(cordova, 'create');
    });

    it('should require options', function() {
        expect(function() {
            options = undefined;
            create.local(options, function(e) {});
        }).toThrow();
    });

    it('should require options.path', function() {
        expect(function() {
            options.path = undefined;
            create.local(options, function(e) {});
        }).toThrow();
    });

    it('should not require callback', function() {
        expect(function() {
            create.local(options);
        }).not.toThrow();
    });

    it('should check if path exists', function() {
        create.local(options, function(e) {});
        expect(fs.exists).toHaveBeenCalledWith(options.path, jasmine.any(Function));
    });

    describe('path is available', function() {
        beforeEach(function() {
            fs.exists.andCallFake(function(path, callback) {
                callback(false);
            });
        });

        it('should have cordova create a project', function() {
            create.local(options, function(e) {});
            expect(cordova.create).toHaveBeenCalledWith(options.path);
        });

        describe('successful create', function() {
            beforeEach(function() {
                cordova.create.andCallFake(function(path) {});
            });

            it('should trigger callback without an error', function(done) {
                create.local(options, function(e) {
                    expect(e).toBeNull();
                    done();
                });
            });
        });

        describe('failed create', function() {
            beforeEach(function() {
                cordova.create.andCallFake(function(path) {
                    throw new Error('cordova create is a sync call');
                });
            });

            it('should not throw an error', function() {
                expect(function() {
                    create.local(options, function(e) {});
                }).not.toThrow();
            });

            it('should trigger callback with an error', function(done) {
                create.local(options, function(e) {
                    expect(e).toEqual(jasmine.any(Error));
                    done();
                });
            });
        });
    });

    describe('path is not available', function() {
        beforeEach(function() {
            fs.exists.andCallFake(function(path, callback) {
                callback(true);
            });
        });

        it('should trigger callback with an error', function(done) {
            create.local(options, function(e) {
                expect(e).toEqual(jasmine.any(Error));
                done();
            });
        });
    });
});

/*
 * Remote create specification.
 */

describe('create.remote(options, callback)', function() {
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
            create.remote(options, function(e) {});
        }).toThrow();
    });

    it('should require parameter options.name', function() {
        expect(function() {
            options.name = undefined;
            create.remote(options, function(e) {});
        }).toThrow();
    });

    it('should require parameter options.path', function() {
        expect(function() {
            options.path = undefined;
            create.remote(options, function(e) {});
        }).toThrow();
    });

    it('should require parameter options.api', function() {
        expect(function() {
            options.api = undefined;
            create.remote(options, function(e) {});
        }).toThrow();
    });

    it('should require parameter callback', function() {
        expect(function() {
            create.remote(options);
        }).toThrow();
    });

    it('should try to zip application', function() {
        create.remote(options, function(e) {});
        expect(zip.compress).toHaveBeenCalledWith(
            path.join(options.path, 'www'),
            path.join(options.path, 'build'),
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
            create.remote(options, function(e) {});
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
                create.remote(options, function(e) {});
                expect(zip.cleanup).toHaveBeenCalled();
            });

            it('should try to load config.json', function() {
                create.remote(options, function(e) {});
                expect(config.local.load).toHaveBeenCalled();
            });

            describe('successful load config.json', function() {
                beforeEach(function() {
                    config.local.load.andCallFake(function(callback) {
                        callback(null, {});
                    });
                });

                it('should try to save config.json', function() {
                    create.remote(options, function(e) {});
                    expect(config.local.save).toHaveBeenCalled();
                });

                describe('successful save config.json', function() {
                    beforeEach(function() {
                        config.local.save.andCallFake(function(data, callback) {
                            callback(null);
                        });
                    });

                    it('should trigger callback without an error', function(done) {
                        create.remote(options, function(e) {
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
                        create.remote(options, function(e) {
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
                    create.remote(options, function(e) {});
                    expect(config.local.save).not.toHaveBeenCalled();
                });

                it('should trigger callback with an error', function(done) {
                    create.remote(options, function(e) {
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
                create.remote(options, function(e) {});
                expect(zip.cleanup).toHaveBeenCalled();
            });

            it('should trigger callback with an error', function(done) {
                create.remote(options, function(e) {
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
            create.remote(options, function(e) {});
            expect(options.api.post).not.toHaveBeenCalled();
        });

        it('should trigger callback with an error', function(done) {
            create.remote(options, function(e) {
                expect(e).toEqual(jasmine.any(Error));
                done();
            });
        });
    });
});
