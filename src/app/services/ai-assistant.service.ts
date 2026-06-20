import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import {
    ChatHistoryMessage,
    ChatMessage,
    PortfolioFaqItem,
    PortfolioSearchResult,
} from '../core/interfaces/app.interface';
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
    private backendAvailableSubject = new BehaviorSubject<boolean>(true);
    readonly messages$ = this.messagesSubject.asObservable();
    readonly backendAvailable$ = this.backendAvailableSubject.asObservable();

    private readonly faqItems: PortfolioFaqItem[] = [
        { question: 'What are the core skills?', query: 'skills' },
        { question: 'Which projects stand out?', query: 'featured projects' },
        { question: 'Tell me about the work history', query: 'experience' },
        { question: 'How can I contact Prasad?', query: 'contact' },
        { question: 'What is the tech stack?', query: 'technology stack' },
    ];

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
                this.backendAvailableSubject.next(false);
                const response = this.buildFallbackAnswer(text);
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

                    this.backendAvailableSubject.next(true);
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
        return this.buildFallbackAnswer(question);
    }

    private buildHistory(): ChatHistoryMessage[] {
        return this.messagesSubject.value
            .filter((message) => message.text.trim().length > 0)
            .map((message) => ({
                role: message.sender === 'user' ? 'user' : 'model',
                text: message.text,
            }));
    }

    getFaqItems(): PortfolioFaqItem[] {
        return [...this.faqItems];
    }

    searchPortfolio(query: string): PortfolioSearchResult[] {
        const normalizedQuery = query.trim().toLowerCase();

        if (!normalizedQuery) {
            return this.getDefaultSearchResults();
        }

        const scoredResults: Array<{ result: PortfolioSearchResult; score: number }> = [];

        const score = (text: string): number => {
            const haystack = text.toLowerCase();
            let total = 0;

            if (haystack.includes(normalizedQuery)) {
                total += 6;
            }

            for (const token of normalizedQuery.split(/\s+/).filter(Boolean)) {
                if (haystack.includes(token)) {
                    total += 1;
                }
            }

            return total;
        };

        for (const skill of MOCK_SKILLS) {
            const result: PortfolioSearchResult = {
                id: `skill-${skill.id}`,
                type: 'Skill',
                title: skill.name,
                summary: skill.description ?? `${skill.name} is listed in the portfolio skill set.`,
            };
            const total = score([skill.name, skill.category, skill.description ?? ''].join(' '));
            if (total > 0) {
                scoredResults.push({ result, score: total });
            }
        }

        for (const project of MOCK_PROJECTS) {
            const result: PortfolioSearchResult = {
                id: `project-${project.id}`,
                type: 'Project',
                title: project.title,
                summary: project.shortDescription || project.description,
            };
            const total = score(
                [
                    project.title,
                    project.description,
                    project.shortDescription,
                    project.category ?? '',
                    project.technologies.join(' '),
                ].join(' '),
            );
            if (total > 0) {
                scoredResults.push({ result, score: total });
            }
        }

        for (const experience of MOCK_EXPERIENCE) {
            const result: PortfolioSearchResult = {
                id: `experience-${experience.id}`,
                type: 'Experience',
                title: `${experience.position} - ${experience.company}`,
                summary: experience.description,
            };
            const total = score(
                [
                    experience.position,
                    experience.company,
                    experience.description,
                    ...(experience.technologies ?? []),
                ].join(' '),
            );
            if (total > 0) {
                scoredResults.push({ result, score: total });
            }
        }

        const profileResult: PortfolioSearchResult = {
            id: 'profile-summary',
            type: 'Profile',
            title: 'About Prasad',
            summary: ABOUT_INFO.summary,
        };
        const profileScore = score([ABOUT_INFO.summary, ABOUT_INFO.subtitle].join(' '));
        if (profileScore > 0) {
            scoredResults.push({ result: profileResult, score: profileScore });
        }

        const contactResult: PortfolioSearchResult = {
            id: 'contact-info',
            type: 'Contact',
            title: contactInfo.name,
            summary: `${contactInfo.email} | ${contactInfo.phone} | ${contactInfo.address}`,
        };
        const contactScore = score(
            [contactInfo.name, contactInfo.email, contactInfo.phone, contactInfo.address].join(' '),
        );
        if (contactScore > 0) {
            scoredResults.push({ result: contactResult, score: contactScore });
        }

        return scoredResults
            .sort((left, right) => right.score - left.score || left.result.title.localeCompare(right.result.title))
            .map((item) => item.result)
            .slice(0, 8);
    }

    private getDefaultSearchResults(): PortfolioSearchResult[] {
        return [
            {
                id: 'faq-skills',
                type: 'Profile',
                title: 'Core skills',
                summary: MOCK_SKILLS.map((skill) => skill.name).join(', '),
            },
            {
                id: 'faq-projects',
                type: 'Project',
                title: 'Featured projects',
                summary: MOCK_PROJECTS.filter((project) => project.featured)
                    .map((project) => project.title)
                    .join(', '),
            },
            {
                id: 'faq-experience',
                type: 'Experience',
                title: 'Experience',
                summary: MOCK_EXPERIENCE.map((item) => `${item.position} at ${item.company}`).join('; '),
            },
            {
                id: 'faq-contact',
                type: 'Contact',
                title: contactInfo.name,
                summary: `${contactInfo.email} | ${contactInfo.phone}`,
            },
        ];
    }

    private buildFallbackAnswer(question: string): string {
        const results = this.searchPortfolio(question);

        if (results.length === 0) {
            return `I can help with skills, projects, experience, or contact details. Try searching for Angular, AG Grid, GraphQL, or a company name.`;
        }

        const topResults = results.slice(0, 2).map((result) => `${result.title}: ${result.summary}`);
        return topResults.join(' ');
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
