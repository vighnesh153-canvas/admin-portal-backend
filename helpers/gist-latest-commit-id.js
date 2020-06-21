const nodeFetch = require('node-fetch');

module.exports = () => {
    return nodeFetch(process.env.GIST_SUBMIT_URL +
        '?abc=' + Math.random())
        .then(res => res.json())
        .then(data => {
            const latestCommit = data.history[0];
            return latestCommit.version;
        });
};
