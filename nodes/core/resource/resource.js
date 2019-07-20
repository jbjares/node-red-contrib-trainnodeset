module.exports = function(RED) {

    'use strict';
    var message = require('../lib/Message.js');

    function ResourceNode(config) {
        console.log("Starting Resource Node");
        RED.nodes.createNode(this,config);
        var node = this;

        var resources = [];
        var resource = new Object();
        resource.name = config.name;
        resource.description = config.description;
        //OCI
        var oci = new Object();
        oci.created = config.created;
        oci.author = config.author;
        oci.architecture = config.architecture;
        oci.os = config.os;
        oci.config  = new Object();
        oci.user = config.user;
        var exposedPorts = [];
        this.port = config.port;
        this.protocol = config.protocol;
        var env = [];
        var entrypoint = [];
        var cmd = [];
        var volumes = [];
        this.env = config.env;
        this.entrypoint = config.entrypoint;
        this.cmd = config.cmd;
        this.volumes = config.volumes;
        this.numberOfArtifacts = config.numberOfArtifacts;
        var count = 0;

        this.on('input', function(msg) {






            // volumes.push(this.volumes)
            // cmd.push(this.cmd);
            // entrypoint.push(this.entrypoint);
            // env.push(this.env)
            // exposedPorts.push(this.port,this.protocol);
            // resource.oci = oci;
            // resources.push(resource);

            // msg.numberOfArtifacts = this.numberOfArtifacts;
            // msg.message.train.wagons[0].resources = resources;
            // node.send(msg);
        });
    }
    RED.nodes.registerType("Resource",ResourceNode);
}