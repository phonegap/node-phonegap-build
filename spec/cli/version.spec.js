/*
 * Module dependencies.
 */

var CLI = require('../../lib/cli'),
    cli;

/*
 * Version command specification.
 */

describe('$ phonegap-build --version', function() {
    beforeEach(function() {
        cli = new CLI();
        spyOn(process.stdout, 'write');
    });

    describe('$ phonegap-build help', function() {
        it('outputs info on the version command', function() {
            cli.argv({ _: ['help'] });
            expect(process.stdout.write.mostRecentCall.args[0])
                .toMatch(/Commands:[\w\W]*\s+version/i);
        });
    });

    describe('$ phonegap-build version', function() {
        it('should output with the format x.x.x', function() {
            cli.argv({ _: ['version'] });
            expect(process.stdout.write.mostRecentCall.args[0]).toMatch(/\d+\.\d+\.\d+/);
        });
    });

    describe('$ phonegap-build --version', function() {
        it('should output with the format x.x.x', function() {
            cli.argv({ _: [], version: true });
            expect(process.stdout.write.mostRecentCall.args[0]).toMatch(/\d+\.\d+\.\d+/);
        });
    });

    describe('$ phonegap-build -v', function() {
        it('should output with the format x.x.x', function() {
            cli.argv({ _: [], v: true });
            expect(process.stdout.write.mostRecentCall.args[0]).toMatch(/\d+\.\d+\.\d+/);
        });
    });
});
