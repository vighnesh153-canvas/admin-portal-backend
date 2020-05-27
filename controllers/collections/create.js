const absolutePath = require('../../helpers/absolute-path');

const mongoConnect = require(absolutePath('helpers/connect-db'));

const missingRequiredFieldsResponse =
    require(absolutePath('helpers/missing-required-fields-response'));

module.exports = (req, res, next) => {
    const { collectionName, extractor } = req;

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
            content = extractor(req);
        } catch (e) {
            missingRequiredFieldsResponse(res)
            return;
        }

        let insertResponse;
        try {
            insertResponse = await collection.insertOne(content);
        } catch (e) {
            console.log(e);
            res.status(503).json({ message: "Couldn't insert in the DB collection." });
            return;
        }

        res.status(200).json({
            message: 'SUCCESS',
            documentId: insertResponse.insertedId,
            insertedAt: new Date()
        });
    });
};
