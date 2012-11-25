/**
 * Parse command-line arguments.
 *
 * Inspects the arguments and calls the appropriate action.
 *
 * Options:
 *
 *   - `argv` {Object} is an optimist.argv object.
 *   - [`callback`] {Function} is called on completion.
 */

module.exports = function(argv, callback) {
    callback = callback || function() {};

    if (argv.version || argv.v) {
        this.version(argv, callback);
        return;
    }

    if (argv.help || argv.h) {
        this.help(argv, callback);
        return;
    }

    if (!argv._.length) {
        this.help(argv, callback);
        return;
    }

    if (typeof this[argv._[0]] === 'function') {
        this[argv._[0]](argv, callback);
    }
    else {
        this.unknown(argv, callback);
    }
};
