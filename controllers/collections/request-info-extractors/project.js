const getJobDetails = request => {
    const { title, rank, routeLink, clientId, isLinkAbsolute, description, items } =
        request.body;
    if (title === undefined ||
        rank === undefined ||
        routeLink === undefined ||
        clientId === undefined ||
        description === undefined ||
        items === undefined ||
        isLinkAbsolute === undefined) {
        throw new Error('Missing project information.');
    }
    return { title, rank, routeLink, clientId, isLinkAbsolute, description, items };
};

module.exports = getJobDetails;
