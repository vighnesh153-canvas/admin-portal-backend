const getJobDetails = request => {
    const { company, role, duration, summary, tasks } = request.body;
    if (!company || !role || !duration || !summary || !tasks) {
        throw new Error('Missing information.');
    }
    return { company, role, duration, summary, tasks };
};

module.exports = getJobDetails;
