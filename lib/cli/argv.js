/**
 * Parse command-line arguments
 *
 * Inspects the arguments and calls the appropriate action.
 *
 * Options:
 *
 *   - `argv` is an optimist.argv object
 */

module.exports = function(argv) {
    if (argv.version || argv.v) {
        this.version();
        return;
    }

    if (argv.help || argv.h) {
        this.help();
        return;
    }

    if (!argv._.length) {
        this.help();
        return;
    }

    try {
        this[argv._[0]]();
    } catch(e) {
        this.unknown();
    }
};
