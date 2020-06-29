const nodeFetch = require('node-fetch');
const absolutePath = require('../../helpers/absolute-path');

const missingRequiredFieldsResponse =
    require(absolutePath('helpers/missing-required-fields-response'));
const updateGist = require(absolutePath('helpers/update-gist'));

module.exports = async (req, res) => {
    const { gistFileName, gistDataFetchUrl, extractor } = req;

    let collection;
    try {
        const response = await nodeFetch(gistDataFetchUrl);
        collection = await response.json();
    } catch(error) {
        res.status(500).json({ message: "Couldn't retrieve the collection." });
        return
    }

    if (collection.hasOwnProperty('data') === false) {
        collection.data = [];
    }

    let content;
    let contentId;
    try {
        content = extractor(req);
        contentId = req.body._id;
        if (!contentId) {
            missingRequiredFieldsResponse(res, 'Id not provided.');
            return;
        }
    } catch (e) {
        missingRequiredFieldsResponse(res)
        return;
    }

    for (let i = 0; i < collection.data.length; i++) {
        if (collection.data[i]._id === contentId) {
            collection.data[i] = content;
            collection.data[i]._id = contentId;
            collection.data.splice(i, 1);
            const rank = Math.min(content.rank, collection.data.length);
            collection.data.splice(rank, 0, content);
            content._id = contentId
            break;
        }
    }

    try {
        await updateGist(gistFileName, collection);
    } catch (e) {
        res.status(503).json({ message: "Update failed to apply." });
        return;
    }

    res.status(200).json({
        message: 'SUCCESS',
        updatedAt: new Date()
    });
};
