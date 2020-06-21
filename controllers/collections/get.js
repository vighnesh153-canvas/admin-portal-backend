const nodeFetch = require('node-fetch');

module.exports = async (req, res) => {
    const { gistDataFetchUrl } = req;

    let collection;
    try {
        const response = await nodeFetch(gistDataFetchUrl);
        collection = await response.json();
    } catch(error) {
        res.status(500).json({ message: "Couldn't retrieve the collection." });
        return
    }

    res.status(200).json({ content: collection.data });
};
