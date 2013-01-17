/*
 * Module dependencies.
 */

var CLI = require('../../lib/cli'),
    cli;

/*
 * Command specification for build.
 */

describe('$ phonegap-build build <platform>', function() {
    beforeEach(function() {
        cli = new CLI();
        spyOn(process.stdout, 'write');
        spyOn(cli.phonegapbuild, 'build');
    });

    describe('$ phonegap-build help', function() {
        it('outputs info on the build command', function() {
            cli.argv({ _: ['help'] });
            expect(process.stdout.write.mostRecentCall.args[0])
                .toMatch(/Commands:[\w\W]*\s+build/i);
        });
    });

    describe('$ phonegap-build build', function() {
        it('outputs info on the build command', function() {
            spyOn(cli.help, 'build');
            cli.argv({ _: ['build'] });
            expect(cli.help.build).toHaveBeenCalled();
        });
    });

    describe('$ phonegap-build build android', function() {
        it('should try to login', function() {
            spyOn(cli, 'login');
            cli.argv({ _: ['build', 'android'] });
            expect(cli.login).toHaveBeenCalled();
        });

        describe('successful login', function() {
            beforeEach(function() {
                spyOn(cli, 'login').andCallFake(function(argv, callback) {
                    callback(null, {});
                });
            });

            it('should try to build the project', function() {
                cli.argv({ _: ['build', 'android'] });
                expect(cli.phonegapbuild.build).toHaveBeenCalledWith(
                    {
                        api: jasmine.any(Object),
                        platforms: ['android']
                    },
                    jasmine.any(Function)
                );
            });

            describe('successful project build', function() {
                beforeEach(function() {
                    cli.phonegapbuild.build.andCallFake(function(opts, callback) {
                        callback(null);
                    });
                });

                it('should call callback without an error', function(done) {
                    cli.argv({ _: ['build', 'android'] }, function(e) {
                        expect(e).toBeNull();
                        done();
                    });
                });
            });

            describe('failed project build', function() {
                beforeEach(function() {
                    cli.phonegapbuild.build.andCallFake(function(opts, callback) {
                        callback(new Error('Could not connect to PhoneGap Build.'));
                    });
                });

                it('should call callback with an error', function(done) {
                    cli.argv({ _: ['build', 'android'] }, function(e) {
                        expect(e).toEqual(jasmine.any(Error));
                        done();
                    });
                });
            });
        });

        describe('failed login', function() {
            beforeEach(function() {
                spyOn(cli, 'login').andCallFake(function(argv, callback) {
                    callback(new Error('Invalid account'));
                });
            });

            it('should not build the project', function() {
                cli.argv({ _: ['build', 'android'] });
                expect(cli.phonegapbuild.build).not.toHaveBeenCalled();
            });

            it('should call callback with an error', function(done) {
                cli.argv({ _: ['build', 'android'] }, function(e) {
                    expect(e).toEqual(jasmine.any(Error));
                    done();
                });
            });
        });
    });
});
