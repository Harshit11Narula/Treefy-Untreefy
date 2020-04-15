let fs = require("fs");
let path = require("path");
let errorHandler = require("../utilities/handleErrors.js");

module.exports = function () {
    switch (arguments[1]) {
        case '-l':
            viewAsList(arguments[0]);
            break;
        case '-t':
            viewAsTree(arguments[0], "");
            break;
        case '-h':
            viewHistory(arguments[0]);
            break;
        default:
            errorHandler.displayInvalidArgsMessage();
            break;
    }
}

function viewAsList(rpath){
    let stats = fs.lstatSync(rpath); // unknown -> resolved
    if (stats.isDirectory() == false) { //unknown -> resolved
        console.log(rpath + "*"); // unknown -> resolved
    } else {
        console.log(rpath);
        let children = fs.readdirSync(rpath); // unkown -> resolved
        for (let i = 0; i < children.length; i++) {
            let cpath = path.join(rpath, children[i]); // unknown
            viewAsList(cpath);
        }
    } 
}

function viewAsTree(rpath, indent) {
    let stats = fs.lstatSync(rpath); // unknown -> resolved
    if (stats.isDirectory() == false) { //unknown -> resolved
        console.log(indent + path.basename(rpath) + "*"); // unknown -> resolved
    } else {
      //  console.log(indent + path.basename(rpath);
        let children = fs.readdirSync(rpath); // unkown -> resolved
        for (let i = 0; i < children.length; i++) {
            let cpath = path.join(rpath, children[i]); // unknown
            viewAsTree(cpath, indent + "---");
        }
    }   
}

function viewHistory(src){
    console.log(`view ${src}'s history`);
}