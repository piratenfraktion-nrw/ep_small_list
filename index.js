var padManager = require('ep_etherpad-lite/node/db/PadManager');
var moment = require('moment');

exports.eejsBlock_indexWrapper = function (hook_name, args, cb) {
    var padstring = "<h3>List of pads</h3>";
    var pads = padManager.listAllPads().padIDs;
    pads = pads.sort();
    padstring += "<table>";
    pads.forEach(function(item){
        padstring += '<tr>';
        padstring += '<td><a href="/p/' + item + '">' + item + '</a></td>';
        //padstring += '<td>' + moment(padManager.getLastEdited(item).lastEdited).format() + '</td>';
        padstring += '</tr>';
    });
    padstring += "</table>";
    args.content += padstring;

    return cb();
};
