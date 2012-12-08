/*
 * Module dependencies.
 */

var create = require('../../lib/phonegap-build/create'),
    shell = require('shelljs'),
    path = require('path'),
    fs = require('fs'),
    options;

/*
 * Specification for create.
 */

describe('create(options, callback)', function() {
    beforeEach(function() {
        options = {
            api: {},
            path: '/some/path/to/my/app',
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
                { name: options.name, api: jasmine.any(Object) },
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
 * Specification for local create.
 */

describe('create.local(options, callback)', function() {
    beforeEach(function() {
        options = { path: '/some/path/to/my/app' };
        spyOn(fs, 'exists');
        spyOn(shell, 'cp');
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

        it('should use a valid project template path', function() {
            console.log(create.local.templatePath);
            expect(fs.existsSync(create.local.templatePath)).toBe(true);
        });

        it('should create project in path', function() {
            create.local(options, function(e) {});
            expect(shell.cp).toHaveBeenCalledWith(
                '-R',
                create.local.templatePath,
                options.path
            );
        });

        it('should trigger callback without an error', function(done) {
            create.local(options, function(e) {
                expect(e).toBeNull();
                done();
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
