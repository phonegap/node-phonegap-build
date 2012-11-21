var prompt = require('prompt'),
    client = require('phonegap-build-rest'),
    CLI = require('../lib/cli'),
    cli;

describe('command-line login', function() {
    beforeEach(function() {
        cli = new CLI();
        spyOn(process.stdout, 'write');
        spyOn(prompt, 'get').andCallFake(function(obj, fn) {
            fn(null, { username: 'zelda', password: 'tr1force' });
        });
    });

    describe('$ phonegap-build login', function() {
        describe('account does not exist', function() {
            it('should prompt for username and password', function() {
                spyOn(client, 'auth').andCallFake(function(obj, fn) { fn(null, {}); });
                cli.argv({ _: [ 'login' ] });
                var args = prompt.get.mostRecentCall.args;
                expect(args[0].properties.username).toBeDefined();
                expect(args[0].properties.password).toBeDefined();
            });

            describe('login is successful', function() {
                it('should output username when account is valid ', function() {
                    spyOn(client, 'auth').andCallFake(function(obj, fn) { fn(null, {}); });
                    cli.argv({ _: [ 'login' ] });
                    expect(process.stdout.write.mostRecentCall.args[0]).toMatch('zelda');
                });
            });

            describe('login is unsuccessful', function() {
                it('should output error when account is invalid', function() {
                    spyOn(client, 'auth').andCallFake(function(obj, fn) {
                        fn(new Error('Account does not exist'));
                    });
                    cli.argv({ _: [ 'login' ] });
                    expect(process.stdout.write.mostRecentCall.args[0]).not.toMatch('zelda');
                });
            });
        });

        describe('account exists', function() {
            beforeEach(function() {
                spyOn(client, 'auth').andCallFake(function(obj, fn) {
                    fn(null, {});
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
