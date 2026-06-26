const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.G_MODELS_TOKEN,
    baseURL: "https://models.inference.ai.azure.com",
});

async function reviewCode(filename, code) {
    const response = await client.chat.completions.create({
        model: "gpt-4.1-mini",
        messages: [
            {
                role: "system",
                content: "You are a senior security engineer."
            },
            {
                role: "user",
                content: `Review this code:\n\n${code}`
            }
        ]
    });

    return response.choices[0].message.content;
}

module.exports = { reviewCode };