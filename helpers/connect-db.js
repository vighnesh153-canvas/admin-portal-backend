const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_DB_URL;

if (!uri) {
    throw new Error('Mongo DB connect URL not specified.');
}

let _db;

const mongoConnect = callback => {
    if (_db) {
        callback(_db);
        return;
    }
    MongoClient
        .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(client => {
            _db = client.db();
            callback(_db);
        })
        .catch(err => {
            console.log('Connection to db failed.');
            throw err;
        });
};

module.exports = mongoConnect;
