const getJobDetails = request => {
    const { company, role, duration, summary, tasks } = request.body;
    if (company === undefined ||
        role === undefined ||
        duration === undefined ||
        summary === undefined ||
        tasks === undefined) {
        throw new Error('Missing job information.');
    }
    return { company, role, duration, summary, tasks };
};

module.exports = getJobDetails;
