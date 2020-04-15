let fs = require("fs");
let path = require("path");
let uuid = require("uuid");

module.exports = function () {
    // initially binary
    let mo = fs.readFileSync(path.join(arguments[0], "metadata.json"))
    // object
    let parsedMo = JSON.parse(mo);
    console.log(parsedMo);

    treefy(arguments[0], arguments[1], parsedMo);

}

function treefy(spath, dpath, obj) {
    if (obj.isFile == true) {
        //copy the file
        var rs = fs.createReadStream(path.join(spath, obj.newname));
        var ws = fs.createWriteStream(path.join(dpath, obj.name));
        rs.pipe(ws);
    } else {
        fs.mkdirSync(path.join(dpath, obj.name));  

        let children = obj.children;
        for (let i = 0; i < children.length; i++) {
            let cpath = path.join(dpath, obj.name);
            treefy(spath, cpath, children[i]);
        }
    }
}
