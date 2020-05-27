module.exports = function(req, res, next) {
    res.send(`<h2>${req.collectionName} routes root.</h2>`);
};
