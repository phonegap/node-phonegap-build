var fs = require('fs'),
    shell = require('shelljs'),
    prompt = require('prompt'),
    client = require('phonegap-build-rest'),
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
                cli.argv({ _: ['create', './my-app'] });
            });

            it('should output an error', function() {
                expect(stderr).toHaveBeenCalled();
            });

            it('should not create the project locally', function() {
                expect(shell.mkdir).not.toHaveBeenCalled();
            });

            it('should not create the project remotely', function() {
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
                spyOn(prompt, 'get');
            });

            it('should prompt for username and password', function() {
                spyOn(cli.user, 'login');
                cli.argv({ _: ['create', './my-app'] });
                expect(cli.user.login).toHaveBeenCalled();
            });

            describe('successful authentication', function() {
                it('should output the username', function() {
                    // @TODO
                });

                it('should create the project locally', function() {
                    // @TODO
                });

                it('should create the project remotely', function() {
                    // @TODO
                });
            });

            describe('failed authentication', function() {
                it('should output an error', function() {
                    // @TODO
                });

                it('should not create the project locally', function() {
                    //expect(shell.mkdir).not.toHaveBeenCalled();
                });

                it('should not create the project remotely', function() {
                    // @TODO
                });
            });
        });

        describe('creating remote project', function() {
            beforeEach(function() {
                spyOn(prompt, 'get').andCallFake(function(obj, fn) {
                    fn(null, { name: 'My App' });
                });
                spyOn(fs, 'existsSync').andReturn(false);
                cli.argv({ _: ['create', './my-app'] });
            });

            it('should prompt for "app name"', function() {
                expect(prompt.get.mostRecentCall.args[0].properties.name).toBeDefined();
            });

            it('should require "app name"', function() {
                expect(prompt.get.mostRecentCall.args[0].properties.name.required).toBe(true);
            });

            it('should request to create the project remotely', function() {
                // @TODO
            });

            describe('successful API response', function() {
                it('should output info on the created remote project', function() {
                    // @TODO
                });

                it('should add remote project id to .cordova/config.json', function() {
                    // @TODO
                });
            });

            describe('unsuccessful API response', function() {
                it('should output an error', function() {
                    // @TODO
                });

                it('should not create the project locally', function() {
                    // @TODO
                });

                it('should not create the project remotely', function() {
                    // @TODO
                });
            });
        });

        describe('creating local project', function() {
            beforeEach(function() {
                spyOn(prompt, 'get').andCallFake(function(obj, fn) {
                    fn(null, { name: 'My App' });
                });
                spyOn(fs, 'existsSync').andReturn(false);
                cli.argv({ _: ['create', './my-app'] });
            });

            it('should create the project locally', function() {
                expect(shell.mkdir).toHaveBeenCalled();
            });

            it('should output the created project path', function() {
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
