var build = require('../../lib/cli/remote.build.js');
var pgbuild = require('../../lib/main');
var console = require('../../lib/cli/console');
var login = require('../../lib/cli/remote.login');

describe("", function () {
    var callback = jasmine.createSpy();;

    beforeEach(function() {
        login = jasmine.createSpy('login').andCallFake(function(options, callback){
            callback(null, {});
        });
        
        spyOn(console, 'prompt').andCallFake(function(options, callback) {
            callback(null, {});
        });
   
        spyOn(pgbuild, 'build');
 
    });


    describe("pgbuild build command", function () {

        beforeEach(function () {});

        it("should call login cli module", function () {
            build({_:['build', 'android']}, function () {
                expect(login).toHaveBeenCalled();
            });
        });

        it("should call prompt module if not logged in", function () {
            build({_:['build', 'android']}, function () {
                expect(console.prompt).toHaveBeenCalled();
            });
        });

        it("should call prompt module if not logged in", function () {
            build({_:['build', 'android']}, function () {
                expect(pgbuild.build).toHaveBeenCalled();
            });
        });

    });

    describe("build with failed login", function () {
        beforeEach(function() {
            login.andCallFake(function(options, callback) {
                callback(new Error("login failue"));
            });
        });

        it("should", function () {

        }); 

    });

    describe("", function () {

    });

});
