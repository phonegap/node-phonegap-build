var fs = require('fs');
var path = require('path');

function Help(callback) {
    callback = callback || function () {};
console.log('help');
    var helppath = path.join(__dirname, '..', '..', 'docs', 'help.txt');

    fs.readFile(helppath, {encoding: 'utf-8'} ,function (err, data) {
        if (!err) {
            console.log(data);
        }
        callback(err, data);
    }); 
};

module.exports = Help;
