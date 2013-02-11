/*
 * Module dependencies.
 */

var prompt = require('prompt'),
    CLI = require('../../lib/cli'),
    cli;

/*
 * Create command specification.
 */

describe('$ phonegap-build create <path>', function() {
    beforeEach(function() {
        cli = new CLI();
        spyOn(process.stdout, 'write');
        spyOn(prompt, 'get');
        spyOn(cli.phonegapbuild, 'create');
    });

    describe('$ phonegap-build help', function() {
        it('outputs info on the create command', function() {
            cli.argv({ _: ['help'] });
            expect(process.stdout.write.mostRecentCall.args[0])
                .toMatch(/Commands:[\w\W]*\s+create/i);
        });
    });

    describe('$ phonegap-build create ./my-app', function() {
        it('should try to login', function() {
            spyOn(cli, 'login');
            cli.argv({ _: ['create', './my-app'] });
            expect(cli.login).toHaveBeenCalled();
        });

        describe('successful login', function() {
            beforeEach(function() {
                spyOn(cli, 'login').andCallFake(function(argv, callback) {
                    callback(null, {});
                });
            });

            it('should try to create the project', function() {
                cli.argv({ _: ['create', './my-app'] });
                expect(cli.phonegapbuild.create).toHaveBeenCalledWith(
                    {
                        api: jasmine.any(Object),
                        path: jasmine.any(String)
                    },
                    jasmine.any(Function)
                );
            });

            describe('successful project creation', function() {
                beforeEach(function() {
                    cli.phonegapbuild.create.andCallFake(function(opts, callback) {
                        callback(null);
                    });
                });

                it('should call callback without an error', function(done) {
                    cli.argv({ _: ['create', './my-app'] }, function(e) {
                        expect(e).toBeNull();
                        done();
                    });
                });

                it('should output a message about the created project', function() {
                    // @TODO
                });
            });

            describe('failed project creation', function() {
                beforeEach(function() {
                    cli.phonegapbuild.create.andCallFake(function(opts, callback) {
                        callback(new Error('Directory already exists'));
                    });
                });

                it('should call callback with an error', function(done) {
                    cli.argv({ _: ['create', './my-app'] }, function(e) {
                        expect(e).toEqual(jasmine.any(Error));
                        done();
                    });
                });

                it('should output a message about the uncreated project', function() {
                    // @TODO
                });
            });
        });

        describe('failed login', function() {
            beforeEach(function() {
                spyOn(cli, 'login').andCallFake(function(argv, callback) {
                    callback(new Error('Invalid account'));
                });
            });

            it('should not create the project', function() {
                cli.argv({ _: ['create', './my-app'] });
                expect(cli.phonegapbuild.create).not.toHaveBeenCalled();
            });

            it('should call callback with an error', function(done) {
                cli.argv({ _: ['create', './my-app'] }, function(e) {
                    expect(e).not.toBeNull();
                    done();
                });
            });
        });
    });
});
