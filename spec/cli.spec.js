var shell = require('shelljs');
var path = require('path');
var cli = 'node ' + path.resolve('./bin/phonegap-build.js');

describe('Command-line', function() {
    describe('$ phonegap-build help', function() {
        it('should exist', function() {
            var process = shell.exec(cli + ' help', { silent: true });
            expect(process.code).toEqual(0);
        });

        it('should be displayed', function() {
            var process = shell.exec(cli + ' help', { silent: true });
            expect(process.output).toMatch('Usage:');
        });
    });

    describe('$ phonegap-build --help', function() {
        it('should exist', function() {
            var process = shell.exec(cli + ' --help', { silent: true });
            expect(process.code).toEqual(0);
        });

        it('should be displayed', function() {
            var process = shell.exec(cli + ' --help', { silent: true });
            expect(process.output).toMatch('Usage:');
        });
    });

    describe('$ phonegap-build -h', function() {
        it('should exist', function() {
            var process = shell.exec(cli + ' -h', { silent: true });
            expect(process.code).toEqual(0);
        });

        it('should be displayed', function() {
            var process = shell.exec(cli + ' -h', { silent: true });
            expect(process.output).toMatch('Usage:');
        });
    });
});
