var prompt = require('prompt'),
    client = require('phonegap-build-rest'),
    shell = require('shelljs'),
    path = require('path'),
    bin = 'node ' + path.resolve(path.join(__dirname, '..', 'bin', 'phonegap-build.js')),
    CLI = require('../lib/cli'),
    cli;

describe('$', function() {
    beforeEach(function() {
        cli = new CLI();
        spyOn(process.stdout, 'write');
    });

    describe('shell delegation', function() {
        it('should support no arguments', function() {
            var process = shell.exec(bin + '', { silent: true });
            expect(process.output).toMatch('Usage:');
        });

        it('should support commands', function() {
            var process = shell.exec(bin + ' version', { silent: true });
            expect(process.output).toMatch(/^\w+\.\w+\.\w+/);
        });

        it('should support options', function() {
            var process = shell.exec(bin + ' --version', { silent: true });
            expect(process.output).toMatch(/^\w+\.\w+\.\w+/);
        });
    });

    describe('help', function() {
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

    describe('version', function() {
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

    describe('login', function() {
        describe('not logged in', function() {
            describe('$ phonegap-build login', function() {
                describe('success', function() {
                    beforeEach(function() {
                        spyOn(client, 'auth').andCallFake(function(obj, fn) {
                            fn(null, {});
                        });
                        spyOn(prompt, 'get').andCallFake(function(obj, fn) {
                            fn(null, { username: 'zelda', password: 'tr1force' });
                        });
                    });

                    it('should prompt for username and password', function() {
                        cli.argv({ _: [ 'login' ] });
                        var args = prompt.get.mostRecentCall.args;
                        expect(args[0].properties.username).toBeDefined();
                        expect(args[0].properties.password).toBeDefined();
                    });

                    it('should output username when account is valid ', function() {
                        cli.argv({ _: [ 'login' ] });
                        expect(process.stdout.write.mostRecentCall.args[0]).toMatch('zelda');
                    });
                });

                describe('error', function() {
                    beforeEach(function() {
                        spyOn(client, 'auth').andCallFake(function(obj, fn) {
                            fn(new Error('Account does not exist'));
                        });
                        spyOn(prompt, 'get').andCallFake(function(obj, fn) {
                            fn(null, { username: 'zelda', password: 'tr1force' });
                        });
                    });

                    it('should output error when account is invalid', function() {
                        cli.argv({ _: [ 'login' ] });
                        expect(process.stdout.write.mostRecentCall.args[0]).not.toMatch('zelda');
                    });
                });
            });

            describe('$ phonegap-build login --username zelda', function() {
                it('should prompt for password', function() {
                    // @TODO
                });
            });

            describe('$ phonegap-build login -u zelda', function() {
                it('should prompt for password', function() {
                    // @TODO
                });
            });
        });

        describe('logged in', function() {
            beforeEach(function() {
                spyOn(client, 'auth').andCallFake(function(obj, fn) {
                    fn(null, {});
                });
                spyOn(prompt, 'get').andCallFake(function(obj, fn) {
                    fn(null, { username: 'zelda', password: 'tr1force' });
                });
                cli.argv({ _: [ 'login' ] });
            });

            describe('$ phonegap-build login', function() {
                it('should not prompt for username and password', function() {
                    cli.argv({ _: [ 'login' ] });
                    expect(prompt.get.calls.length).toEqual(1);
                });

                it('should output username', function() {
                    cli.argv({ _: [ 'login' ] });
                    expect(process.stdout.write.mostRecentCall.args[0]).toMatch('zelda');
                });
            });

            describe('$ phonegap-build login --username zelda', function() {
                it('should prompt for password', function() {
                    // @TODO
                });

                it('should output username when account is valid ', function() {
                });

                it('should not be logged in after error', function() {
                });
            });

            describe('$ phonegap-build login -u zelda', function() {
                it('should prompt for password', function() {
                    // @TODO
                });
            });
        });
    });

    describe('unknown', function() {
        describe('$ phonegap-build noop', function() {
            it('should output the unknown command', function() {
                cli.argv({ _: [ 'noop' ] });
                expect(process.stdout.write.mostRecentCall.args[0]).toMatch(/unknown command:/i);
            });
        });
    });
});
