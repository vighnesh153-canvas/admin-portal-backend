const nodeFetch = require('node-fetch');

module.exports = (fileName, content) => {
    const body = {
        files: {
            [fileName]: {
                content: JSON.stringify(content)
            }
        }
    };
    return nodeFetch(process.env.GIST_SUBMIT_URL, {
        method: 'post',
        body:    JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'token ' + process.env.GIST_CMS_TOKEN
        },
    }).then(res => res.json());
};
