const fs = require("fs");
const { Octokit } = require("@octokit/rest");

const event = JSON.parse(
    fs.readFileSync(process.env.GITHUB_EVENT_PATH, "utf8")
);

const token = process.env.GITHUB_TOKEN;

const octokit = new Octokit({
    auth: token,
});

async function main() {
    const owner = event.repository.owner.login;
    const repo = event.repository.name;
    const pull_number = event.pull_request.number;

    console.log(`Repository: ${owner}/${repo}`);
    console.log(`PR Number: ${pull_number}`);

    const response = await octokit.pulls.listFiles({
        owner,
        repo,
        pull_number,
    });

    console.log("\nChanged Files:");

    response.data.forEach(file => {
        console.log(file.filename);
    });
}

main().catch(console.error);