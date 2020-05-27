module.exports = (response, msg) => {
    response.status(406).json({
        message: msg
            ? msg
            : 'Required fields not provided.'
    });
};
