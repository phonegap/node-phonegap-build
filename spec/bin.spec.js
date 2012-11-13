var shell = require('shelljs');
var path = require('path');
var cli = 'node ' + path.resolve(path.join(__dirname, '..', 'bin', 'phonegap-build.js'));

describe('bin', function() {
    describe('delegation', function() {
        it('should support no arguments', function() {
            var process = shell.exec(cli + '', { silent: true });
            expect(process.output).toMatch('Usage:');
        });

        it('should support commands', function() {
            var process = shell.exec(cli + ' version', { silent: true });
            expect(process.output).toMatch(/^\w+\.\w+\.\w+/);
        });

        it('should support options', function() {
            var process = shell.exec(cli + ' --version', { silent: true });
            expect(process.output).toMatch(/^\w+\.\w+\.\w+/);
        });
    });
});
