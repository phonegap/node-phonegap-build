var fs = require('fs'),
    CLI = require('../lib/cli'),
    cli,
    stdout,
    stderr;

describe('command-line create', function() {
    beforeEach(function() {
        cli = new CLI();
        spyOn(process.stdout, 'write');
        spyOn(process.stderr, 'write');
        stdout = process.stdout.write;
        stderr = process.stderr.write;
    });

    describe('$ phonegap-build help', function() {
        it('outputs info on the create command', function() {
            cli.argv({ _: [ 'help' ] });
            expect(process.stdout.write.mostRecentCall.args[0])
                .toMatch(/Commands:[\w\W]*\s+create/i);
        });
    });

    describe('$ phonegap-build create', function() {
        // Usage: phonegap-build.js create <path> [options]
        it('should output the create help dialog', function() {
            cli.argv({ _: ['create'] });
            expect(stdout.mostRecentCall.args[0]).toMatch(/usage: [\S]+ create/i);
        });
    });

    describe('$ phonegap-build create help', function() {
        it('should output the create help dialog', function() {
            cli.argv({ _: ['create'] });
            expect(stdout.mostRecentCall.args[0]).toMatch(/usage: [\S]+ create/i);
        });
    });

    describe('$ phonegap-build create --help', function() {
        it('should output the create help dialog', function() {
            cli.argv({ _: ['create'] });
            expect(stdout.mostRecentCall.args[0]).toMatch(/usage: [\S]+ create/i);
        });
    });

    describe('$ phonegap-build create -h', function() {
        it('should output the create help dialog', function() {
            cli.argv({ _: ['create'] });
            expect(stdout.mostRecentCall.args[0]).toMatch(/usage: [\S]+ create/i);
        });
    });

    describe('$ phonegap-build create ./my-app', function() {
        describe('path exists', function() {
            it('should output an error', function() {
                spyOn(fs, 'existsSync').andReturn(true);
                cli.argv({ _: ['create', './my-app'] });
                expect(stderr).toHaveBeenCalled();
            });
        });

        describe('path does not exist', function() {
            it('should create the path', function() {
            });
        });
    });
});
