const absolutePath = require('../../helpers/absolute-path');
const ObjectID = require('mongodb').ObjectID;

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
        let contentId;
        try {
            content = extractor(req);
            contentId = req.body._id;
            if (!contentId) {
                missingRequiredFieldsResponse(res, 'Id not provided.');
                return;
            }
        } catch (e) {
            missingRequiredFieldsResponse(res);
            return;
        }

        try {
            await collection.updateOne({ _id: new ObjectID(contentId) }, {
                $set: content
            });
        } catch (e) {
            res.status(503).json({ message: "Update failed to apply." });
            return;
        }

        res.status(200).json({
            message: 'SUCCESS',
            updatedAt: new Date()
        });
    });
};
