const absolutePath = require('../../helpers/absolute-path');

const experienceExtractor = require(
    absolutePath('controllers/collections/request-info-extractors/job')
);
const projectExtractor = require(
    absolutePath('controllers/collections/request-info-extractors/project')
);

const extractors = {
    'projects': projectExtractor,
    'experience': experienceExtractor
}

module.exports = (collectionName) => {
    return (req, res, next) => {
        req.collectionName = collectionName;
        req.extractor = extractors[collectionName];
        next();
    }
};
