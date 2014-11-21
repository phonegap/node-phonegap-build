var pgbuild = require('../../lib/main');
var console = require('../../lib/cli/console');
var rewire = require('rewire');


var login = rewire('../../lib/cli/login.js');


describe("CLI Login Spec", function () {
    var cb;
    var flag;
 
    beforeEach(function() {

        prompt = spyOn(console, 'prompt').andCallFake(function(options, callback) {
            callback(null, {});
        });
   
        buildlogin = spyOn(pgbuild, 'login').andCallFake(function(data, callback) {
            callback(null, {});
        });

        cb = jasmine.createSpy().andCallFake(function (data, callback) {
            flag = true;
        }); 

        flag = false;
    });


    it("should call main login module", function () {
        runs(function(){
            login({}, function (data, callback) {
                flag = true;
            });   
        });

        waitsFor(function(){
            return flag;
        }, "callback", 5000);

        runs(function(){
            expect(buildlogin).toHaveBeenCalled();
            expect(buildlogin.callCount).toBe(1);
        });
    });


    it("should execute the provided callback with data from pgbuild login", function () {
        runs(function() {
            login({}, cb);
        });

        waitsFor(function(){
            return flag;
        }, "callback", 5000);

        runs(function(){
            expect(cb).toHaveBeenCalled();
            expect(cb.callCount).toBe(1);
            expect(cb).toHaveBeenCalledWith(null, {});
        });
    });


});
