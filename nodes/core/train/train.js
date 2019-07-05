module.exports = function(RED) {

    var message = require('../lib/Message.js');
    var request = require('sync-request');

    function TrainNode(config) {
        console.log("Starting Train Node");
        RED.nodes.createNode(this,config);
        var node = this;


        // Train Core
        message = new Object();
        message.train = new Object();
        message.train.name = config.name;
        message.train.description = config.description;
        message.train.sourceRepository = config.sourceRepository;
        message.train.userToken = config.userToken;
        message.train.internalId = getInternalId();
        message.train.internalVersion = getInternalVersion();
        message.train.internalPointer = getInternalPointer();

        //Train DataCite Core
        message.train.datacite = new Object();
        message.train.language = config.language;
        message.train.version = config.version;
        message.train.publicationYear = config.publicationYear;
        message.train.publisher = config.publisher;


        //Train DataCite - Identifier
        message.train.datacite.identifier = new Object();
        message.train.datacite.identifier.identifierType = config.identifierType;
        message.train.datacite.identifier.content = config.identifierContent;

        //Train DataCite - Creators
        message.train.datacite.creators = [];
        message.train.datacite.creators.creator = new Object();
        message.train.datacite.creators.creator.affiliation = config.creatorAffiliation;
        message.train.datacite.creators.creator.givenName = config.creatorGivenName;
        message.train.datacite.creators.creator.familyName = config.creatorFamilyName;
        message.train.datacite.creators.creator.creatorName = new Object();
        message.train.datacite.creators.creator.creatorName.nameType = config.nameType;
        message.train.datacite.creators.creator.creatorName.content = config.creatorContent;
        message.train.datacite.creators.creator.nameIdentifier = new Object();
        message.train.datacite.creators.creator.nameIdentifier.nameIdentifierScheme = config.creatorNameIdentifierScheme;
        message.train.datacite.creators.creator.nameIdentifier.schemeURI = config.creatorSchemeURI;
        message.train.datacite.creators.creator.nameIdentifier.content = config.nameIdentifierContent;

        //Train DataCite - Subjects
        message.train.datacite.subjects = [];
        message.train.datacite.subjects.subject = new Object();
        message.train.datacite.subjects.subject.schemeURI = config.subjectSchemeURI;
        message.train.datacite.subjects.subject.content = config.subjectContent;
        message.train.datacite.subjects.subject.subjectScheme = config.subjectScheme;

        //Train DataCite - Dates
        message.train.datacite.dates = [];
        message.train.datacite.dates.date = new Object();
        message.train.datacite.dates.date.dateType = config.dateType;
        message.train.datacite.dates.date.dateInformation = config.dateInformation;
        message.train.datacite.dates.date.content = config.dateContent;

        //Train DataCite - Formats
        message.train.datacite.formats = [];
        message.train.datacite.formats.format = new Object();
        message.train.datacite.formats.format.content = config.format;

        //Train DataCite - RightsList
        message.train.datacite.rightsList = [];
        message.train.datacite.rightsList.rights = new Object();
        message.train.datacite.rightsList.rights.rightsURI = config.rightsURI;
        message.train.datacite.rightsList.rights.content = config.rightsContent;

        //Train DataCite - Titles
        message.train.datacite.titles = [];
        message.train.datacite.titles.title = new Object();
        message.train.datacite.titles.title.content = config.titleContent;
        message.train.datacite.titles.title.titleType = config.titleType;

        //Train DataCite - Descriptions
        message.train.datacite.descriptions = [];
        message.train.datacite.descriptions.description = new Object();
        message.train.datacite.descriptions.description.descriptionType = config.descriptionType;
        message.train.datacite.descriptions.description.content = config.descriptionContent;

        //Train DataCite - Contributors
        message.train.datacite.contributors = [];
        message.train.datacite.contributors.contributor = new Object();
        message.train.datacite.contributors.contributor.affiliation = config.contributorAffiliation;
        message.train.datacite.contributors.contributor.givenName = config.contributorGivenName;
        message.train.datacite.contributors.contributor.familyName = config.contributorFamilyName;
        message.train.datacite.contributors.contributor.contributorType = config.contributorType;
        message.train.datacite.contributors.contributor.contributorName = config.contributorName;
        message.train.datacite.contributors.contributor.nameIdentifier = new Object();
        message.train.datacite.contributors.contributor.nameIdentifier.nameIdentifierScheme = config.contributorNameIdentifierScheme;
        message.train.datacite.contributors.contributor.nameIdentifier.schemeURI = config.contributorNameIdentifierSchemeURI;
        message.train.datacite.contributors.contributor.nameIdentifier.content = config.contributorNameIdentifierContent;

        //Train DataCite - FundingReferences
        message.train.datacite.fundingReferences = [];
        message.train.datacite.fundingReferences.fundingReference = new Object();
        message.train.datacite.fundingReferences.fundingReference.funderName = config.funderName;
        message.train.datacite.fundingReferences.fundingReference.awardNumber = config.awardNumber;
        message.train.datacite.fundingReferences.fundingReference.awardTitle = config.awardTitle;
        message.train.datacite.fundingReferences.fundingReference.funderIdentifier = new Object();
        message.train.datacite.fundingReferences.fundingReference.funderIdentifier.funderIdentifierType = config.funderIdentifierType;
        message.train.datacite.fundingReferences.fundingReference.funderIdentifier.content = config.fundingReferenceContent;

        //Train DataCite - ResourceType
        message.train.datacite.resourceType = new Object();
        message.train.datacite.resourceType.resourceTypeGeneral = config.resourceTypeGeneral;
        message.train.datacite.resourceType.content = config.resourceTypeContent;



        //console.log("creators after new Object: "+JSON.stringify(message.datacite.creators.creator));
        //console.log("datacite after new Object: "+JSON.stringify(message.datacite));
        //console.log("message=> "+JSON.stringify(message));

        this.on('input', function(msg) {
            message.train.datacite.creators.push(message.train.datacite.creators.creator);
            message.train.datacite.subjects.push(message.train.datacite.subjects.subject);
            message.train.datacite.dates.push(message.train.datacite.dates.date);
            message.train.datacite.formats.push(message.train.datacite.formats.format);
            message.train.datacite.rightsList.push(message.train.datacite.rightsList.rights);
            message.train.datacite.titles.push(message.train.datacite.titles.title);
            message.train.datacite.descriptions.push(message.train.datacite.descriptions.description);
            message.train.datacite.contributors.push(message.train.datacite.contributors.contributor);
            message.train.datacite.fundingReferences.push(message.train.datacite.fundingReferences.fundingReference);

            msg.message = message;
            node.send(msg);
        });

        function getInternalId(){
            var res = request('GET', 'http://menzel.informatik.rwth-aachen.de/trainDORepository/train/InternalId');
            var internalId = res.getBody('utf8');
            return internalId
        }

        function getInternalPointer(){
            var res = request('GET', 'http://menzel.informatik.rwth-aachen.de/trainDORepository/train/InternalPointer');
            var internalPointer = res.getBody('utf8');
            return internalPointer
        }

        function getInternalVersion(){
            var res = request('GET', 'http://menzel.informatik.rwth-aachen.de/trainDORepository/train/InternalVersion');
            var internalVersion = res.getBody('utf8');
            return internalVersion
        }

    }
    RED.nodes.registerType("Train",TrainNode);
}