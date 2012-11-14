var prompt = require('prompt'),
    client = require('phonegap-build-rest'),
    CLI = require('../lib/cli'),
    cli,
    spy;

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
        it('should be a function', function() {
            expect(cli.login).toEqual(jasmine.any(Function));
        });

        describe('defaults', function() {
            beforeEach(function() {
                spy = spyOn(prompt, 'get');
            });

            it('should be a function', function() {
                expect(cli.login.defaults).toEqual(jasmine.any(Function));
            });

            it('should prompt for username and password', function() {
                cli.login.defaults(function(){});
                expect(prompt.get).toHaveBeenCalled();
            });

            it('should return username and password with callback', function(done) {
                spy.andCallFake(function(properties, callback) {
                    callback(null, { username: 'zelda', password: 'tr1force' });
                });
                cli.login.defaults(function(result) {
                    expect(result).toEqual({ username: 'zelda', password: 'tr1force' });
                    done();
                });
            });

            it('should default username to an empty string', function(done) {
                spy.andCallFake(function(properties, callback) {
                    callback(new Error('oops!'), { password: 'tr1force' });
                });
                cli.login.defaults(function(result) {
                    expect(result).toEqual({ username: '', password: 'tr1force' });
                    done();
                });
            });

            it('should default password to an empty string', function(done) {
                spy.andCallFake(function(properties, callback) {
                    callback(new Error('oops!'), { username: 'zelda' });
                });
                cli.login.defaults(function(result) {
                    expect(result).toEqual({ username: 'zelda', password: '' });
                    done();
                });
            });
        });
    });
});
