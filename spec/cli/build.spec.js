var pgbuild = require('../../lib/main');
var console = require('../../lib/cli/console');
var rewire = require('rewire');


var build = rewire('../../lib/cli/remote.build.js');


describe("", function () {
    var callback = jasmine.createSpy();
    var login;
    var flag;
 
    beforeEach(function() {

        loginspy = jasmine.createSpy().andCallFake(function(options, callback){
            callback(null, {});
        });
        build.__set__('login', loginspy);

        prompt = spyOn(console, 'prompt').andCallFake(function(options, callback) {
            callback(null, {});
        });
   
        spyOn(pgbuild, 'build').andCallFake(function(options, callback) {
            callback(null, {});
        });

        spyOn(pgbuild, 'login');

        flag = false;
    });


    describe("pgbuild build command", function () {

        it("should call login cli module", function () {
            runs(function(){
                build({_:['build', 'android']}, function () {
                    flag = true;
                });
            });

            waitsFor(function(){
                return flag;
            }, "", 5000);

            runs(function(){
                expect(loginspy).toHaveBeenCalled();
            });
        });

        it("should call prompt module if not logged in", function () {
            runs(function(){
                build({_:['build', 'android']}, function () {
                    flag = true;
                });
            });

             waitsFor(function(){
                return flag;
            }, "", 5000);

            runs(function(){
                expect(console.prompt).not.toHaveBeenCalled();
            });
            
        });

        it("should call main build", function () {
            runs(function () {
                build({_:['build', 'android']}, function () {
                    flag = true;
                });
            });

            waitsFor(function() {
                return flag;
            }, "", 5000);

            runs(function() {
                expect(flag).toBe(true);
                expect(pgbuild.build).toHaveBeenCalled();
            });
        });
    });


    describe("if not logged in", function () {
        var flag;

        beforeEach(function() {
            var flag = false;

            build.__get__('login').reset();
            
            loginspy = jasmine.createSpy().andCallFake(function(options, callback) {
                callback(new Error("login failure"));
            });

            build.__set__('login', loginspy);
        });


        it("should prompt for login", function () {
            runs(function(){
                 build({_:['build', 'android']}, function (error, result) {
                    flag = true;                          
                });
            });

            waitsFor(function(){
                return flag
            }, "", 5000);

            runs(function (){
                expect(prompt).toHaveBeenCalled();
                expect(prompt.callCount).toEqual(1);
            });
        });


        it("should execute build when successfully logged in after prompt", function () {
            runs(function(){
                build({_:['build', 'android']}, function (error, result) {
                    flag = true;                          
                });
            });

            waitsFor(function(){
                return flag;
            }, "callback to be executed", 5000);

            runs(function(){
                expect(loginspy).toHaveBeenCalled();
                expect(loginspy.callCount).toEqual(2);
            });
       });
    });
});
