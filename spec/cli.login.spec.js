var prompt = require('prompt'),
    client = require('phonegap-build-rest'),
    CLI = require('../lib/cli'),
    cli;

describe('command-line login', function() {
    beforeEach(function() {
        cli = new CLI();
        spyOn(process.stdout, 'write');
    });

    describe('$ phonegap-build login', function() {
        describe('no existing account', function() {
            describe('successful login', function() {
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

            describe('unsuccessful login', function() {
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

        describe('existing account', function() {
            beforeEach(function() {
                spyOn(client, 'auth').andCallFake(function(obj, fn) {
                    fn(null, {});
                });
                spyOn(prompt, 'get').andCallFake(function(obj, fn) {
                    fn(null, { username: 'zelda', password: 'tr1force' });
                });
                cli.argv({ _: [ 'login' ] });
            });

            it('should not prompt for username and password', function() {
                cli.argv({ _: [ 'login' ] });
                expect(prompt.get.calls.length).toEqual(1);
            });

            it('should output username', function() {
                cli.argv({ _: [ 'login' ] });
                expect(process.stdout.write.mostRecentCall.args[0]).toMatch('zelda');
            });
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
