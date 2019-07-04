var fs = require('fs');

module.exports = function (RED) {

    'use strict';
    var message = require('../lib/Message.js');

    function ArtifactNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var artifacts = [];
        var artifact = new Object();
        artifact.name = config.name;
        artifact.filename = config.filename;
        artifact.format = config.format;
        artifact.filedata = config.filedata;



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

                // artifacts.push(artifact);
                // msg.artifacts = this.artifacts;
                // msg.message.train.wagons[0].resources[0].artifacts = artifacts;

                //artifacts.push(artifact);
                msg.artifacts = this.artifacts;
                msg.message.train.wagons[0].resources[0].artifacts = artifacts;
                msg.message.train.wagons[0].resources[0].artifacts.push(artifact);
                console.log("artifact artfacts ===================>>> "+JSON.stringify(msg.message.train.wagons[0].resources[0].artifacts));
                console.log("artifact ===================>>> "+JSON.stringify(artifact));
                // console.log("node ===================>>> "+JSON.stringify(node));
                // console.log("node ===================>>> "+JSON.stringify(config));

                node.send(msg);
            }
        });

        // this.on('close', function(msg) {
        //     console.log("msg.count =====================================> "+count);
        //     console.log("node =====================================> "+JSON.stringify(node));
        //     console.log("msg.message.train.wagons[0].resources[0].artifacts = [] =====================================> "+msg.message.train.wagons[0].resources[0].artifacts);
        //     // msg.message.train.wagons[0].resources[0].artifacts = []
        //     // node.send(msg,msg.artifact,msg.count);
        // });

        // this.on('close', function(removed, done, msg) {
        //     if (removed) {
        //         console.log("This node has been deleted");
        //     } else {
        //         console.log("This node is being restarted");
        //     }
        //     console.log("done");
        //     done(msg);
        // });
        //
        // function done(msg){
        //     console.log("msg.count =====================================> "+count);
        //     console.log("node =====================================> "+JSON.stringify(node));
        //     console.log("msg.message.train.wagons[0].resources[0].artifacts = [] =====================================> "+msg.message.train.wagons[0].resources[0].artifacts);
        //     // msg.message.train.wagons[0].resources[0].artifacts = []
        //     // node.send(msg,msg.artifact,msg.count);
        // }
    }
    RED.nodes.registerType("Artifact", ArtifactNode);
};