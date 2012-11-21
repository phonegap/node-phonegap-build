var CLI = require('../lib/cli'),
    cli;

describe('command-line create', function() {
    beforeEach(function() {
        cli = new CLI();
        spyOn(process.stdout, 'write');
    });

    describe('$ phonegap-build help', function() {
        it('outputs info on the create command', function() {
            cli.argv({ _: [ 'help' ] });
            expect(process.stdout.write.mostRecentCall.args[0])
                .toMatch(/Commands:[\w\W]*\s+create/i);
        });
    });

    describe('$ phonegap-build create', function() {
    });

    describe('$ phonegap-build create help', function() {
    });

    describe('$ phonegap-build create --help', function() {
    });

    describe('$ phonegap-build create -h', function() {
    });

    describe('$ phonegap-build create ./my-app', function() {
    });
});
