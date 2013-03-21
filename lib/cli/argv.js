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
    // optional callback
    callback = callback || function() {};

    // --version
    if (argv.version || argv.v) {
        this.version(argv, callback);
        return;
    }

    // --help
    if (argv.help || argv.h) {
        argv._.unshift('help');
    }

    // <command> help
    if (argv._[argv._.length-1] === 'help' && argv._.length > 1) {
        argv._.pop();
        argv._.unshift('help');
    }

    // no arguments given or first argument not a function; assume build
    if (!argv._.length || (typeof this[argv._[0]] !== 'function')) {
        argv._.unshift('build');
    }

    // execute command
    if (typeof this[argv._[0]] === 'function') {
        this[argv._[0]](argv, callback);
    }
    else {
        this.unknown(argv, callback);
    }
};
