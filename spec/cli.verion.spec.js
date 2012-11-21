var CLI = require('../lib/cli'),
    cli;

describe('command-line version', function() {
    beforeEach(function() {
        cli = new CLI();
        spyOn(process.stdout, 'write');
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
