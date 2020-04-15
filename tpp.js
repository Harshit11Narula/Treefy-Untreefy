let view = require("./commands/view.js");
let untreefy = require("./commands/untreefy.js");
let treefy = require("./commands/treefy.js");
let monitor = require("./commands/monitor.js");
let viewhistory = require('./commands/viewhistory.js');
let help = require("./commands/help.js");
let errorHandler = require("./utilities/handleErrors.js");

switch (process.argv[2]) {
    case 'view':
        view(process.argv[3], process.argv[4]);
        break;
    case 'untreefy':
        untreefy(process.argv[3], process.argv[4]);
        break;
    case 'treefy':
        treefy(process.argv[3], process.argv[4]);
        break;
    case 'monitor':
        monitor(process.argv[3]);
        break;
    case 'viewhistory':
        viewhistory(process.argv[3]);
        break;
    case 'help':
        help();
        break;
    default:
        errorHandler.displayInvalidArgsMessage();
        break;
}
