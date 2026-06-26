function buildReviewComment(review) {

    let comment = `# 🤖 AI Security Review

${review.summary}

`;

    if (review.issues.length === 0) {
        comment += "✅ No security issues found.";
        return comment;
    }

    for (const issue of review.issues) {

        comment += `
## ${issue.severity}

### ${issue.title}

${issue.description}

**Suggested Fix**

${issue.fix}

---
`;
    }

    return comment;
}

module.exports = {
    buildReviewComment
};