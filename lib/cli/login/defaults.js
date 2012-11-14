/*
 * Module dependencies.
 */

var prompt = require('prompt');

/**
 * Login defaults
 */

module.exports = function(callback) {
    var properties = {
        properties: {
            username: {
                'default': '',
                description: 'Enter your username:'
            },
            password: {
                'default': '',
                description: 'Enter your password:'
            }
        }
    };

    prompt.colors = false;
    prompt.message = '';
    prompt.delimiter = '';
    prompt.start();

    prompt.get(properties, function(e, result) {
        result.username = result.username || '';
        result.password = result.password || '';
        callback(result);
    });
};
