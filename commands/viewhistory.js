module.exports = function () {
    var handleError = require('../utilities/handleErrors');
    var fs = require('fs');
    var path = require('path');
    if (arguments[0] == undefined) {
        handleError.displayInvalidArgsMessage();
        return;
    }
    var historyPath = arguments[0];
    var logData = JSON.parse(fs.readFileSync(path.join(historyPath, 'log.json')));

    for (let i = 0; i < logData.length; i++) {
        console.log(`${logData[i].action} on ${logData[i].path}`);
    }
}