module.exports = function(RED) {
    'use strict';
    var request = require('sync-request');


    var artifacts = [];
    console.log("Starting Result Node");
    function ResultNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        //this.dispatchername = config.dispatchername;
        var count = 0;
        var artifacts = [];


        this.on('input', function(msg) {

            // console.log("msg.message: "+JSON.stringify(msg.message.train));
            // var res = request('POST', 'http://localhost/trainDORepository/train/ship', {
            //     json: msg.message.train,
            // });
            // var resultTrain = JSON.parse(res.getBody('utf8'));
            // msg.resultTrain = resultTrain;
            //console.log("resultTrain: "+JSON.stringify(resultTrain));
            //msg.payload.resultTrain = resultTrain;
            //console.log("payload: "+JSON.stringify(msg.payload.resultTrain.result));

            //console.log("msg.message.train.wagons[0].resources[0].artifacts.length: "+msg.message.train.wagons[0].resources[0].artifacts.length);
            //console.log("msg.message.train.wagons[0].resources.length: "+msg.message.train.wagons[0].resources.length);
            //console.log("msg.artifacts: "+msg.artifacts.length);

            //msg.message.train.wagons[0].resources[0].artifacts[count].push
            ///artifacts.push(msg.artifact)
            //console.log("msg.count: "+msg.count);

            console.log("count: "+count);
            console.log("count: "+msg.numberOfArtifacts);

            for(count;count<=msg.numberOfArtifacts;){

                console.log("count: "+count);
                console.log("count: "+msg.numberOfArtifacts);
                //console.log(JSON.stringify("========================>>> "+JSON.stringify(msg.artifacts)));
                artifacts.push(msg.artifact);
                if(count==msg.numberOfArtifacts){

                    var res = request('POST', 'http://menzel.informatik.rwth-aachen.de/trainDORepository/train/ship', {
                        json: msg.message.train,
                    });
                    var resultTrain = JSON.parse(res.getBody('utf8'));
                    msg.resultTrain = resultTrain;

                    //console.log(JSON.stringify("========================>>> "+JSON.stringify(msg.artifacts)));
                    //msg.message.train.wagons[0].resources[0].artifacts = artifacts;
                    //msg.message.train.wagons[0].resources[0].artifacts.push(msg.artifacts);
                    node.send(msg);
                }

                count++;
            }



            //console.log("msg.message.train.wagons[0].resources[0].artifacts: "+ msg.message.train.wagons[0].resources[0].artifacts);
            //console.log("result count: "+count);
            // console.log("artifact msg.count: "+msg.count);
            // console.log("result - msg.artifacts: "+JSON.stringify(msg.artifact));



        });


    }
    RED.nodes.registerType("Result",ResultNode);




}