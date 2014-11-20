var pgbuild = require('../../lib/main');
var console = require('../../lib/cli/console');
var rewire = require('rewire');


var build = rewire('../../lib/cli/remote.build.js');


describe("", function () {
    var callback = jasmine.createSpy();
    var login;
 
    beforeEach(function() {

        loginspy = jasmine.createSpy().andCallFake(function(options, callback){
            callback(null, {});
        });
        build.__set__('login', loginspy);

        spyOn(console, 'prompt').andCallFake(function(options, callback) {
            callback(null, {});
        });
   
        spyOn(pgbuild, 'build');

        spyOn(pgbuild, 'login');
    });


    describe("pgbuild build command", function () {
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

        it("should call main build", function () {
            build({_:['build', 'android']}, function () {
                expect(pgbuild.build).toHaveBeenCalled();
            });
        });
    });

    describe("build with failed login", function () {
        beforeEach(function() {
            loginspy = jasmine.createSpy().andCallFake(function(options, callback) {
                callback(new Error("login failue"));
            });
            build.__set__('login', loginspy);
        });

        it("should", function () {

            build({_:['build', 'android']}, function (error, result) {
                expect(login).toHaveBeenCalled();
            });

        }); 
*/
    });

    describe("", function () {

    });

});
