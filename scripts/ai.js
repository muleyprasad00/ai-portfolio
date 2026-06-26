const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function reviewCode(filename, code) {
    console.log("OPENAI_API_KEY exists:", !!process.env.OPENAI_API_KEY);
    const response = await client.responses.create({
        model: "gpt-5.5",
        input: `
You are a Senior Application Security Engineer.

Review the following code for security vulnerabilities.

File: ${filename}

Code:

${code}

Return ONLY valid JSON in this format:

{
  "issues": [
    {
      "severity": "High",
      "description": "...",
      "fix": "..."
    }
  ]
}

If there are no issues return:

{
  "issues":[]
}
`
    });

    return response.output_text;
}

module.exports = {
    reviewCode,
};