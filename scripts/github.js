const { Octokit } = require("@octokit/rest");

async function getChangedFiles(event) {
    const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN
    });

    const owner = event.repository.owner.login;
    const repo = event.repository.name;
    const pull_number = event.pull_request.number;

    const response = await octokit.pulls.listFiles({
        owner,
        repo,
        pull_number
    });

    return response.data;
}

module.exports = {
    getChangedFiles
};