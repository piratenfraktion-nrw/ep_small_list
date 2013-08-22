var padManager = require('ep_etherpad-lite/node/db/PadManager');
var Pad = require('ep_etherpad-lite/node/db/Pad.js').Pad;
var moment = require('moment');

exports.eejsBlock_indexWrapper = function (hook_name, args, cb) {
    var padstring = "<h3>List of pads</h3>";
    var pads = padManager.listAllPads().padIDs;
    pads = pads.sort();
    padstring += "<table><thead><tr><th>Padname</th><th>Letzte Bearbeitung</th></tr></thead>";
    pads.forEach(function(item){
        var pad = new Pad(item);
        var padTimestamp;
        pad.init(null, function(err) { if(!err) { console.log(pad.getLastEdit(function(err, timestamp) {
          padTimestamp = timestamp;
        })); } });
        padstring += '<tr>';
        padstring += '<td><a href="/p/' + item + '">' + item + '</a></td>';
        padstring += '<td>' + (new Date(padTimestamp)).toLocaleString() + '</td>';
        padstring += '</tr>';
    });
    padstring += "</table>";
    args.content += padstring;

    return cb();
};
