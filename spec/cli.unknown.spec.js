var CLI = require('../lib/cli'),
    cli;

describe('command-line unknown command', function() {
    beforeEach(function() {
        cli = new CLI();
        spyOn(process.stdout, 'write');
    });

    describe('$ phonegap-build noop', function() {
        it('should output the unknown command', function() {
            cli.argv({ _: [ 'noop' ] });
            expect(process.stdout.write.mostRecentCall.args[0]).toMatch(/unknown command:/i);
        });
    });
});
