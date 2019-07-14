module.exports = function(RED) {

    'use strict';
    var resources = require('../lib/resources.js');
    var oci = require('../lib/oci.js');

    function ResourceNode(config) {
        console.log("Starting Resource Node");
        RED.nodes.createNode(this,config);
        var node = this;

        resources = new Object();
        resources.resource = new Object();
        resources.resource.name = config.name;
        resources.resource.description = config.description;

        //OCI
        resources.resource.oci = new Object();
        resources.resource.oci.created = config.created;
        resources.resource.oci.author = config.author;
        resources.resource.oci.architecture = config.architecture;
        resources.resource.oci.os = config.os;
        resources.resource.oci.config  = new Object();
        resources.resource.oci.config.user = config.user;
        resources.resource.oci.config.exposedPorts = [{port:"",protocol:""}];
        resources.resource.oci.config.exposedPorts[0].port = config.port;
        resources.resource.oci.config.exposedPorts[0].protocol = config.protocol;
        resources.resource.oci.env = config.env;
        resources.resource.oci.entrypoint = config.entrypoint;
        resources.resource.oci.cmd = config.cmd;
        resources.resource.oci.volumes = config.volumes;
        //resources.resources.resource.oci.numberOfArtifacts = config.numberOfArtifacts;
        //var count = 0;

        this.on('input', function(msg) {

            // resources.push(resource);
            // msg.numberOfArtifacts = this.numberOfArtifacts;
            console.log("msg.train.wagons: "+JSON.stringify(msg.train.wagons));
            console.log("resources "+JSON.stringify(resources));
            msg.train.wagons.wagon.resources = resources;
            console.log("msg.train.wagons.wagon.resources "+JSON.stringify(msg.train.wagons.wagon.resources));
            node.send(msg);
        });
    }
    RED.nodes.registerType("Resource",ResourceNode);
}