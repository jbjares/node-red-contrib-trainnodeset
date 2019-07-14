var fs = require('fs');
var request = require('sync-request');
module.exports = function (RED) {

    'use strict';
    var artifacts = require('../lib/artifacts.js');
    var artifact = [];
    var count = 0;
    function ArtifactNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        artifacts = new Object();
        artifacts.artifact = artifact;
        artifacts.artifact[count] = [{name:config.name,filename:config.filename,format:config.format,filedata:config.filedata}];


        // console.log(" starting artifacts  =================> "+JSON.stringify(artifacts));
        // console.log(" starting artifact  =================> "+JSON.stringify(artifacts.artifact));

        this.on('input', function (msg) {



            var index = config.filedata.indexOf(';base64,');
            if (index === -1) {
                node.error('File format error', msg);
            } else {
                var filedata = config.filedata.substring(index + ';base64,'.length);
                var buf = new Buffer(filedata, 'base64');
                if (config.format === 'utf8') {
                    msg.payload = buf.toString();
                } else {
                    msg.payload = buf;
                }


                artifacts.artifact = artifact;
                msg.train.wagons.wagon.resources.resource.artifacts = artifacts;

// console.log("=========== msg.train.wagons.wagon.resources.resource.artifacts ==========="+
//     JSON.stringify("artifact: "+JSON.stringify(artifact)));

                var res = request('PUT', 'http://0.0.0.0/RepositoryService/train/add/artifacts', {
                    json: msg.train,
                });
                var updatedTrain = JSON.parse(res.getBody('utf8'));
                msg.train = updatedTrain;


                node.send(msg);
            }
        });
        this.on('close', function() {
            artifacts = new Object();
            artifact = [];
            count = 0;
        });



    }
    RED.nodes.registerType("Artifact", ArtifactNode);
};