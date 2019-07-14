module.exports = function(RED) {
    console.log("Starting Wagon Node");
    'use strict';

    var wagons = require('../lib/wagons.js');


    function WagonNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        wagons = new Object();
        wagons.wagon = [];
        wagons.wagon[0].name = config.name;
        wagons.wagon[0].description = config.description;
        wagons.wagon[0].stationProfiles = new Object();
        wagons.wagon[0].stationProfiles.stationProfile = [];
        wagons.wagon[0].stationProfiles.stationProfile[0] = config.stationProfile1;
        wagons.wagon[0].stationProfiles.stationProfile[1] = config.stationProfile2;
        wagons.wagon[0].stationProfiles.stationProfile[2] = config.stationProfile3;


        this.on('input', function(msg) {
            msg.train.wagons = wagons;

            node.send(msg);
        });
    }
    RED.nodes.registerType("Wagon",WagonNode);
}