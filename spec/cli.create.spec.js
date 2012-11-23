var fs = require('fs'),
    shell = require('shelljs'),
    prompt = require('prompt'),
    client = require('phonegap-build-rest'),
    CLI = require('../lib/cli'),
    cli,
    stdout,
    stderr,
    apiSpy;

describe('command-line create', function() {
    beforeEach(function() {
        cli = new CLI();
        spyOn(process.stdout, 'write');
        spyOn(process.stderr, 'write');
        stdout = process.stdout.write;
        stderr = process.stderr.write;
        spyOn(cli.create, 'local');
        spyOn(cli.create, 'remote');
    });

    describe('$ phonegap-build help', function() {
        it('outputs info on the create command', function() {
            cli.argv({ _: [ 'help' ] });
            expect(process.stdout.write.mostRecentCall.args[0])
                .toMatch(/Commands:[\w\W]*\s+create/i);
        });
    });

    describe('$ phonegap-build create', function() {
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
        beforeEach(function() {
            spyOn(shell, 'mkdir');
        });

        describe('path exists', function() {
            beforeEach(function() {
                spyOn(fs, 'existsSync').andReturn(true);
                spyOn(client, 'auth');
            });

            it('should output an error', function() {
                cli.argv({ _: ['create', './my-app'] });
                expect(stderr).toHaveBeenCalled();
            });

            it('should not create the project locally', function() {
                cli.argv({ _: ['create', './my-app'] });
                expect(shell.mkdir).not.toHaveBeenCalled();
            });

            it('should not create the project remotely', function() {
                cli.argv({ _: ['create', './my-app'] });
                expect(client.auth).not.toHaveBeenCalled();
            });
        });

        describe('logged in', function() {
            it('should not prompt for username and password', function() {
                // @TODO
            });

            it('should create the project locally', function() {
                // @TODO
            });

            it('should create the project remotely', function() {
                // @TODO
            });
        });

        describe('not logged in', function() {
            beforeEach(function() {
                spyOn(fs, 'existsSync').andReturn(false);
            });

            it('should prompt for username and password', function() {
                spyOn(cli.user, 'login');
                cli.argv({ _: ['create', './my-app'] });
                expect(cli.user.login).toHaveBeenCalled();
            });

            describe('successful authentication', function() {
                beforeEach(function() {
                    spyOn(cli.user, 'login').andCallFake(function(callback) {
                        callback(null, {});
                    });
                });

                it('should create the project remotely', function() {
                    cli.argv({ _: ['create', './my-app'] });
                    expect(cli.create.remote).toHaveBeenCalled();
                });

                it('should create the project locally', function() {
                    cli.create.remote.andCallFake(function(options, callback) {
                        callback(null);
                    });
                    cli.argv({ _: ['create', './my-app'] });
                    expect(cli.create.local).toHaveBeenCalled();
                });
            });

            describe('failed authentication', function() {
                beforeEach(function() {
                    spyOn(cli.user, 'login').andCallFake(function(callback) {
                        callback(new Error('Invalid account'));
                    });
                });

                it('should output an error', function() {
                    cli.argv({ _: ['create', './my-app'] });
                    expect(stderr).toHaveBeenCalled();
                });

                it('should not create the project remotely', function() {
                    cli.argv({ _: ['create', './my-app'] });
                    expect(cli.create.remote).not.toHaveBeenCalled();
                });

                it('should not create the project locally', function() {
                    cli.create.remote.andCallFake(function(options, callback) {
                        callback(null);
                    });
                    cli.argv({ _: ['create', './my-app'] });
                    expect(cli.create.local).not.toHaveBeenCalled();
                });
            });
        });

        describe('creating remote project', function() {
            beforeEach(function() {
                apiSpy = jasmine.createSpyObj('apiSpy', [ 'post' ]);
                spyOn(cli.user, 'login').andCallFake(function(callback) {
                    callback(null, apiSpy);
                });
                cli.create.remote.andCallThrough();
                spyOn(prompt, 'get').andCallFake(function(obj, fn) {
                    fn(null, { name: 'My App' });
                });
            });

            it('should prompt for "app name"', function() {
                cli.argv({ _: ['create', './my-app'] });
                expect(prompt.get.mostRecentCall.args[0].properties.name).toBeDefined();
            });

            it('should require "app name"', function() {
                cli.argv({ _: ['create', './my-app'] });
                expect(prompt.get.mostRecentCall.args[0].properties.name.required).toBe(true);
            });

            it('should request to create the project remotely', function() {
                cli.argv({ _: ['create', './my-app'] });
                expect(apiSpy.post).toHaveBeenCalled();
            });

            describe('successful API response', function() {
                beforeEach(function() {
                    apiSpy.post.andCallFake(function(url, options, callback) {
                        callback(null, {});
                    });
                });

                it('should output info on the created remote project', function() {
                    cli.argv({ _: ['create', './my-app'] });
                    expect(stdout).toHaveBeenCalled();
                });

                it('should add remote project id to .cordova/config.json', function() {
                    // @TODO
                });
            });

            describe('unsuccessful API response', function() {
                beforeEach(function() {
                    apiSpy.post.andCallFake(function(url, options, callback) {
                        callback(new Error('Duplicate title'));
                    });
                });

                it('should output an error', function() {
                    cli.argv({ _: ['create', './my-app'] });
                    expect(stderr).toHaveBeenCalled();
                });

                it('should not create the project locally', function() {
                    expect(cli.create.local).not.toHaveBeenCalled();
                });

                it('should not create the project remotely', function() {
                    // @TODO
                });
            });
        });

        describe('creating local project', function() {
            beforeEach(function() {
                spyOn(cli.user, 'login').andCallFake(function(callback) {
                    callback(null, {});
                });
                cli.create.remote.andCallFake(function(options, callback) {
                    callback(null);
                });
                cli.create.local.andCallThrough();
                spyOn(fs, 'existsSync').andReturn(false);
            });

            it('should create the project locally', function() {
                cli.argv({ _: ['create', './my-app'] });
                expect(cli.create.local).toHaveBeenCalled();
            });

            it('should output the created project path', function() {
                cli.argv({ _: ['create', './my-app'] });
                expect(stdout.mostRecentCall.args[0]).toMatch('/my-app');
            });

            describe('file structure', function() {
                it('should have .cordova/config.json', function() {
                    // @TODO
                    // { "phonegapbuild": { "id": 10 } }
                });

                it('should have www/config.xml', function() {
                    // @TODO
                });

                it('should have www/index.html', function() {
                    // @TODO
                });
            });
        });
    });

    describe('$ phonegap-build create ./my-app --name "My App"', function() {
        describe('creating remote project', function() {
            it('should not prompt for app name', function() {
                // @TODO
            });
        });
    });

    describe('$ phonegap-build create ./my-app -n "My App"', function() {
        describe('creating remote project', function() {
            it('should not prompt for app name', function() {
                // @TODO
            });
        });
    });
});
