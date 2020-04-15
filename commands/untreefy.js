let fs = require("fs");
let path = require("path");
let uuid = require("uuid");

module.exports = function () {
    let mo = {
    };
    untreefy(arguments[0], arguments[1], mo);
    fs.writeFile(path.join(arguments[1], "metadata.json"), JSON.stringify(mo), function(){
    });
}
// this will update the object with correct info, copy all files with proper random names
function untreefy(spath, dpath, obj){
    let stats = fs.lstatSync(spath); 
    if (stats.isDirectory() == false) {
        obj.name = path.basename(spath);
        obj.isFile = true;
        obj.newname = uuid.v4();
        
        //copy the file
        var rs = fs.createReadStream(spath);
        var ws = fs.createWriteStream(path.join(dpath, obj.newname));
        rs.pipe(ws);
    } else {
        // name, isFile=f, children, recursion
        obj.name = path.basename(spath);
        obj.isFile = false;
        obj.children = [];

        let children = fs.readdirSync(spath);      
        for (let i = 0; i < children.length; i++) {
            let cpath = path.join(spath, children[i]);
            let nco = {}; 
            untreefy(cpath, dpath, nco);
            obj.children.push(nco);
        }
    }
}
