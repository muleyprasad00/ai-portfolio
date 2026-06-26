const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.G_MODELS_TOKEN,
    baseURL: "https://models.inference.ai.azure.com",
});
async function reviewCode(filename, code) {
    const response = await client.chat.completions.create({
        model: "gpt-4.1-mini",
        response_format: {
            type: "json_object"
        },
        temperature: 0,
        messages: [
            {
                role: "system",
                content: `
You are a Senior Application Security Engineer.

Always return ONLY valid JSON.

Never return markdown.
Never return explanations.
Never wrap JSON in \`\`\`.
`
            },
            {
                role: "user",
                content: `
Review the following code for security vulnerabilities.

File:
${filename}

Code:
${code}

Look for:

- SQL Injection
- XSS
- Hardcoded Secrets
- Authentication issues
- Authorization issues
- SSRF
- Command Injection
- Path Traversal
- Insecure Dependencies
- Angular security issues
- Node.js security issues

Return ONLY this JSON:

{
  "summary": "Short review summary",
  "issues": [
    {
      "severity": "LOW | MEDIUM | HIGH | CRITICAL",
      "title": "",
      "description": "",
      "fix": "",
      "line": 0
    }
  ]
}

If no issues exist:

{
  "summary": "No security issues found.",
  "issues": []
}
`
            }
        ]
    });

    return response.choices[0].message.content;
}
module.exports = { reviewCode };