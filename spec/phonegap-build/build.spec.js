/*
 * Module dependencies.
 */

var PhoneGapBuild = require('../../lib/phonegap-build'),
    config = require('../../lib/common/config'),
    phonegapbuild,
    appData,
    options;

/*
 * Specification: phonegapbuild.build(options, [callback])
 */

describe('phonegapbuild.build(options, [callback])', function() {
    beforeEach(function() {
        phonegapbuild = new PhoneGapBuild();
        options = {
            api: {
            },
            platforms: ['android']
        };
        appData = {
            id: '1234',
            title: 'My App',
            download: {
                android: '/api/v1/apps/322388/android'
            }
        };
        spyOn(phonegapbuild.build, 'create');
        spyOn(phonegapbuild.build, 'build');
        spyOn(config.local, 'load');
    });

    it('should require options', function() {
        expect(function() {
            options = undefined;
            phonegapbuild.build(options, function(e, data) {});
        }).toThrow();
    });

    it('should require options.api', function() {
        expect(function() {
            options.api = undefined;
            phonegapbuild.build(options, function(e, data) {});
        }).toThrow();
    });

    it('should require options.platforms', function() {
        expect(function() {
            options.platforms = undefined;
            phonegapbuild.build(options, function(e, data) {});
        }).toThrow();
    });

    it('should not require callback', function() {
        expect(function() {
            phonegapbuild.build(options);
        }).not.toThrow();
    });

    describe('when app exists', function() {
        beforeEach(function() {
            config.local.load.andCallFake(function(callback) {
                callback(null, { 'phonegap': { 'id': 12345 } });
            });
        });

        it('should try to build the app', function(done) {
            phonegapbuild.build(options, function(e, data) {});
            process.nextTick(function() {
                expect(phonegapbuild.build.build).toHaveBeenCalled();
                done();
            });
        });

        describe('successfully built app', function() {
            beforeEach(function() {
                phonegapbuild.build.build.andCallFake(function(options, callback) {
                    callback(null, appData);
                });
            });

            it('should trigger callback without an error', function(done) {
                phonegapbuild.build(options, function(e, data) {
                    expect(e).toBeNull();
                    done();
                });
            });

            it('should trigger callback with data', function(done) {
                phonegapbuild.build(options, function(e, data) {
                    expect(data).toEqual(appData);
                    done();
                });
            });

            it('should trigger "complete" event', function(done) {
                var b = phonegapbuild.build(options);
                b.on('complete', function(data) {
                    expect(data).toEqual(jasmine.any(Object));
                    done();
                });
            });
        });

        describe('failed to build app', function() {
            beforeEach(function() {
                phonegapbuild.build.build.andCallFake(function(options, callback) {
                    callback(new Error('Server did not respond'));
                });
            });

            it('should trigger callback with an error', function(done) {
                phonegapbuild.build(options, function(e, data) {
                    expect(e).toEqual(jasmine.any(Error));
                    done();
                });
            });

            it('should trigger "error" event', function(done) {
                var b = phonegapbuild.build(options);
                b.on('error', function(e, data) {
                    expect(e).toEqual(jasmine.any(Error));
                    done();
                });
            });
        });
    });

    describe('when app does not exist', function() {
        beforeEach(function() {
            config.local.load.andCallFake(function(callback) {
                callback(null, {});
            });
        });

        it('should try to create the app', function(done) {
            phonegapbuild.build(options, function(e, data) {});
            process.nextTick(function() {
                expect(phonegapbuild.build.create).toHaveBeenCalled();
                done();
            });
        });

        describe('successfully created app', function() {
            beforeEach(function() {
                phonegapbuild.build.create.andCallFake(function(options, callback) {
                    callback(null, appData);
                });
            });

            it('should trigger callback without an error', function(done) {
                phonegapbuild.build(options, function(e, data) {
                    expect(e).toBeNull();
                    done();
                });
            });

            it('should trigger callback with data', function(done) {
                phonegapbuild.build(options, function(e, data) {
                    expect(data).toEqual(appData);
                    done();
                });
            });

            it('should trigger "complete" event', function(done) {
                var b = phonegapbuild.build(options);
                b.on('complete', function(data) {
                    expect(data).toEqual(jasmine.any(Object));
                    done();
                });
            });
        });

        describe('failed to create app', function() {
            beforeEach(function() {
                phonegapbuild.build.create.andCallFake(function(options, callback) {
                    callback(new Error('Server did not respond'));
                });
            });

            it('should trigger callback with an error', function(done) {
                phonegapbuild.build(options, function(e, data) {
                    expect(e).toEqual(jasmine.any(Error));
                    done();
                });
            });

            it('should trigger "error" event', function(done) {
                var b = phonegapbuild.build(options);
                b.on('error', function(e) {
                    expect(e).toEqual(jasmine.any(Error));
                    done();
                });
            });
        });
    });
});
