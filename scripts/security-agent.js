const fs = require("fs");
const { Octokit } = require("@octokit/rest");
const { reviewCode } = require("./ai");
const path = require("path");

const event = JSON.parse(
    fs.readFileSync(process.env.GITHUB_EVENT_PATH, "utf8")
);

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

async function main() {
    const owner = event.repository.owner.login;
    const repo = event.repository.name;
    const pull_number = event.pull_request.number;

    const response = await octokit.pulls.listFiles({
        owner,
        repo,
        pull_number,
    });

    console.log("========== Changed Files ==========\n");

    for (const file of response.data) {
        console.log(`File: ${file.filename}`);

        try {
            console.log("Current directory:", process.cwd());
            console.log("Trying to read:", file.filename);

            const fullPath = path.join(process.cwd(), file.filename);

            console.log(fullPath);

            // const content = fs.readFileSync(file.filename, "utf8");
            const content = fs.readFileSync(fullPath, "utf8");

            console.log(`Reviewing ${file.filename}`);

            const result = await reviewCode(file.filename, content);

            console.log(result);
        } catch (err) {
            console.log(`Cannot read ${file.filename}`);
        }
    }
}

main().catch(console.error);