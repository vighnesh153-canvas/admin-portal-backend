const nodeFetch = require('node-fetch');

const absolutePath = require('../../helpers/absolute-path');
const updateGist = require(absolutePath('helpers/update-gist'));

module.exports = async (req, res) => {
    const { gistDataFetchUrl, gistFileName } = req;
    const { entryId } = req.body;

    if (entryId === undefined) {
        res.status(406).json({ message: 'Missing required fields.' });
        return;
    }

    let collection;
    try {
        const response = await nodeFetch(gistDataFetchUrl);
        collection = await response.json();
    } catch(error) {
        res.status(500).json({ message: "Couldn't retrieve the collection." });
        return
    }

    collection.data = collection.data.filter(item => item._id !== entryId);
    try {
        await updateGist(gistFileName, collection);
    } catch (e) {
        res.status(503).json({ message: "Update failed to apply." });
        return;
    }

    res.status(200).json({
        message: 'SUCCESS',
        deletedAt: new Date()
    });
};
