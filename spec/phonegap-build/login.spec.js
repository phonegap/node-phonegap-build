
        //describe('not currently logged into an account', function() {
        //    it('should prompt for username and password', function() {
        //        spyOn(client, 'auth').andCallFake(function(obj, fn) { fn(null, {}); });
        //        cli.argv({ _: [ 'login' ] });
        //        var args = prompt.get.mostRecentCall.args;
        //        expect(args[0].properties.username).toBeDefined();
        //        expect(args[0].properties.password).toBeDefined();
        //    });

        //    describe('login is successful', function() {
        //        it('should output username', function() {
        //            spyOn(client, 'auth').andCallFake(function(obj, fn) { fn(null, {}); });
        //            cli.argv({ _: [ 'login' ] });
        //            expect(process.stdout.write.mostRecentCall.args[0]).toMatch('zelda');
        //        });
        //    });

        //    describe('login is unsuccessful', function() {
        //        it('should output error message', function() {
        //            spyOn(client, 'auth').andCallFake(function(obj, fn) {
        //                fn(new Error('Account does not exist'));
        //            });
        //            cli.argv({ _: [ 'login' ] });
        //            expect(process.stdout.write.mostRecentCall.args[0]).not.toMatch('zelda');
        //        });
        //    });
        //});

        //describe('currently logged into an account', function() {
        //    beforeEach(function() {
        //        spyOn(client, 'auth').andCallFake(function(obj, fn) {
        //            fn(null, {});
        //        });
        //        cli.argv({ _: [ 'login' ] });
        //    });

        //    it('should not prompt for username and password', function() {
        //        cli.argv({ _: [ 'login' ] });
        //        expect(prompt.get.calls.length).toEqual(1);
        //    });

        //    it('should output username', function() {
        //        cli.argv({ _: [ 'login' ] });
        //        expect(process.stdout.write.mostRecentCall.args[0]).toMatch('zelda');
        //    });
        //});

    //describe('$ phonegap-build login --username zelda', function() {
    //    beforeEach(function() {
    //        spyOn(prompt, 'get').andCallFake(function(obj, fn) {
    //            fn(null, { password: 'tr1force' });
    //        });
    //    });

    //    it('should prompt for password', function() {
    //        spyOn(client, 'auth').andCallFake(function(obj, fn) { fn(null, {}); });
    //        cli.argv({ _: [ 'login' ], username: 'zelda' });
    //        var args = prompt.get.mostRecentCall.args;
    //        expect(args[0].properties.username).not.toBeDefined();
    //        expect(args[0].properties.password).toBeDefined();
    //    });

    //    describe('login is successful', function() {
    //        it('should output username', function() {
    //            spyOn(client, 'auth').andCallFake(function(obj, fn) { fn(null, {}); });
    //            cli.argv({ _: [ 'login' ], username: 'zelda' });
    //            expect(process.stdout.write.mostRecentCall.args[0]).toMatch('zelda');
    //        });
    //    });

    //    describe('login is unsuccessful', function() {
    //        it('should output error message', function() {
    //            spyOn(client, 'auth').andCallFake(function(obj, fn) {
    //                fn(new Error('Invalid login'));
    //            });
    //            cli.argv({ _: [ 'login' ], username: 'zelda' });
    //            expect(process.stdout.write.mostRecentCall.args[0]).not.toMatch('zelda');
    //        });
    //    });
    //});

    //describe('$ phonegap-build login -u zelda', function() {
    //    beforeEach(function() {
    //        spyOn(prompt, 'get').andCallFake(function(obj, fn) {
    //            fn(null, { password: 'tr1force' });
    //        });
    //    });

    //    it('should prompt for password', function() {
    //        spyOn(client, 'auth').andCallFake(function(obj, fn) { fn(null, {}); });
    //        cli.argv({ _: [ 'login' ], u: 'zelda' });
    //        var args = prompt.get.mostRecentCall.args;
    //        expect(args[0].properties.username).not.toBeDefined();
    //        expect(args[0].properties.password).toBeDefined();
    //    });

    //    describe('login is successful', function() {
    //        it('should output username', function() {
    //            spyOn(client, 'auth').andCallFake(function(obj, fn) { fn(null, {}); });
    //            cli.argv({ _: [ 'login' ], username: 'zelda' });
    //            expect(process.stdout.write.mostRecentCall.args[0]).toMatch('zelda');
    //        });
    //    });

    //    describe('login is unsuccessful', function() {
    //        it('should output error message', function() {
    //            spyOn(client, 'auth').andCallFake(function(obj, fn) {
    //                fn(new Error('Invalid login'));
    //            });
    //            cli.argv({ _: [ 'login' ], username: 'zelda' });
    //            expect(process.stdout.write.mostRecentCall.args[0]).not.toMatch('zelda');
    //        });
    //    });
    //});
