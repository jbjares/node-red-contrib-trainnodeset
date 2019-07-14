var wagons = require("./wagons.js");
var datacite = require("./datacite.js");


train = {
    name: "",
    internalId: "",
    internalVersion: "",
    internalPointer: "",
    sourceRepository: "",
    userToken: "",
    description: "",
    checksum: "",
    datacite: new Object(),
    wagons:[],
    similarProjects: [],
    flow: {
        flowID: "",
        name: "",
        filename: "",
        format: "",
        checksum: "",
        fileUrl: "",
    }

}
