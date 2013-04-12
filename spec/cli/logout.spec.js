/*
 * Module dependencies.
 */

var CLI = require('../../lib/cli'),
    cli;

/*
 * Logout command specification.
 */

describe('$ phonegap-build logout', function() {
    beforeEach(function() {
        cli = new CLI();
        spyOn(cli.phonegapbuild, 'logout');
        spyOn(process.stdout, 'write');
    });

    describe('$ phonegap-build help', function() {
        it('outputs info on the logout command', function() {
            cli.argv({ _: ['help'] });
            expect(process.stdout.write.mostRecentCall.args[0])
                .toMatch(/Commands:[\w\W]*\s+logout/i);
        });
    });

    describe('$ phonegap-build logout', function() {
        it('should try to logout', function() {
            cli.argv({ _: ['logout'] });
            expect(cli.phonegapbuild.logout).toHaveBeenCalled();
        });

        describe('successful logout', function() {
            beforeEach(function() {
                cli.phonegapbuild.logout.andCallFake(function(argv, callback) {
                    callback(null);
                });
            });

            it('should not return an error', function(done) {
                cli.argv({ _: ['logout'] }, function(e) {
                    expect(e).toBeNull();
                    done();
                });
            });
        });

        describe('failed logout', function() {
            beforeEach(function() {
                cli.phonegapbuild.logout.andCallFake(function(argv, callback) {
                    callback(new Error('Account does not exist.'));
                });
            });

            it('should not return an error', function(done) {
                cli.argv({ _: ['logout'] }, function(e) {
                    expect(e).not.toBeNull();
                    done();
                });
            });
        });
    });
});
