const getJobDetails = request => {
    const { company, role, duration, summary, tasks, rank } = request.body;
    if (company === undefined ||
        role === undefined ||
        rank === undefined ||
        duration === undefined ||
        summary === undefined ||
        tasks === undefined) {
        throw new Error('Missing job information.');
    }
    return { company, rank, role, duration, summary, tasks };
};

module.exports = getJobDetails;
