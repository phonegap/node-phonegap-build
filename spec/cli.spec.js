var prompt = require('prompt'),
    client = require('phonegap-build-rest'),
    CLI = require('../lib/cli'),
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

    describe('help', function() {
        it('should output the usage information', function() {
            spyOn(process.stdout, 'write');
            cli.help();
            expect(process.stdout.write.mostRecentCall.args[0]).toMatch(/usage:/i);
        });
    });

    describe('login', function() {
        beforeEach(function() {
            spyOn(prompt, 'get').andCallFake(function(options, callback) {
                callback(null, { username: 'zelda', password: 'tr1force' });
            });
        });

        describe('prompt', function() {
            it('should be called when not logged in', function() {
                spyOn(client, 'auth');
                cli.login();
                expect(prompt.get).toHaveBeenCalled();
            });

            it('should pass information to login', function() {
                spyOn(client, 'auth');
                cli.login();
                expect(client.auth).toHaveBeenCalledWith(
                    { username: 'zelda', password: 'tr1force' },
                    jasmine.any(Function)
                );
            });
        });
    });
});
