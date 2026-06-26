const OpenAI = require("openai");
console.log(!!process.env.G_MODELS_TOKEN);
const client = new OpenAI({
    apiKey: process.env.G_MODELS_TOKEN,
});

async function reviewCode(filename, code) {
    console.log("G_MODELS_TOKEN exists:", !!process.env.G_MODELS_TOKEN);
    const response = await client.responses.create({
        model: "gpt-4.1-mini",
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