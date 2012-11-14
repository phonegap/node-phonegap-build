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

    describe('unknown', function() {
        it('should output the unknown command', function() {
            spyOn(process.stdout, 'write');
            cli.unknown('noop');
            expect(process.stdout.write.mostRecentCall.args[0]).toMatch(/unknown command:/i);
        });
    });

    describe('login', function() {
        describe('prompt', function() {
            describe('valid input', function() {
                beforeEach(function() {
                    spyOn(prompt, 'get').andCallFake(function(options, callback) {
                        callback(null, { username: 'zelda', password: 'tr1force' });
                    });
                });

                it('should be called when not logged in', function() {
                    spyOn(client, 'auth');
                    cli.login();
                    expect(prompt.get).toHaveBeenCalled();
                });

                it('should pass input to login', function() {
                    spyOn(client, 'auth');
                    cli.login();
                    expect(client.auth).toHaveBeenCalledWith(
                        { username: 'zelda', password: 'tr1force' },
                        jasmine.any(Function)
                    );
                });
            });

            describe('invalid input', function() {
                beforeEach(function() {
                    spyOn(prompt, 'get').andCallFake(function(options, callback) {
                        callback(new Error('cancelled'), null);
                    });
                });

                it('should halt when input is invalid', function() {
                    spyOn(client, 'auth');
                    cli.login();
                    expect(client.auth).not.toHaveBeenCalled();
                });
            });
        });
    });
});
