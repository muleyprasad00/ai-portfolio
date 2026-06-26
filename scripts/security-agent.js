const fs = require("fs");

// GitHub provides a JSON file with event details
const event = JSON.parse(
    fs.readFileSync(process.env.GITHUB_EVENT_PATH, "utf8")
);

console.log("=== PR Information ===");
console.log("PR Number:", event.pull_request.number);
console.log("Title:", event.pull_request.title);
console.log("Author:", event.pull_request.user.login);
console.log("Base Branch:", event.pull_request.base.ref);
console.log("Source Branch:", event.pull_request.head.ref);