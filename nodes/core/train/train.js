module.exports = function(RED) {

    var train = require('../lib/train.js');
    var datacite = require('../lib/datacite.js');
    var request = require('sync-request');

    function TrainNode(config) {
        console.log("Starting Train Node");
        RED.nodes.createNode(this,config);
        var node = this;


        // Train Core
        train.name = config.name;
        train.description = config.description;
        train.sourceRepository = config.sourceRepository;
        train.userToken = config.userToken;
        train.internalId = getInternalId();
        train.internalVersion = getInternalVersion();
        train.internalPointer = getInternalPointer();
        train.wagons = new Object();
        train.wagons.wagon = [];

        //Train DataCite Core
        datacite.language = config.language;
        datacite.version = config.version;
        datacite.publicationYear = config.publicationYear;
        datacite.publisher = config.publisher;


        //Train DataCite - Identifier
        datacite.identifier = new Object();
        datacite.identifier.identifierType = config.identifierType;
        datacite.identifier.content = config.identifierContent;

        //Train DataCite - Creators
        datacite.creators = [];
        datacite.creators.creator = new Object();
        datacite.creators.creator.affiliation = config.creatorAffiliation;
        datacite.creators.creator.givenName = config.creatorGivenName;
        datacite.creators.creator.familyName = config.creatorFamilyName;
        datacite.creators.creator.creatorName = new Object();
        datacite.creators.creator.creatorName.nameType = config.nameType;
        datacite.creators.creator.creatorName.content = config.creatorContent;
        datacite.creators.creator.nameIdentifier = new Object();
        datacite.creators.creator.nameIdentifier.nameIdentifierScheme = config.creatorNameIdentifierScheme;
        datacite.creators.creator.nameIdentifier.schemeURI = config.creatorSchemeURI;
        datacite.creators.creator.nameIdentifier.content = config.nameIdentifierContent;

        //Train DataCite - Subjects
        datacite.subjects = [];
        datacite.subjects.subject = new Object();
        datacite.subjects.subject.schemeURI = config.subjectSchemeURI;
        datacite.subjects.subject.content = config.subjectContent;
        datacite.subjects.subject.subjectScheme = config.subjectScheme;

        //Train DataCite - Dates
        datacite.dates = [];
        datacite.dates.date = new Object();
        datacite.dates.date.dateType = config.dateType;
        datacite.dates.date.dateInformation = config.dateInformation;
        datacite.dates.date.content = config.dateContent;

        //Train DataCite - Formats
        datacite.formats = [];
        datacite.formats.format = new Object();
        datacite.formats.format.content = config.format;

        //Train DataCite - RightsList
        datacite.rightsList = [];
        datacite.rightsList.rights = new Object();
        datacite.rightsList.rights.rightsURI = config.rightsURI;
        datacite.rightsList.rights.content = config.rightsContent;

        //Train DataCite - Titles
        datacite.titles = [];
        datacite.titles.title = new Object();
        datacite.titles.title.content = config.titleContent;
        datacite.titles.title.titleType = config.titleType;

        //Train DataCite - Descriptions
        datacite.descriptions = [];
        datacite.descriptions.description = new Object();
        datacite.descriptions.description.descriptionType = config.descriptionType;
        datacite.descriptions.description.content = config.descriptionContent;

        //Train DataCite - Contributors
        datacite.contributors = [];
        datacite.contributors.contributor = new Object();
        datacite.contributors.contributor.affiliation = config.contributorAffiliation;
        datacite.contributors.contributor.givenName = config.contributorGivenName;
        datacite.contributors.contributor.familyName = config.contributorFamilyName;
        datacite.contributors.contributor.contributorType = config.contributorType;
        datacite.contributors.contributor.contributorName = config.contributorName;
        datacite.contributors.contributor.nameIdentifier = new Object();
        datacite.contributors.contributor.nameIdentifier.nameIdentifierScheme = config.contributorNameIdentifierScheme;
        datacite.contributors.contributor.nameIdentifier.schemeURI = config.contributorNameIdentifierSchemeURI;
        datacite.contributors.contributor.nameIdentifier.content = config.contributorNameIdentifierContent;

        //Train DataCite - FundingReferences
        datacite.fundingReferences = [];
        datacite.fundingReferences.fundingReference = new Object();
        datacite.fundingReferences.fundingReference.funderName = config.funderName;
        datacite.fundingReferences.fundingReference.awardNumber = config.awardNumber;
        datacite.fundingReferences.fundingReference.awardTitle = config.awardTitle;
        datacite.fundingReferences.fundingReference.funderIdentifier = new Object();
        datacite.fundingReferences.fundingReference.funderIdentifier.funderIdentifierType = config.funderIdentifierType;
        datacite.fundingReferences.fundingReference.funderIdentifier.content = config.fundingReferenceContent;

        //Train DataCite - ResourceType
        datacite.resourceType = new Object();
        datacite.resourceType.resourceTypeGeneral = config.resourceTypeGeneral;
        datacite.resourceType.content = config.resourceTypeContent;



        this.on('input', function(msg) {

            datacite.creators.push(datacite.creators.creator);
            datacite.subjects.push(datacite.subjects.subject);
            datacite.dates.push(datacite.dates.date);
            datacite.formats.push(datacite.formats.format);
            datacite.rightsList.push(datacite.rightsList.rights);
            datacite.titles.push(datacite.titles.title);
            datacite.descriptions.push(datacite.descriptions.description);
            datacite.contributors.push(datacite.contributors.contributor);
            datacite.fundingReferences.push(datacite.fundingReferences.fundingReference);

            train.datacite = datacite;
            train.wagons = train.wagons;
            msg.train = train;

            node.send(msg);
        });

        function getInternalId(){
            var res = request('GET', 'http://0.0.0.0/RepositoryService/train/InternalId');
            var internalId = res.getBody('utf8');
            return internalId
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