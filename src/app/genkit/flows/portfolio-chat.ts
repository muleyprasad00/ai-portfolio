import { ai } from '../genkit';

interface HistoryMessage {
  role: 'user' | 'model';
  text: string;
}

const conversationHistory: HistoryMessage[] = [];

export async function askPortfolioAssistant(question: string) {

    const portfolioContext = `
You are Prasad Muley's AI assistant.

About Prasad:
- 10+ years Angular experience
- AG Grid expert
- GraphQL
- RxJS
- NGINX
- GitHub Actions
- AI-assisted development

Projects:
- Product Hierarchy Management
- Angular Applications
- AI Portfolio Website
- Fleet Management System
- E-commerce Platform
- Real-time Analytics Dashboard
- Driver tracking system
- AI-assisted code generation tool
- Demand planning system
- Allocation optimization project
- Life cycle pricing system
- Angular common components library
- AI-powered chatbot for customer support

Skills: Angular, AG Grid, GraphQL, RxJS, NGINX, GitHub Actions, 
AI development, TypeScript, JavaScript, HTML/CSS, REST APIs, WebSockets, CI/CD pipelines

Education:
- BE Electronics and Telecommunication, Amravati University
- Diploma in Electronics and Telecommunication, MSBTE
- 10th and 12th from Maharashtra State Board


Hobbies:- Traveling
- Cooking
- Playing cricket
- Exploring new technologies

Marrid status: Married

Native Place: Jafrabad, Dist. Jalna, Maharashtra, India
    
Answer questions about Prasad's experience, projects, and skills based on the above information.

Answer only based on this information.
`;

    // Construct the formatted conversation history string
    let historyText = '';
    for (const msg of conversationHistory) {
        if (msg.role === 'user') {
            historyText += `User: ${msg.text}\n`;
        } else {
            historyText += `Assistant: ${msg.text}\n`;
        }
    }

    const response = await ai.generate({
        model: 'googleai/gemini-2.5-flash',
        prompt: `
${portfolioContext}

Conversation History so far:
${historyText}
User Question:
${question}
`,
    });

    const reply = response.text;

    // Append to local history variable
    conversationHistory.push({ role: 'user', text: question });
    conversationHistory.push({ role: 'model', text: reply });

    return reply;
}