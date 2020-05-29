const absolutePath = require('../../helpers/absolute-path');

const mongoConnect = require(absolutePath('helpers/connect-db'));
const ObjectID = require('mongodb').ObjectID;

module.exports = (req, res, next) => {
    const { collectionName } = req;
    const { entryId } = req.body;

    if (entryId === undefined) {
        res.status(406).json({ message: 'Missing required fields.' });
        return;
    }

    const objectId = new ObjectID(entryId);

    mongoConnect(async db => {
        let collection;
        try {
            collection = await db.collection(collectionName);
        } catch (e) {
            console.log(e);
            res.status(503).json({ message: "Couldn't retrieve the collection from DB." });
            return;
        }

        try {
            await collection.deleteOne({ _id: objectId });
        } catch (e) {
            console.log(e);
            res.status(503).json({
                message: `Error occurred while deleting entry from '${collectionName}' collection.`
            });
            return;
        }

        res.status(200).json({
            message: 'SUCCESS',
            deletedAt: new Date()
        });
    });
};
