var package = require('../../package.json');

function version () {
    console.log(package.version);
    return package.version;
};

module.exports = version;
