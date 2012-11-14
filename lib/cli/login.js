/*
 * Module dependencies.
 */

var prompt = require('prompt'),
    PhoneGap = require('./../phonegap-build'),
    _login = PhoneGap.prototype.login;

/**
 * Login command
 */

module.exports = function() {
    var options = {
        properties: {
            username: {
                required: true,
                description: 'Enter your username:'
            },
            password: {
                required: true,
                hidden: true,
                description: 'Enter your password:'
            }
        }
    };

    prompt.colors = false;
    prompt.message = '';
    prompt.delimiter = '';
    prompt.start();

    prompt.get(options, function(e, input) {
        if (e) return;

        _login(input, function(e) {
            // @TODO halt on invalid authentications
            // @TODO forward on valid authentications
        });
    });
};
