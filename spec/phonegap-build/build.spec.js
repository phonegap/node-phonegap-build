/*
 * Module dependencies.
 */

var build = require('../../lib/phonegap-build/build'),
    config = require('../../lib/common/config'),
    zip = require('../../lib/phonegap-build/create/zip'),
    path = require('path'),
    options;

/*
 * Specification for build.
 */

describe('build(options, callback)', function() {
    beforeEach(function() {
        options = {
            api: {
                put: function() {
                    // spy stub
                }
            },
            platforms: ['android']
        };
        spyOn(zip, 'compress');
        spyOn(zip, 'cleanup');
        spyOn(options.api, 'put');
        spyOn(config.local, 'load');
    });

    it('should require options', function() {
        expect(function() {
            options = undefined;
            build(options, function(e) {});
        }).toThrow();
    });

    it('should require options.api', function() {
        expect(function() {
            options.api = undefined;
            build(options, function(e) {});
        }).toThrow();
    });

    it('should require options.platforms', function() {
        expect(function() {
            options.platforms = undefined;
            build(options, function(e) {});
        }).toThrow();
    });

    it('should not require callback', function() {
        expect(function() {
            build(options);
        }).not.toThrow();
    });

    it('should try to zip application', function() {
        build(options, function(e) {});
        expect(zip.compress).toHaveBeenCalledWith(
            path.join(process.cwd(), 'www'),   // path to zip
            path.join(process.cwd(), 'build'), // path to write zip file
            jasmine.any(Function)
        );
    });

    describe('successful zip', function() {
        beforeEach(function() {
            zip.compress.andCallFake(function(wwwPath, buildPath, callback) {
                callback(null, '/path/to/build/www.zip');
            });

            config.local.load.andCallFake(function(callback) {
                callback(null, {
                    'phonegap-build': {
                        'id': 12345
                    }
                });
            });
        });

        it('should try to upload app to phonegap build', function() {
            build(options, function(e) {});
            expect(options.api.put).toHaveBeenCalledWith(
                '/apps/12345',
                { form: { file: '/path/to/build/www.zip' } },
                jasmine.any(Function)
            );
        });

        describe('successful upload', function() {
            beforeEach(function() {
                options.api.put.andCallFake(function(path, headers, callback) {
                    callback(null, {});
                });
            });

            it('should delete zip archive', function() {
                build(options, function(e) {});
                expect(zip.cleanup).toHaveBeenCalled();
            });

            it('should trigger callback without an error', function(done) {
                build(options, function(e) {
                    expect(e).toBeNull();
                    done();
                });
            });
        });

        describe('failed upload', function() {
            beforeEach(function() {
                options.api.put.andCallFake(function(path, headers, callback) {
                    callback(new Error('Server did not respond'));
                });
            });

            it('should delete zip archive', function() {
                build(options, function(e) {});
                expect(zip.cleanup).toHaveBeenCalled();
            });

            it('should trigger callback with an error', function(done) {
                build(options, function(e) {
                    expect(e).toEqual(jasmine.any(Error));
                    done();
                });
            });
        });
    });
});
