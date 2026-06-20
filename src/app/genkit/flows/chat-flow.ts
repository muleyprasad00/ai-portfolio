// src/genkit/flows/chat-flow.ts

import { z } from 'genkit';
import { ai } from '../genkit';
import { ChatHistoryMessage } from '../../core/interfaces/app.interface';

export const chatFlow = ai.defineFlow(
    {
        name: 'chatFlow',
        inputSchema: z.object({
            prompt: z.string(),
            history: z.array(z.object({
                role: z.enum(['user', 'model']),
                text: z.string(),
            })).default([]),
        }),
    },
    async ({ prompt, history }) => {
        const historyText = (history as ChatHistoryMessage[])
            .map((msg) => (msg.role === 'user' ? `User: ${msg.text}` : `Assistant: ${msg.text}`))
            .join('\n');

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

        return response.text;
    }
);
