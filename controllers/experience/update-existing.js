const ObjectID = require('mongodb').ObjectID;

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
        let jobId;
        try {
            jobDetails = getJobDetails(req);
            jobId = req.body._id;
            if (!jobId) {
                missingRequiredFieldsResponse(res, 'Id not provided.');
                return;
            }
        } catch (e) {
            missingRequiredFieldsResponse(res);
            return;
        }

        try {
            await collection.updateOne({ _id: new ObjectID(jobId) }, {
                $set: jobDetails
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
