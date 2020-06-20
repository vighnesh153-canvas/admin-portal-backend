const absolutePath = require('../../helpers/absolute-path');

const experienceExtractor = require(
    absolutePath('controllers/collections/request-info-extractors/job')
);
const projectExtractor = require(
    absolutePath('controllers/collections/request-info-extractors/project')
);

const latestCommitId = require(
    absolutePath('helpers/gist-latest-commit-id')
);

const extractors = {
    'projects.json': projectExtractor,
    'experience.json': experienceExtractor
}

module.exports = (fileName="__vighnesh153.com.txt") => {
    return async (req, res, next) => {
        req.gistFileName = fileName;
        req.gistDataFetchUrl =
            process.env.GIST_FETCH_URL +
            (await latestCommitId()) + "/" +
            fileName;
        req.extractor = extractors[fileName];
        next();
    }
};
