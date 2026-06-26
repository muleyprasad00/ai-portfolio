const fs = require("fs");

const event = JSON.parse(
    fs.readFileSync(process.env.GITHUB_EVENT_PATH, "utf8")
);

const { getChangedFiles } = require("./github");
const { reviewCode } = require("./ai");

async function main() {

    const files = await getChangedFiles(event);

    for (const file of files) {

        if (!file.patch) {
            continue;
        }

        const review = await reviewCode(file.filename, file.patch);

        const reviewResult = JSON.parse(review);

        const comment = buildReviewComment(reviewResult);

        await postReviewComment(event, comment);
    }
}

main();