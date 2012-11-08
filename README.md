# PhoneGap Build CLI [![Build Status][travis-ci-img]][travis-ci-url]

> PhoneGap Build command-line interface and node.js library.

## Getting Started on the Command-line

### Install

    $ sudo npm install -g phonegap-build-cli

### Usage

    $ phonegap-build help

    Usage: phonegap-build [options] [command]

    Commands:

        help
        display help

    Options:

        -h, --help     output usage information
        -V, --version  output the version number

## Getting Started with Node.js

### Install

`package.json`:

    {
        "dependencies": {
            "phonegap-build-cli": "*"
        }
    }

### Usage

    var build = require('phonegap-build-cli');

[travis-ci-img]: https://secure.travis-ci.org/mwbrooks/phonegap-build-cli.png
[travis-ci-url]: http://travis-ci.org/mwbrooks/phonegap-build-cli

