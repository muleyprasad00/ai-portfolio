const { Octokit } = require("@octokit/rest");


const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
});

async function getChangedFiles(event) {

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

async function createReviewComment(event, body) {

    await octokit.pulls.createReview({
        owner: event.repository.owner.login,
        repo: event.repository.name,
        pull_number: event.pull_request.number,

        event: "COMMENT",

        body
    });
}

async function postReviewComment(event, body) {

    await octokit.pulls.createReview({
        owner: event.repository.owner.login,
        repo: event.repository.name,
        pull_number: event.pull_request.number,

        event: "COMMENT",

        body
    });
}

module.exports = {
    getChangedFiles,
    createReviewComment,
    postReviewComment
};