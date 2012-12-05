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
        argv._.push('help');
    }

    // help <command>
    if (argv._[0] === 'help' && argv._.length > 1) {
        argv._.shift();
        argv._.push('help');
    }

    // no commands
    if (!argv._.length) {
        argv._.push('help');
    }

    // execute command
    if (typeof this[argv._[0]] === 'function') {
        this[argv._[0]](argv, callback);
    }
    else {
        this.unknown(argv, callback);
    }
};
