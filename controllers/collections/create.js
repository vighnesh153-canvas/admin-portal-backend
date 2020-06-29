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
    try {
        content = extractor(req);
    } catch (e) {
        missingRequiredFieldsResponse(res)
        return;
    }

    content._id = Date.now().toString(10);
    collection.data.splice(content.rank, 0, content);

    let updateFileResponse;
    try {
        updateFileResponse = await updateGist(gistFileName, collection);
    } catch (e) {
        console.log(e);
        res.status(503).json({ message: "Couldn't insert in the gist." });
        return;
    }

    res.status(200).json({
        message: 'SUCCESS',
        documentId: updateFileResponse.id,
        insertedAt: new Date()
    });
};
