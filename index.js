var padManager = require('ep_etherpad-lite/node/db/PadManager');
var Pad = require('ep_etherpad-lite/node/db/Pad.js').Pad;
var moment = require('moment');

exports.eejsBlock_indexWrapper = function (hook_name, args, cb) {
    var padstring = "<h3>List of pads</h3>";
    var pads = padManager.listAllPads().padIDs;
    pads = pads.sort();
    padstring += "<table>";
    pads.forEach(function(item){
        var pad = new Pad(item);
        var padTimestamp;
        pad.init(null, function(err) { if(!err) { console.log(pad.getLastEdit(function(err, timestamp) {
          console.log("small_list: " + timestamp);
          padTimestamp = timestamp;
        })); } });
        padstring += '<tr>';
        padstring += '<td><a href="/p/' + item + '">' + item + '</a></td>';
        padstring += '<td>' + moment(padTimestamp).format() + '</td>';
        padstring += '</tr>';
        console.log("small_list: " + JSON.stringify(pad));
    });
    padstring += "</table>";
    args.content += padstring;

    return cb();
};
