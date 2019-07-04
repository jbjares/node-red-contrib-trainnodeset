module.exports = function(RED) {
    console.log("Starting Wagon Node");
    'use strict';

    var message = require('../lib/Message.js');


    function WagonNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        var wagons = [];
        var wagon = new Object();
        wagon.name = config.name;
        wagon.description = config.description;
        wagon.stationProfiles = [];
        this.stationProfile1 = config.stationProfile1;
        this.stationProfile2 = config.stationProfile2;
        this.stationProfile3 = config.stationProfile3;
        //console.log("Wagon  message: "+JSON.stringify(wagon));


        this.on('input', function(msg) {

            wagon.stationProfiles.push(this.stationProfile1);
            wagon.stationProfiles.push(this.stationProfile2);
            wagon.stationProfiles.push(this.stationProfile3);
            wagons.push(wagon);
            msg.message.train.wagons = wagons;
            //console.log("msg.message.train: "+JSON.stringify(msg.message.train));

            node.send(msg);
        });
    }
    RED.nodes.registerType("Wagon",WagonNode);
}