module.exports = function(RED) {

    var message = require('../lib/Message.js');
    var request = require('sync-request');
    var fs = require('fs');
    var index = 0;
    function TrainNode(config) {
        console.log("Starting Train Node");
        RED.nodes.createNode(this,config);
        var globalContext = this.context().global;

        var node = this;

        // Train Core
        this.message = new Object();
        this.train = new Object();
        this.train.name = config.name;
        this.train.description = config.description;
        this.train.sourceRepository = config.sourceRepository;
        this.train.userToken = config.userToken;
        this.train.internalId = getInternalId();
        this.train.internalVersion = getInternalVersion();
        this.train.internalPointer = getInternalPointer();

        //Train DataCite Core
        this.datacite = new Object();
        this.datacite.language = config.language;
        this.datacite.version = config.version;
        this.datacite.publicationYear = config.publicationYear;
        this.datacite.publisher = config.publisher;


        //Train DataCite - Identifier
        this.datacite.identifier = new Object();
        this.datacite.identifier.identifierType = config.identifierType;
        this.datacite.identifier.content = config.identifierContent;

        //Train DataCite - Creators
        this.datacite.creators  = new Object();
        this.datacite.creators.creator = [];
        this.datacite.creators.creator[index] = new Object();
        this.datacite.creators.creator[index].affiliation = config.creatorAffiliation;
        this.datacite.creators.creator[index].givenName = config.creatorGivenName;
        this.datacite.creators.creator[index].familyName = config.creatorFamilyName;
        this.datacite.creators.creator[index].creatorName = new Object();
        this.datacite.creators.creator[index].creatorName.nameType = config.nameType;
        this.datacite.creators.creator[index].creatorName.content = config.creatorContent;
        this.datacite.creators.creator[index].nameIdentifier = new Object();
        this.datacite.creators.creator[index].nameIdentifier.nameIdentifierScheme = config.creatorNameIdentifierScheme;
        this.datacite.creators.creator[index].nameIdentifier.schemeURI = config.creatorSchemeURI;
        this.datacite.creators.creator[index].nameIdentifier.content = config.nameIdentifierContent;

        //Train DataCite - Subjects
        this.datacite.subjects = new Object();
        this.datacite.subjects.subject = [];
        this.datacite.subjects.subject[index] = new Object();
        this.datacite.subjects.subject[index].schemeURI = config.subjectSchemeURI;
        this.datacite.subjects.subject[index].content = config.subjectContent;
        this.datacite.subjects.subject[index].subjectScheme = config.subjectScheme;

        //Train DataCite - Dates
        this.datacite.dates = new Object();
        this.datacite.dates.date = [];
        this.datacite.dates.date[index] = new Object();
        this.datacite.dates.date[index].dateType = config.dateType;
        this.datacite.dates.date[index].dateInformation = config.dateInformation;
        this.datacite.dates.date[index].content = config.dateContent;

        //Train DataCite - Formats
        this.datacite.formats = new Object();
        this.datacite.formats.format = [];
        this.datacite.formats.format[index] = new Object();
        this.datacite.formats.format[index].content = config.format;

        //Train DataCite - RightsList
        this.datacite.rightsList = new Object();
        this.datacite.rightsList.rights = [];
        this.datacite.rightsList.rights[index] = new Object();
        this.datacite.rightsList.rights[index].rightsURI = config.rightsURI;
        this.datacite.rightsList.rights[index].content = config.rightsContent;

        //Train DataCite - Titles
        this.datacite.titles = new Object();
        this.datacite.titles.title = [];
        this.datacite.titles.title[index] = new Object();
        this.datacite.titles.title[index].content = config.titleContent;
        this.datacite.titles.title[index].titleType = config.titleType;

        //Train DataCite - Descriptions
        this.datacite.descriptions  = new Object();
        this.datacite.descriptions.description = [];
        this.datacite.descriptions.description[index] = new Object();
        this.datacite.descriptions.description[index].descriptionType = config.descriptionType;
        this.datacite.descriptions.description[index].content = config.descriptionContent;

        //Train DataCite - Contributors
        this.datacite.contributors = new Object();
        this.datacite.contributors.contributor = [];
        this.datacite.contributors.contributor[index] = new Object();
        this.datacite.contributors.contributor[index].affiliation = config.contributorAffiliation;
        this.datacite.contributors.contributor[index].givenName = config.contributorGivenName;
        this.datacite.contributors.contributor[index].familyName = config.contributorFamilyName;
        this.datacite.contributors.contributor[index].contributorType = config.contributorType;
        this.datacite.contributors.contributor[index].contributorName = config.contributorName;
        this.datacite.contributors.contributor[index].nameIdentifier = new Object();
        this.datacite.contributors.contributor[index].nameIdentifier.nameIdentifierScheme = config.contributorNameIdentifierScheme;
        this.datacite.contributors.contributor[index].nameIdentifier.schemeURI = config.contributorNameIdentifierSchemeURI;
        this.datacite.contributors.contributor[index].nameIdentifier.content = config.contributorNameIdentifierContent;

        //Train DataCite - FundingReferences
        this.datacite.fundingReferences = new Object();
        this.datacite.fundingReferences.fundingReference = [];
        this.datacite.fundingReferences.fundingReference[index] = new Object();
        this.datacite.fundingReferences.fundingReference[index].funderName = config.funderName;
        this.datacite.fundingReferences.fundingReference[index].awardNumber = config.awardNumber;
        this.datacite.fundingReferences.fundingReference[index].awardTitle = config.awardTitle;
        this.datacite.fundingReferences.fundingReference[index].funderIdentifier = new Object();
        this.datacite.fundingReferences.fundingReference[index].funderIdentifier.funderIdentifierType = config.funderIdentifierType;
        this.datacite.fundingReferences.fundingReference[index].funderIdentifier.content = config.fundingReferenceContent;

        //Train DataCite - ResourceType
        this.datacite.resourceType = new Object();
        this.datacite.resourceType.resourceTypeGeneral = config.resourceTypeGeneral;
        this.datacite.resourceType.content = config.resourceTypeContent;


        this.on('input', function(msg) {


            //msg.message.train = globalContext.get("msg.message.train");

            const trainExe = msg =>
                trainComposer().then(
                        setDatacite().then(
                            saveTheTrain().then(
                                trainComposer().then(
                                    sendTheMessage()
                                )
                            )
                        )
                )




            trainExe.call();




            function setDatacite() {
                console.log("1: set datacite attributes");

                    return new Promise(function(done) {

                        //Train DataCite Core
                        this.datacite = new Object();
                        this.datacite.language = config.language;
                        this.datacite.version = config.version;
                        this.datacite.publicationYear = config.publicationYear;
                        this.datacite.publisher = config.publisher;


                        //Train DataCite - Identifier
                        this.datacite.identifier = new Object();
                        this.datacite.identifier.identifierType = config.identifierType;
                        this.datacite.identifier.content = config.identifierContent;

                        //Train DataCite - Creators
                        this.datacite.creators  = new Object();
                        this.datacite.creators.creator = [];
                        this.datacite.creators.creator[index] = new Object();
                        this.datacite.creators.creator[index].affiliation = config.creatorAffiliation;
                        this.datacite.creators.creator[index].givenName = config.creatorGivenName;
                        this.datacite.creators.creator[index].familyName = config.creatorFamilyName;
                        this.datacite.creators.creator[index].creatorName = new Object();
                        this.datacite.creators.creator[index].creatorName.nameType = config.nameType;
                        this.datacite.creators.creator[index].creatorName.content = config.creatorContent;
                        this.datacite.creators.creator[index].nameIdentifier = new Object();
                        this.datacite.creators.creator[index].nameIdentifier.nameIdentifierScheme = config.creatorNameIdentifierScheme;
                        this.datacite.creators.creator[index].nameIdentifier.schemeURI = config.creatorSchemeURI;
                        this.datacite.creators.creator[index].nameIdentifier.content = config.nameIdentifierContent;

                        //Train DataCite - Subjects
                        this.datacite.subjects = new Object();
                        this.datacite.subjects.subject = [];
                        this.datacite.subjects.subject[index] = new Object();
                        this.datacite.subjects.subject[index].schemeURI = config.subjectSchemeURI;
                        this.datacite.subjects.subject[index].content = config.subjectContent;
                        this.datacite.subjects.subject[index].subjectScheme = config.subjectScheme;

                        //Train DataCite - Dates
                        this.datacite.dates = new Object();
                        this.datacite.dates.date = [];
                        this.datacite.dates.date[index] = new Object();
                        this.datacite.dates.date[index].dateType = config.dateType;
                        this.datacite.dates.date[index].dateInformation = config.dateInformation;
                        this.datacite.dates.date[index].content = config.dateContent;

                        //Train DataCite - Formats
                        this.datacite.formats = new Object();
                        this.datacite.formats.format = [];
                        this.datacite.formats.format[index] = new Object();
                        this.datacite.formats.format[index].content = config.format;

                        //Train DataCite - RightsList
                        this.datacite.rightsList = new Object();
                        this.datacite.rightsList.rights = [];
                        this.datacite.rightsList.rights[index] = new Object();
                        this.datacite.rightsList.rights[index].rightsURI = config.rightsURI;
                        this.datacite.rightsList.rights[index].content = config.rightsContent;

                        //Train DataCite - Titles
                        this.datacite.titles = new Object();
                        this.datacite.titles.title = [];
                        this.datacite.titles.title[index] = new Object();
                        this.datacite.titles.title[index].content = config.titleContent;
                        this.datacite.titles.title[index].titleType = config.titleType;

                        //Train DataCite - Descriptions
                        this.datacite.descriptions  = new Object();
                        this.datacite.descriptions.description = [];
                        this.datacite.descriptions.description[index] = new Object();
                        this.datacite.descriptions.description[index].descriptionType = config.descriptionType;
                        this.datacite.descriptions.description[index].content = config.descriptionContent;

                        //Train DataCite - Contributors
                        this.datacite.contributors = new Object();
                        this.datacite.contributors.contributor = [];
                        this.datacite.contributors.contributor[index] = new Object();
                        this.datacite.contributors.contributor[index].affiliation = config.contributorAffiliation;
                        this.datacite.contributors.contributor[index].givenName = config.contributorGivenName;
                        this.datacite.contributors.contributor[index].familyName = config.contributorFamilyName;
                        this.datacite.contributors.contributor[index].contributorType = config.contributorType;
                        this.datacite.contributors.contributor[index].contributorName = config.contributorName;
                        this.datacite.contributors.contributor[index].nameIdentifier = new Object();
                        this.datacite.contributors.contributor[index].nameIdentifier.nameIdentifierScheme = config.contributorNameIdentifierScheme;
                        this.datacite.contributors.contributor[index].nameIdentifier.schemeURI = config.contributorNameIdentifierSchemeURI;
                        this.datacite.contributors.contributor[index].nameIdentifier.content = config.contributorNameIdentifierContent;

                        //Train DataCite - FundingReferences
                        this.datacite.fundingReferences = new Object();
                        this.datacite.fundingReferences.fundingReference = [];
                        this.datacite.fundingReferences.fundingReference[index] = new Object();
                        this.datacite.fundingReferences.fundingReference[index].funderName = config.funderName;
                        this.datacite.fundingReferences.fundingReference[index].awardNumber = config.awardNumber;
                        this.datacite.fundingReferences.fundingReference[index].awardTitle = config.awardTitle;
                        this.datacite.fundingReferences.fundingReference[index].funderIdentifier = new Object();
                        this.datacite.fundingReferences.fundingReference[index].funderIdentifier.funderIdentifierType = config.funderIdentifierType;
                        this.datacite.fundingReferences.fundingReference[index].funderIdentifier.content = config.fundingReferenceContent;

                        //Train DataCite - ResourceType
                        this.datacite.resourceType = new Object();
                        this.datacite.resourceType.resourceTypeGeneral = config.resourceTypeGeneral;
                        this.datacite.resourceType.content = config.resourceTypeContent;
                        done();
                    });


            }

            function trainComposer() {
                console.log("2: trainComposer");

                return new Promise(function(done) {
                    msg.message = this.message;
                    msg.train = globalContext.get("msg.train");
                    msg.datacite = this.datacite;
                    done();
                });

            }

            function saveTheTrain() {
                console.log("3: saveTheTrain");
                return new Promise(function(done) {
                    msg.train = globalContext.get("msg.train");
                    var res = request('POST', 'http://0.0.0.0/RepositoryService/train/add/core', {
                        json: msg.train,
                    });
                    msg.train =  JSON.parse(res.getBody('utf8'));
                    globalContext.set("msg.train",msg.train);
                    globalContext.set("trainId",msg.train-internalId);
                    done();
                });
            }

            function saveTheTrain() {
                console.log("4: saveTheTrain");
                return new Promise(function(done) {
                    var trainid = globalContext.get("trainId");
                    msg.train = globalContext.get("msg.train");
                    msg.datacite = globalContext.get("msg.datacite");
                    var res = request('POST', 'http://0.0.0.0/RepositoryService/train/add/datacite/'+trainid, {
                        json: msg.datacite,
                    });
                    msg.train =  JSON.parse(res.getBody('utf8'));
                    globalContext.set("msg.datacite",msg.datacite);
                    globalContext.set("trainId",msg.train-internalId);
                    done();
                });
            }

            function sendTheMessage() {
                return new Promise(function(done) {
                    msg.message = message;
                    msg.train = globalContext.get("msg.train");
                    msg.message.train = msg.train;
                    msg.message.train = msg.datacite;
                    msg.datacite = globalContext.get("msg.datacite");
                    node.send(msg);
                    done();
                });
            }





        });

        // this.on('close', function () {
        //     //TODO remove temp files
        //     msg = null;
        // });
        //


        function getInternalId(){
            var res = request('GET', 'http://0.0.0.0/RepositoryService/train/InternalId');
            var InternalId = res.getBody('utf8');
            return InternalId
        }

        function getInternalPointer(){
            var res = request('GET', 'http://0.0.0.0/RepositoryService/train/InternalPointer');
            var internalPointer = res.getBody('utf8');
            return internalPointer
        }

        function getInternalVersion(){
            var res = request('GET', 'http://0.0.0.0/RepositoryService/train/InternalVersion');
            var internalVersion = res.getBody('utf8');
            return internalVersion
        }

    }
    RED.nodes.registerType("Train",TrainNode);
}