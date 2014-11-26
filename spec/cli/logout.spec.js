var pgbuild = require('../../lib/main');
var rewire = require('rewire');


var logout = require('../../lib/cli/logout.js');


describe("CLI Logout Spec", function () {
    var callback;
    var flag = null;

    beforeEach(function() {
        callback = createSpy();
        spyOn(pgbuild, 'logout').andCallFake(function(options, callback){
            callback(flag);
        });
        logout(callback);
    });


    it("should export a function", function () {
        expect(logout).toEqual(jasmine.any(Function));
    });  

    it("should call core logout function", function () {
        expect(pgbuild.logout).toHaveBeenCalled();
    });

    it("should execute the callback with the received error value", function () {
        expect(callback).toHaveBeenCalled();
        expect(callback).toHaveBeenCalledWith(flag);
    });

});
