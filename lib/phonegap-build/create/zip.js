module.exports = {
    /**
     * Zip a Directory.
     *
     * Options:
     *
     *   - `path` {String} is the directory path to compress.
     *   - `callback` {Function} is trigger after the compress.
     *     - `e` {Error} is null unless there is an error.
     *     - `zippath` {String} is the path to the zip archive.
     */
    compress: function(path, callback) {
    },

    /**
     * Cleanup Zip Archive.
     *
     * Deletes the zip archive created by `compress(path, callback)` and removes
     * the parent directory if empty.
     */
    cleanup: function() {
    }
};
