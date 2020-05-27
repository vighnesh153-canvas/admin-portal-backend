const getJobDetails = request => {
    const { title, routeLink, clientId, isLinkAbsolute, description, items } = request.body;
    if (title === undefined ||
        routeLink === undefined ||
        clientId === undefined ||
        description === undefined ||
        items === undefined ||
        isLinkAbsolute === undefined) {
        throw new Error('Missing project information.');
    }
    return { title, routeLink, clientId, isLinkAbsolute, description, items };
};

module.exports = getJobDetails;
