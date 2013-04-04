/*
 * Module dependencies.
 */

var console = require('../../lib/cli/console'),
    CLI = require('../../lib/cli'),
    cli;

/*
 * Specification for login cli.
 */

describe('phonegap-build login', function() {
    beforeEach(function() {
        cli = new CLI();
        spyOn(process.stdout, 'write');
        spyOn(cli.phonegapbuild, 'login');
        spyOn(console, 'prompt');
    });

    describe('$ phonegap-build login', function() {
        it('should try to login', function() {
            cli.argv({ _: ['login'] });
            expect(cli.phonegapbuild.login).toHaveBeenCalledWith(
                jasmine.any(Object),
                jasmine.any(Function)
            );
        });

        describe('successful login', function() {
            beforeEach(function() {
                cli.phonegapbuild.login.andCallFake(function(argv, callback) {
                    cli.phonegapbuild.emit('login');
                    callback(null, {});
                });
            });

            it('should prompt for username and password', function() {
                cli.argv({ _: ['login'] });
                expect(console.prompt).toHaveBeenCalled();
            });

            it('should trigger callback without an error', function(done) {
                cli.argv({ _: ['login'] }, function(e, api) {
                    expect(e).toBeNull();
                    done();
                });
            });

            it('should trigger callback with API object', function(done) {
                cli.argv({ _: ['login'] }, function(e, api) {
                    expect(api).toBeDefined();
                    done();
                });
            });
        });

        describe('failed login', function() {
            beforeEach(function() {
                cli.phonegapbuild.login.andCallFake(function(argv, callback) {
                    callback(new Error('Invalid password'));
                });
            });

            it('should trigger callback with an error', function(done) {
                cli.argv({ _: ['login'] }, function(e, api) {
                    expect(e).toBeDefined();
                    done();
                });
            });

            it('should trigger callback without an API object', function(done) {
                cli.argv({ _: ['login'] }, function(e, api) {
                    expect(api).not.toBeDefined();
                    done();
                });
            });
        });
    });

    describe('$ phonegap-build login --username zelda', function() {
        it('should try to login', function() {
            cli.argv({ _: ['login'], username: 'zelda' });
            expect(cli.phonegapbuild.login).toHaveBeenCalledWith(
                { username: 'zelda', password: undefined },
                jasmine.any(Function)
            );
        });
    });

    describe('$ phonegap-build login -u zelda', function() {
        it('should try to login', function() {
            cli.argv({ _: ['login'], u: 'zelda' });
            expect(cli.phonegapbuild.login).toHaveBeenCalledWith(
                { username: 'zelda', password: undefined },
                jasmine.any(Function)
            );
        });
    });

    describe('$ phonegap-build login --password tr1force', function() {
        it('should try to login', function() {
            cli.argv({ _: ['login'], password: 'tr1force' });
            expect(cli.phonegapbuild.login).toHaveBeenCalledWith(
                { username: undefined, password: 'tr1force' },
                jasmine.any(Function)
            );
        });
    });

    describe('$ phonegap-build login -p tr1force', function() {
        it('should try to login', function() {
            cli.argv({ _: ['login'], p: 'tr1force' });
            expect(cli.phonegapbuild.login).toHaveBeenCalledWith(
                { username: undefined, password: 'tr1force' },
                jasmine.any(Function)
            );
        });
    });

    describe('$ phonegap-build login --username zelda --password tr1force', function() {
        it('should try to login', function() {
            cli.argv({
                _: ['login'],
                username: 'zelda',
                password: 'tr1force'
            });
            expect(cli.phonegapbuild.login).toHaveBeenCalledWith(
                { username: 'zelda', password: 'tr1force' },
                jasmine.any(Function)
            );
        });
    });

    describe('login event', function() {
        describe('no username and no password', function() {
            it('should prompt for username', function() {
                cli.phonegapbuild.emit('login', {}, function() {});
                expect(console.prompt).toHaveBeenCalled();
                expect(console.prompt.mostRecentCall.args[0].override.username).toBeUndefined();
            });

            it('should prompt for password', function() {
                cli.phonegapbuild.emit('login', {}, function() {});
                expect(console.prompt).toHaveBeenCalled();
                expect(console.prompt.mostRecentCall.args[0].override.password).toBeUndefined();
            });
        });

        describe('with username and no password', function() {
            it('should not prompt for username', function() {
                cli.phonegapbuild.emit('login', { username: 'zelda' }, function() {});
                expect(console.prompt).toHaveBeenCalled();
                expect(console.prompt.mostRecentCall.args[0].override.username).toEqual('zelda');
            });

            it('should prompt for password', function() {
                cli.phonegapbuild.emit('login', { username: 'zelda' }, function() {});
                expect(console.prompt).toHaveBeenCalled();
                expect(console.prompt.mostRecentCall.args[0].override.password).toBeUndefined();
            });
        });

        describe('no username and with password', function() {
            it('should prompt for username', function() {
                cli.phonegapbuild.emit('login', { password: 'tr1force' }, function() {});
                expect(console.prompt).toHaveBeenCalled();
                expect(console.prompt.mostRecentCall.args[0].override.username).toBeUndefined();
            });

            it('should not prompt for password', function() {
                cli.phonegapbuild.emit('login', { password: 'tr1force' }, function() {});
                expect(console.prompt).toHaveBeenCalled();
                expect(console.prompt.mostRecentCall.args[0].override.password).toEqual('tr1force');
            });
        });

        describe('with username and with password', function() {
            it('should not prompt for username', function() {
                cli.phonegapbuild.emit('login',
                    { username: 'zelda', password: 'tr1force' },
                    function() {}
                );
                expect(console.prompt).toHaveBeenCalled();
                expect(console.prompt.mostRecentCall.args[0].override.username).toEqual('zelda');
            });

            it('should not prompt for password', function() {
                cli.phonegapbuild.emit('login',
                    { username: 'zelda', password: 'tr1force' },
                    function() {}
                );
                expect(console.prompt).toHaveBeenCalled();
                expect(console.prompt.mostRecentCall.args[0].override.password).toEqual('tr1force');
            });
        });

        describe('successful prompt', function() {
            beforeEach(function() {
                console.prompt.andCallFake(function(options, callback) {
                    callback(null, { username: 'zelda', password: 'tr1force' });
                });
            });

            it('should trigger callback without an error', function(done) {
                cli.phonegapbuild.emit('login', {}, function(e, data) {
                    expect(e).toBeNull();
                    done();
                });
            });

            it('should trigger callback with username and password', function(done) {
                cli.phonegapbuild.emit('login', {}, function(e, data) {
                    expect(data).toEqual({ username: 'zelda', password: 'tr1force' });
                    done();
                });
            });
        });

        describe('failed prompt', function() {
            beforeEach(function() {
                console.prompt.andCallFake(function(options, callback) {
                    callback(new Error('prompt was cancelled'));
                });
            });

            it('should trigger callback with an error', function(done) {
                cli.phonegapbuild.emit('login', {}, function(e, data) {
                    expect(e).toEqual(jasmine.any(Error));
                    done();
                });
            });
        });
    });
});
