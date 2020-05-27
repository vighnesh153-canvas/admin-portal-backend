const absolutePath = require('../../helpers/absolute-path');

const mongoConnect = require(absolutePath('helpers/connect-db'));

module.exports = (req, res, next) => {
    const { collectionName } = req;

    mongoConnect(async db => {
        let collection;
        try {
            collection = await db.collection(collectionName);
        } catch (e) {
            console.log(e);
            res.status(503).json({ message: "Couldn't retrieve the collection from DB." });
            return;
        }

        let content;
        try {
            content = await collection.find().toArray();
        } catch (e) {
            console.log(e);
            res.status(503).json({
                message: `Error occurred while retrieving content of '${collectionName}' collection.`
            });
            return;
        }

        res.status(200).json({ content });
    });
};
