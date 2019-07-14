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


            console.log("count: "+count);
            console.log("count: "+msg.numberOfArtifacts);

            for(count;count<=msg.numberOfArtifacts;){

                console.log("count: "+count);
                console.log("count: "+msg.numberOfArtifacts);
                //console.log(JSON.stringify("========================>>> "+JSON.stringify(msg.artifacts)));
                artifacts.push(msg.artifact);
                if(count==msg.numberOfArtifacts){

                    var res = request('POST', 'http://0.0.0.0/RepositoryService/train/ship', {
                        json: msg.message.train,
                    });
                    var resultTrain = JSON.parse(res.getBody('utf8'));
                    msg.resultTrain = resultTrain;

                    node.send(msg);
                }

                count++;
            }




        });


    }
    RED.nodes.registerType("Result",ResultNode);




}