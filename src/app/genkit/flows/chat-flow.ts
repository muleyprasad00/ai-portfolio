// src/genkit/flows/chat-flow.ts

import { z } from 'genkit';
import { ai } from '../genkit';

interface HistoryMessage {
  role: 'user' | 'model';
  text: string;
}

const conversationHistory: HistoryMessage[] = [];

export const chatFlow = ai.defineFlow(
    {
        name: 'chatFlow',
        inputSchema: z.object({
            prompt: z.string(),
        }),
    },
    async ({ prompt }) => {
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
            prompt: `
      You are Prasad Muley's portfolio assistant.

      Prasad:
      - 6+ years Angular
      - AG Grid expert
      - GraphQL
      - NGINX
      - GitHub Actions
      - AI-assisted development

      Conversation History so far:
      ${historyText}
      User Question:
      ${prompt}
      `,
        });

        const reply = response.text;

        // Append to local history variable
        conversationHistory.push({ role: 'user', text: prompt });
        conversationHistory.push({ role: 'model', text: reply });

        return reply;
    }
);