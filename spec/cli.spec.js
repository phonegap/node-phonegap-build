var shell = require('shelljs');
var path = require('path');
var cli = 'node ' + path.resolve('./bin/phonegap-build.js');

describe('Command-line', function() {
    describe('$ phonegap-build', function() {
        it('should exist', function() {
            var process = shell.exec(cli + '', { silent: true });
            expect(process.code).toEqual(0);
        });

        it('should display help information', function() {
            var process = shell.exec(cli + '', { silent: true });
            expect(process.output).toMatch('Usage:');
        });
    });

    describe('$ phonegap-build help', function() {
        it('should exist', function() {
            var process = shell.exec(cli + ' help', { silent: true });
            expect(process.code).toEqual(0);
        });

        it('should display help information', function() {
            var process = shell.exec(cli + ' help', { silent: true });
            expect(process.output).toMatch('Usage:');
        });
    });

    describe('$ phonegap-build --help', function() {
        it('should exist', function() {
            var process = shell.exec(cli + ' --help', { silent: true });
            expect(process.code).toEqual(0);
        });

        it('should be display help information', function() {
            var process = shell.exec(cli + ' --help', { silent: true });
            expect(process.output).toMatch('Usage:');
        });
    });

    describe('$ phonegap-build -h', function() {
        it('should exist', function() {
            var process = shell.exec(cli + ' -h', { silent: true });
            expect(process.code).toEqual(0);
        });

        it('should be display help information', function() {
            var process = shell.exec(cli + ' -h', { silent: true });
            expect(process.output).toMatch('Usage:');
        });
    });

    describe('$ phonegap-build --version', function() {
        it('should display version', function() {
            var process = shell.exec(cli + ' --version', { silent: true });
            expect(process.output).toMatch(/^\w+\.\w+\.\w+/);
        });
    });

    describe('$ phonegap-build -V', function() {
        it('should display version', function() {
            var process = shell.exec(cli + ' -V', { silent: true });
            expect(process.output).toMatch(/^\w+\.\w+\.\w+/);
        });
    });
});
