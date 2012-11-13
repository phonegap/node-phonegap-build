var shell = require('shelljs'),
    path = require('path'),
    bin = 'node ' + path.resolve(path.join(__dirname, '..', 'bin', 'phonegap-build.js')),
    CLI = require('../lib/cli'),
    cli;

describe('$', function() {
    beforeEach(function() {
        cli = new CLI();
    });

    describe('delegation', function() {
        it('should support no arguments', function() {
            var process = shell.exec(bin + '', { silent: true });
            expect(process.output).toMatch('Usage:');
        });

        it('should support commands', function() {
            var process = shell.exec(bin + ' version', { silent: true });
            expect(process.output).toMatch(/^\w+\.\w+\.\w+/);
        });

        it('should support options', function() {
            var process = shell.exec(bin + ' --version', { silent: true });
            expect(process.output).toMatch(/^\w+\.\w+\.\w+/);
        });
    });

    describe('$ phonegap-build', function() {
        it('should call CLI help', function() {
            spyOn(cli, 'help');
            cli.parse({ _: [] });
            expect(cli.help).toHaveBeenCalled();
        });
    });

    describe('$ phonegap-build help', function() {
        it('should call CLI help', function() {
            spyOn(cli, 'help');
            cli.parse({ _: [ 'help' ] });
            expect(cli.help).toHaveBeenCalled();
        });
    });

    describe('$ phonegap-build --help', function() {
        it('should call CLI help', function() {
            spyOn(cli, 'help');
            cli.parse({ _: [], help: true });
            expect(cli.help).toHaveBeenCalled();
        });
    });

    describe('$ phonegap-build -h', function() {
        it('should call CLI help', function() {
            spyOn(cli, 'help');
            cli.parse({ _: [], h: true });
            expect(cli.help).toHaveBeenCalled();
        });
    });

    describe('$ phonegap-build --version', function() {
        it('should call CLI version', function() {
            spyOn(cli, 'version');
            cli.parse({ _: [], version: true });
            expect(cli.version).toHaveBeenCalled();
        });
    });

    describe('$ phonegap-build -v', function() {
        it('should call CLI version', function() {
            spyOn(cli, 'version');
            cli.parse({ _: [], v: true });
            expect(cli.version).toHaveBeenCalled();
        });
    });

    describe('$ phonegap-build login', function() {
        it('should call CLI login', function() {
            spyOn(cli, 'login');
            cli.parse({ _: ['login'] });
            expect(cli.login).toHaveBeenCalled();
        });
    });

    describe('$ phonegap-build noop', function() {
        it('should display unknown command', function() {
            spyOn(console, 'log');
            cli.parse({ _: [ 'noop' ] });
            expect(console.log.mostRecentCall.args[0]).toMatch(/unknown command:/i);
        });
    });
});
