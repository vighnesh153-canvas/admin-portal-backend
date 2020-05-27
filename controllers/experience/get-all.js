const mongoConnect = require('../../helpers/connect-db');

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

        let experience;
        try {
            experience = await collection.find().toArray();
        } catch (e) {
            console.log(e);
            res.status(503).json({
                message: "Error occurred while retrieving content of 'experience' collection."
            });
            return;
        }

        res.status(200).json({ experience });
    });
};
