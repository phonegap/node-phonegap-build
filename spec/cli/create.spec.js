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
        it('should try to create the project', function() {
            cli.argv({ _: ['create', './my-app'] });
            expect(cli.phonegapbuild.create).toHaveBeenCalledWith(
                {
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

            it('should output a success message', function(done) {
                cli.argv({ _: ['create', './my-app'] }, function(e) {
                    expect(process.stdout.write).toHaveBeenCalled();
                    done();
                });
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

            it('should output a message about the uncreated project', function(done) {
                cli.argv({ _: ['create', './my-app'] }, function(e) {
                    expect(process.stdout.write).toHaveBeenCalled();
                    done();
                });
            });
        });
    });
});
