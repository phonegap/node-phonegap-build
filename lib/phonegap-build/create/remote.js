/**
 * Create remote application.
 *
 * Options:
 *
 *   - `options` {Object} is the remote application data.
 *   - `options.name` {String} is the title passed to Build.
 *   - `options.api` {Object} is the API object defined by phonegap-build-rest.
 *   - `callback` {Function} is the completion callback.
 *     - `e` {Error} is null unless there is an error.
 */

module.exports = function(options, callback) {
    // require parameters
    if (!options) throw new Error('missing options parameter');
    if (!options.name) throw new Error('missing options.name parameter');
    if (!options.api) throw new Error('missing options.api parameter');
    if (!callback) throw new Error('missing callback parameter');

    // post headers for phonegap build api
    var headers = {
        title: options.name,
        create_method: 'file'
    };

    // create app on phonegap build
    options.api.post('/apps', headers, function(e, response) {
        callback(e);
    });
};
