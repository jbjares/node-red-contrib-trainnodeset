module.exports = function(RED) {
    console.log("Starting Wagon Node");
    'use strict';

    var message = require('../lib/Message.js');
    var fs = require('fs');
    var request = require('sync-request');
    var index = 0;
    function WagonNode(config) {

        RED.nodes.createNode(this,config);
        var node = this;
        var globalContext = this.context().global;
        var wagon = [];
        wagon[index] = new Object();
        wagon[index].name = config.name;
        wagon[index].description = config.description;
        wagon[index].stationProfiles = new Object();
        wagon[index].stationProfiles.stationProfile = [];
        wagon[index].stationProfiles.stationProfile[0] = new Object();
        wagon[index].stationProfiles.stationProfile[0]  = config.stationProfile1;
        wagon[index].stationProfiles.stationProfile[1] = new Object();
        wagon[index].stationProfiles.stationProfile[1]  = config.stationProfile2;
        wagon[index].stationProfiles.stationProfile[2] = new Object();
        wagon[index].stationProfiles.stationProfile[2] = config.stationProfile3;


        this.on('input', function(msg) {


            msg.message.train = globalContext.set("msg.message.train",msg.message.train);

            const wagonExe = msg =>
                testObjectsIntegrity().then(
                    setWagon().then(
                        addWagon().then(
                            addWagon().then(
                                    sendTheMessage()
                            )
                        )
                    )
                )

            wagonExe.call();



            function testObjectsIntegrity() {
                console.log("1: testObjectsIntegrity");

                return new Promise(function(done) {
                    if(msg.message.train.wagons ==undefined){
                        msg.message.train.wagons = [];
                        msg.message.train.wagons[0] = new Object();
                    }
                    done();
                });

            }

            function setWagon() {
                console.log("2: setWagon");

                return new Promise(function(done) {
                    msg.message.train = globalContext.get("msg.message.train");
                    msg.message.train.wagons = [];
                    msg.message.train.wagons[index] = new Object();
                    msg.message.train.wagons[index].name = config.name;
                    msg.message.train.wagons[index].description = config.description;
                    msg.message.train.wagons[index].stationProfiles = [];
                    msg.message.train.wagons[index].stationProfiles[0] = new Object();
                    msg.message.train.wagons[index].stationProfiles[0]  = config.stationProfile1;
                    msg.message.train.wagons[index].stationProfiles[1] = new Object();
                    msg.message.train.wagons[index].stationProfiles[1]  = config.stationProfile2;
                    msg.message.train.wagons[index].stationProfiles[2] = new Object();
                    msg.message.train.wagons[index].stationProfiles[2] = config.stationProfile3;
                    done();
                });

            }

            function addWagon() {
                console.log("3: addWagon");
                return new Promise(function(done) {
                    var trainId = globalContext.get("trainId");
                    var res = request('POST', 'http://0.0.0.0/RepositoryService/train/add/wagon/'+trainId, {
                        json: msg.message.train.wagons,
                    });
                    var wagons =  JSON.parse(res.getBody('utf8'));
                    msg.message.train = globalContext.get("msg.message.train");
                    msg.message.train.wagons = wagons;
                    done();
                });
            }

            function sendTheMessage() {
                console.log("4: sendTheMessage");
                return new Promise(function(done) {
                    node.send(msg);
                    done();
                });
            }

        });

    }
    index++;
    RED.nodes.registerType("Wagon",WagonNode);
}