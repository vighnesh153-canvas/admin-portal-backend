module.exports = (req, res, next) => {
    const password = req.body.password;
    if (password === process.env.PASSWORD) {
        next();
    } else {
        res.status(401).json({ message: "Aye! Stay the fcuk away from my service." });
    }
};
