var prompt = require('prompt'),
    CLI = require('../lib/cli'),
    cli;

describe('$ phonegap-build create <path>', function() {
    beforeEach(function() {
        cli = new CLI();
        spyOn(prompt, 'get');
    });

    describe('$ phonegap-build create ./my-app', function() {
        it('should try to login', function() {
            spyOn(cli, 'login');
            cli.argv({ _: ['create', './my-app'] });
            expect(cli.login).toHaveBeenCalled();
        });

        describe('successful login', function() {
            beforeEach(function() {
                spyOn(cli, 'login').andCallFake(function(argv, callback) {
                    callback(null, {});
                });
            });

            it('should prompt for an app name', function() {
                cli.argv({ _: ['create', './my-app'] });
                expect(prompt.get).toHaveBeenCalled();
                expect(prompt.get.mostRecentCall.args[0].properties.name).toBeDefined();
                expect(prompt.get.mostRecentCall.args[0].properties.name.required).toBe(true);
            });

            describe('successful prompt', function() {
                beforeEach(function() {
                    prompt.get.andCallFake(function(data, callback) {
                        callback(null, { _: ['create', './my-app'], name: 'My App' });
                    });
                });

                it('should try to create the project', function() {
                    spyOn(cli.phonegapbuild, 'create');
                    cli.argv({ _: ['create', './my-app'] });
                    expect(cli.phonegapbuild.create).toHaveBeenCalledWith(
                        {
                            api: jasmine.any(Object),
                            path: jasmine.any(String),
                            name: jasmine.any(String)
                        },
                        jasmine.any(Function)
                    );
                });

                describe('successful project creation', function() {
                    beforeEach(function() {
                        spyOn(cli.phonegapbuild, 'create').andCallFake(function(opts, callback) {
                            callback(null);
                        });
                    });

                    it('should call callback without an error', function(done) {
                        cli.argv({ _: ['create', './my-app'] }, function(e) {
                            expect(e).toBeNull();
                            done();
                        });
                    });

                    it('should output a message about the created project', function() {
                        // @TODO
                    });
                });

                describe('failed project creation', function() {
                    beforeEach(function() {
                        spyOn(cli.phonegapbuild, 'create').andCallFake(function(opts, callback) {
                            callback(new Error('Directory already exists'));
                        });
                    });

                    it('should call callback with an error', function(done) {
                        cli.argv({ _: ['create', './my-app'] }, function(e) {
                            expect(e).not.toBeNull();
                            done();
                        });
                    });

                    it('should output a message about the created project', function() {
                        // @TODO
                    });
                });
            });

            describe('failed prompt', function() {
                beforeEach(function() {
                    prompt.get.andCallFake(function(data, callback) {
                        callback(new Error('Invalid character'));
                    });
                });

                it('should not try to create the project', function() {
                    spyOn(cli.phonegapbuild, 'create');
                    cli.argv({ _: ['create', './my-app'] });
                    expect(cli.phonegapbuild.create).not.toHaveBeenCalled();
                });

                it('should call callback with an error', function(done) {
                    cli.argv({ _: ['create', './my-app'] }, function(e) {
                        expect(e).not.toBeNull();
                        done();
                    });
                });
            });
        });

        describe('failed login', function() {
            beforeEach(function() {
                spyOn(cli, 'login').andCallFake(function(argv, callback) {
                    callback(new Error('Invalid account'));
                });
            });

            it('should not create the project', function() {
                spyOn(cli.phonegapbuild, 'create');
                cli.argv({ _: ['create', './my-app'] });
                expect(cli.phonegapbuild.create).not.toHaveBeenCalled();
            });

            it('should call callback with an error', function(done) {
                cli.argv({ _: ['create', './my-app'] }, function(e) {
                    expect(e).not.toBeNull();
                    done();
                });
            });
        });
    });
});
