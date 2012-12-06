/*
 * Module dependencies.
 */

var prompt = require('prompt'),
    CLI = require('../../lib/cli'),
    cli;

/*
 * Help command specification.
 */

describe('$ phonegap-build login', function() {
    beforeEach(function() {
        cli = new CLI();
        spyOn(process.stdout, 'write');
    });

    describe('$ phonegap-build help', function() {
        it('outputs info on the login command', function() {
            cli.argv({ _: ['help'] });
            expect(process.stdout.write.mostRecentCall.args[0])
                .toMatch(/Commands:[\w\W]*\s+login/i);
        });
    });

    describe('$ phonegap-build login', function() {
        beforeEach(function() {
            spyOn(prompt, 'get');
            spyOn(cli.phonegapbuild, 'login');
        });

        it('should prompt for username', function() {
            cli.argv({ _: ['login'] });
            expect(prompt.get).toHaveBeenCalled();
            expect(prompt.get.mostRecentCall.args[0].properties.username).toBeDefined();
            expect(prompt.get.mostRecentCall.args[0].properties.username.required).toBe(true);
        });

        it('should prompt for password', function() {
            cli.argv({ _: ['login'] });
            expect(prompt.get).toHaveBeenCalled();
            expect(prompt.get.mostRecentCall.args[0].properties.password).toBeDefined();
            expect(prompt.get.mostRecentCall.args[0].properties.password.required).toBe(true);
            expect(prompt.get.mostRecentCall.args[0].properties.password.hidden).toBe(true);
        });

        describe('successful prompt', function() {
            beforeEach(function() {
                prompt.get.andCallFake(function(obj, fn) {
                    fn(null, { username: 'zelda', password: 'tr1force' });
                });
            });

            it('should try to login', function() {
                cli.argv({ _: ['login'] });
                expect(cli.phonegapbuild.login).toHaveBeenCalledWith(
                    { username: 'zelda', password: 'tr1force' },
                    jasmine.any(Function)
                );
            });

            describe('successful login', function() {
                beforeEach(function() {
                    cli.phonegapbuild.login.andCallFake(function(argv, callback) {
                        callback(null, {});
                    });
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

        describe('failed prompt', function() {
            beforeEach(function() {
                prompt.get.andCallFake(function(obj, fn) {
                    fn(new Error('Invalid character'));
                });
            });

            it('should not try to login', function() {
                cli.argv({ _: ['login'] });
                expect(cli.phonegapbuild.login).not.toHaveBeenCalled();
            });

            it('should trigger callback with an error', function(done) {
                cli.argv({ _: ['login'] }, function(e) {
                    expect(e).toEqual(jasmine.any(Error));
                    done();
                });
            });
        });
    });

    describe('$ phonegap-build login --username zelda', function() {
        beforeEach(function() {
            spyOn(prompt, 'get');
            spyOn(cli.phonegapbuild, 'login');
        });

        it('should not prompt for username', function() {
            cli.argv({ _: ['login'], username: 'zelda' });
            expect(prompt.override.username).toEqual('zelda');
        });

        it('should prompt for password', function() {
            cli.argv({ _: ['login'], username: 'zelda' });
            expect(prompt.override.password).not.toBeDefined();
        });

        describe('successful prompt', function() {
            beforeEach(function() {
                prompt.get.andCallFake(function(obj, fn) {
                    var o = {
                        username: prompt.override.username || 'link',
                        password: prompt.override.password || 'tr1force'
                    };
                    fn(null, o);
                });
            });

            it('should try to login', function() {
                cli.argv({ _: ['login'], username: 'zelda' });
                expect(cli.phonegapbuild.login).toHaveBeenCalledWith(
                    { username: 'zelda', password: 'tr1force' },
                    jasmine.any(Function)
                );
            });
        });
    });

    describe('$ phonegap-build login -u zelda', function() {
        beforeEach(function() {
            spyOn(prompt, 'get');
            spyOn(cli.phonegapbuild, 'login');
        });

        it('should not prompt for username', function() {
            cli.argv({ _: ['login'], u: 'zelda' });
            expect(prompt.override.username).toEqual('zelda');
        });

        it('should prompt for password', function() {
            cli.argv({ _: ['login'], u: 'zelda' });
            expect(prompt.override.password).not.toBeDefined();
        });

        describe('successful prompt', function() {
            beforeEach(function() {
                prompt.get.andCallFake(function(obj, fn) {
                    var o = {
                        username: prompt.override.username || 'link',
                        password: prompt.override.password || 'tr1force'
                    };
                    fn(null, o);
                });
            });

            it('should try to login', function() {
                cli.argv({ _: ['login'], u: 'zelda' });
                expect(cli.phonegapbuild.login).toHaveBeenCalledWith(
                    { username: 'zelda', password: 'tr1force' },
                    jasmine.any(Function)
                );
            });
        });
    });

    describe('$ phonegap-build login --password tr1force', function() {
        beforeEach(function() {
            spyOn(prompt, 'get');
            spyOn(cli.phonegapbuild, 'login');
        });

        it('should prompt for username', function() {
            cli.argv({ _: ['login'], password: 'tr1force' });
            expect(prompt.override.username).not.toBeDefined();
        });

        it('should not prompt for password', function() {
            cli.argv({ _: ['login'], password: 'tr1force' });
            expect(prompt.override.password).toEqual('tr1force');
        });

        describe('successful prompt', function() {
            beforeEach(function() {
                prompt.get.andCallFake(function(obj, fn) {
                    var o = {
                        username: prompt.override.username || 'zelda',
                        password: prompt.override.password || 'hyrule'
                    };
                    fn(null, o);
                });
            });

            it('should try to login', function() {
                cli.argv({ _: ['login'], password: 'tr1force' });
                expect(cli.phonegapbuild.login).toHaveBeenCalledWith(
                    { username: 'zelda', password: 'tr1force' },
                    jasmine.any(Function)
                );
            });
        });
    });

    describe('$ phonegap-build login -p tr1force', function() {
        beforeEach(function() {
            spyOn(prompt, 'get');
            spyOn(cli.phonegapbuild, 'login');
        });

        it('should prompt for username', function() {
            cli.argv({ _: ['login'], p: 'tr1force' });
            expect(prompt.override.username).not.toBeDefined();
        });

        it('should not prompt for password', function() {
            cli.argv({ _: ['login'], p: 'tr1force' });
            expect(prompt.override.password).toEqual('tr1force');
        });

        describe('successful prompt', function() {
            beforeEach(function() {
                prompt.get.andCallFake(function(obj, fn) {
                    var o = {
                        username: prompt.override.username || 'zelda',
                        password: prompt.override.password || 'hyrule'
                    };
                    fn(null, o);
                });
            });

            it('should try to login', function() {
                cli.argv({ _: ['login'], p: 'tr1force' });
                expect(cli.phonegapbuild.login).toHaveBeenCalledWith(
                    { username: 'zelda', password: 'tr1force' },
                    jasmine.any(Function)
                );
            });
        });
    });

    describe('$ phonegap-build login --username zelda --password tr1force', function() {
        beforeEach(function() {
            spyOn(prompt, 'get');
            spyOn(cli.phonegapbuild, 'login');
        });

        it('should not prompt for username', function() {
            cli.argv({ _: ['login'], username: 'zelda', password: 'tr1force' });
            expect(prompt.override.username).toEqual('zelda');
        });

        it('should not prompt for password', function() {
            cli.argv({ _: ['login'], username: 'zelda', password: 'tr1force' });
            expect(prompt.override.password).toEqual('tr1force');
        });

        describe('successful prompt', function() {
            beforeEach(function() {
                prompt.get.andCallFake(function(obj, fn) {
                    var o = {
                        username: prompt.override.username || 'link',
                        password: prompt.override.password || 'hyrule'
                    };
                    fn(null, o);
                });
            });

            it('should try to login', function() {
                cli.argv({ _: ['login'], username: 'zelda', password: 'tr1force' });
                expect(cli.phonegapbuild.login).toHaveBeenCalledWith(
                    { username: 'zelda', password: 'tr1force' },
                    jasmine.any(Function)
                );
            });
        });
    });
});
