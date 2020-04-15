module.exports = function () {
    var handleError = require('../utilities/handleErrors');
    var fs = require('fs');
    var chokidar = require('chokidar');
    var pathlib = require('path');
    var monitorPath = arguments[0];
    if (!fs.existsSync(monitorPath)) {
        handleError.displayInvalidArgsMessage();
        return;
    }
    if (arguments[0] == undefined) {
        handleError.displayInvalidArgsMessage();
    }
    console.log(`monitoring ${monitorPath}`);
    chokidar.watch(monitorPath, { ignoreInitial: true }).on('all', (event, path) => {
        if (path == monitorPath + '\\' + 'log.json')
            return;
        // watcher.unwatch('./tmp/logs.json');
        if (event === "unlink")
            event = "delete";
        if (event === "unlinkDir")
            event = "delete directory";
        var log = {
            "action": event,
            "path": path
        }
        logContents = [];
        if (fs.existsSync(pathlib.join(monitorPath, 'log.json'))) {
            var logContents = JSON.parse(fs.readFileSync(pathlib.join(monitorPath, 'log.json')));
            console.log(logContents);
            logContents.push(log);
        }
        else {
            logContents.push(log);
        }
        fs.writeFileSync(pathlib.join(monitorPath, 'log.json'), JSON.stringify(logContents));
    });
}