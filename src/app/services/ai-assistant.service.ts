import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { ChatHistoryMessage, ChatMessage } from '../core/interfaces/app.interface';
import {
    ABOUT_INFO,
    MOCK_EXPERIENCE,
    MOCK_PROJECTS,
    MOCK_SKILLS,
    contactInfo,
} from '../core/constants/mock-data';

@Injectable({
    providedIn: 'root',
})
export class AiAssistantService {
    private messagesSubject = new BehaviorSubject<ChatMessage[]>([]);
    readonly messages$ = this.messagesSubject.asObservable();

    getMessages(): Observable<ChatMessage[]> {
        return this.messages$;
    }

    addMessage(text: string, sender: 'user' | 'assistant'): string {
        const id = Date.now().toString() + Math.random().toString(36).substring(2, 9);
        const message: ChatMessage = {
            id,
            text,
            sender,
            timestamp: new Date(),
        };
        const current = this.messagesSubject.value;
        this.messagesSubject.next([...current, message]);
        return id;
    }

    clearMessages(): void {
        this.messagesSubject.next([]);
    }

    sendMessage(text: string): Observable<string> {
        return new Observable<string>((observer) => {
            const history = this.buildHistory();
            const fallback = () => {
                const response = this.buildResponse(text);
                this.emitChunks(response, observer);
            };

            fetch('/api/genkit-stream', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: text, history }),
            })
                .then(async (res) => {
                    if (!res.ok) {
                        throw new Error(`Request failed with status ${res.status}`);
                    }

                    const answer = await res.text();
                    this.emitChunks(answer, observer);
                })
                .catch(() => fallback());

            return () => {
                // No-op: chunk emission is timer-based.
            };
        });
    }

    /**
     * Update a specific message by its ID.
     */
    updateMessageText(id: string, text: string): void {
        const current = this.messagesSubject.value.map((msg) => {
            if (msg.id === id) {
                return { ...msg, text, timestamp: new Date() };
            }
            return msg;
        });
        this.messagesSubject.next(current);
    }

    private buildResponse(question: string): string {
        const normalized = question.toLowerCase();
        const skills = MOCK_SKILLS.map((skill) => skill.name).join(', ');
        const featuredProjects = MOCK_PROJECTS.filter((project) => project.featured)
            .map((project) => project.title)
            .join(', ');
        const experienceSummary = MOCK_EXPERIENCE
            .map((item) => `${item.position} at ${item.company}`)
            .join('; ');

        if (
            normalized.includes('skill') ||
            normalized.includes('stack') ||
            normalized.includes('technology') ||
            normalized.includes('tech')
        ) {
            return `Prasad's core stack includes ${skills}.`;
        }

        if (normalized.includes('project') || normalized.includes('work') || normalized.includes('build')) {
            return `Featured projects include ${featuredProjects}.`;
        }

        if (
            normalized.includes('experience') ||
            normalized.includes('company') ||
            normalized.includes('role') ||
            normalized.includes('job')
        ) {
            return `${experienceSummary}. ${ABOUT_INFO.subtitle}`;
        }

        if (
            normalized.includes('contact') ||
            normalized.includes('email') ||
            normalized.includes('phone') ||
            normalized.includes('reach')
        ) {
            return `You can reach ${contactInfo.name} at ${contactInfo.email} or ${contactInfo.phone}, based in ${contactInfo.address}.`;
        }

        if (normalized.includes('about') || normalized.includes('summary')) {
            return ABOUT_INFO.summary;
        }

        return `I can answer questions about skills, projects, experience, or contact details. Try asking about Angular, AG Grid, GraphQL, or recent work.`;
    }

    private buildHistory(): ChatHistoryMessage[] {
        return this.messagesSubject.value
            .filter((message) => message.text.trim().length > 0)
            .map((message) => ({
                role: message.sender === 'user' ? 'user' : 'model',
                text: message.text,
            }));
    }

    private emitChunks(text: string, observer: Subscriber<string>): void {
        const chunks = text.split(/(\s+)/);
        let accumulated = '';
        let index = 0;

        const timerId = setInterval(() => {
            if (index >= chunks.length) {
                clearInterval(timerId);
                observer.complete();
                return;
            }

            accumulated += chunks[index];
            index += 1;
            observer.next(accumulated);
        }, 22);

        observer.add(() => clearInterval(timerId));
    }
}
