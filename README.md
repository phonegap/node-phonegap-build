# PhoneGap Build CLI [![Build Status][travis-ci-img]][travis-ci-url]

> PhoneGap Build command-line interface and node.js library.

## Getting Started on the Command-line (CLI)

### CLI: Install

    $ sudo npm install -g phonegap-build

### CLI: Usage

    Usage: phonegap-build [options] [commands]

    Synopsis:

      PhoneGap Build command-line environment.

    Commands:

      login                login to phonegap build
      logout               logout of phonegap build
      create <path>        create a phonegap project
      build <platform>     build a specific platform
      help [commands]      output usage information

    Options:

      -v, --version        output version number
      -h, --help           output usage information

    With no command is specified, a build is assumed. When no platform has
    been specified, 'android' is used as the default platform for now.

    Hence the following commands are equivalent:

    phonegap-build
    phonegap-build android

## Getting Started with Node.js

### Node.js: Install

`package.json`:

    {
        "dependencies": {
            "phonegap-build-cli": "*"
        }
    }

### Require

    var build = require('phonegap-build-cli');

### Login

Authenticates with PhoneGap Build, saves the token, and return an API object.
When the save token exists, the authentication step is skipped.

__Options:__

  - `options` {Object} contains the login credentials.
  - `options.username` {String} is the username.
  - `options.password` {String} is the password.
  - [`callback`] {Function} is called after the login.
    - `e` {Error} is null on a successful login attempt.
    - `api` {Object} the API object defined by phonegap-build-rest

__Events:__

  - `error` is triggered on an error.
    - `e` {Error} details the error.
  - `complete` is trigger when there is no error.
    - `api` {API} is instance of phonegap-build-api object.

__Example:__

    build.login({ username: 'zelda', password: 'tr1force' }, function(e, api) {
        // pass `api` to other phonegap build commands
    });

### Logout

Logout the user by deleting the token key from the config file.

__Options:__

  - `args` {Object} is unused and should be `{}`.
  - [`callback`] {Function} is a callback function.
    - `e` {Error} is null unless there is an error.

__Events:__

  - `error` is trigger on an error.
    - `e` {Error} details the error.
  - `complete` is trigger when there is no error.

__Example:__

    build.logout({}, function(e) {
        console.log('now logged out.');
    });

### Create a New App

Creates an application on the local filesystem and also remotely on
PhoneGap Build. The remote application is linked by storing the app ID
inside the application's config file.

__Options:__

  - `options` {Object} is data required to create an app
    - `path` {String} is a directory path for the app.
  - [`callback`] {Function} is triggered after creating the app.
    - `e` {Error} is null unless there is an error.

__Events:__

  - `error` is trigger on an error.
    - `e` {Error} details the error.
  - `complete` is trigger when no error occurs.

__Example:__

    build.create({ path: 'path/to/new/app' }, function(e) {
    });

### Build an App

The build task will compress the application, upload it to PhoneGap Build,
and poll until the platform's build status is complete or an error is
encountered.

__Options:__

  - `options` {Object} is data required for building a platform.
  - `options.api` {Object} is the phonegap-build-api API object.
  - `options.platforms` {Array} is a collection of platform names {String} that
                        specify the platforms to build.
  - [`callback`] {Function} is triggered after the build is complete.
    - `e` {Error} is null unless there is an error.

__Events:__

  - `error` is trigger on an error.
    - `e` {Error} details the error.
  - `complete` is trigger when no error occurs.

__Example:__

    build.build({ api: api, platforms: ['android'] }, function(e) {
    });

## Related Projects

- [phonegap-app-site](https://github.com/nitobi/phonegap-app-site)
- [phonegap-app](https://github.com/mwbrooks/phonegap-app)
- [phonegap-cli](https://github.com/mwbrooks/phonegap-cli)

[travis-ci-img]: https://secure.travis-ci.org/mwbrooks/phonegap-build-cli.png
[travis-ci-url]: http://travis-ci.org/mwbrooks/phonegap-build-cli

