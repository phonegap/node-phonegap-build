var CLI = require('../lib/cli'),
    cli;

describe('command-line help', function() {
    beforeEach(function() {
        cli = new CLI();
        spyOn(process.stdout, 'write');
    });

    describe('$ phonegap-build', function() {
        it('should output the usage information', function() {
            cli.argv({ _: [] });
            expect(process.stdout.write.mostRecentCall.args[0]).toMatch(/usage:/i);
        });
    });

    describe('$ phonegap-build help', function() {
        it('should output the usage information', function() {
            cli.argv({ _: [ 'help' ] });
            expect(process.stdout.write.mostRecentCall.args[0]).toMatch(/usage:/i);
        });
    });

    describe('$ phonegap-build --help', function() {
        it('should output the usage information', function() {
            cli.argv({ _: [], help: true });
            expect(process.stdout.write.mostRecentCall.args[0]).toMatch(/usage:/i);
        });
    });

    describe('$ phonegap-build -h', function() {
        it('should output the usage information', function() {
            cli.argv({ _: [], h: true });
            expect(process.stdout.write.mostRecentCall.args[0]).toMatch(/usage:/i);
        });
    });
});
