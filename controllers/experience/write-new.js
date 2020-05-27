const mongoConnect = require('../../helpers/connect-db');
const getJobDetails = require('../../helpers/extract-job-from-request');

const missingRequiredFieldsResponse = require('../../helpers/missing-required-fields-response');

module.exports = (req, res, next) => {
    mongoConnect(async db => {
        let collection;
        try {
            collection = await db.collection('experience');
        } catch (e) {
            console.log(e);
            res.status(503).json({ message: "Couldn't retrieve the collection from DB." });
            return;
        }

        let jobDetails;
        try {
            jobDetails = getJobDetails(req);
        } catch (e) {
            missingRequiredFieldsResponse(res)
            return;
        }

        let insertResponse;
        try {
            insertResponse = await collection.insertOne(jobDetails);
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
