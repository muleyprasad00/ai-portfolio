const fs = require("fs");
const { Octokit } = require("@octokit/rest");
const { reviewCode } = require("./ai");
const path = require("path");
const { reviewExtensions, skipFiles, skipFolders } = require("./config");


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

        // Skip files based on configuration
        if (skipFiles.includes(file.filename)) {
            console.log(`Skipping ${file.filename}`);
            continue;
        }

        // Skip files in skipped folders
        if (skipFolders.some((folder) => file.filename.startsWith(folder))) {
            console.log(`Skipping ${file.filename}`);
            continue;
        }

        // Only review files with specified extensions
        if (!reviewExtensions.some((ext) => file.filename.endsWith(ext))) {
            console.log(`Skipping ${file.filename}`);
            continue;
        }

        try {
            const fullPath = path.join(process.cwd(), file.filename);

            console.log(fullPath);

            const content = fs.readFileSync(fullPath, "utf8");

            console.log(`Reviewing ${file.filename}`);

            const result = await reviewCode(file.filename, content);

        } catch (err) {
            console.error(`Cannot read ${file.filename}`);
            console.error(err);
            console.error(err.stack);
        }
    }
}

main().catch(console.error);