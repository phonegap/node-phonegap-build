var CLI = require('../lib/cli'),
    cli;

describe('CLI', function() {
    beforeEach(function() {
        cli = new CLI();
    });

    describe('version', function() {
        it('should output with the format x.x.x', function() {
            spyOn(process.stdout, 'write');
            cli.version();
            expect(process.stdout.write.mostRecentCall.args[0]).toMatch(/\d+\.\d+\.\d+/);
        });
    });
});
