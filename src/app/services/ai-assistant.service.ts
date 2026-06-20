import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { ChatMessage } from '../core/interfaces/app.interface';

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

    // Stub for future Genkit integration
    /**
     * Simulated streaming response for Genkit integration.
     * Emits incremental chunks of text to simulate streaming.
     */
    sendMessage(text: string): Observable<string> {
        // Call the server-side Genkit proxy which streams the response body.
        return new Observable<string>((observer) => {
            fetch('/api/genkit-stream', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: text }),
            })
                .then((res) => {
                    if (!res.body) {
                        observer.error(new Error('No response body from proxy'));
                        return;
                    }

                    const reader = res.body.getReader();
                    const decoder = new TextDecoder();
                    let accumulated = '';

                    function readChunk() {
                        reader.read().then(({ done, value }) => {
                            if (done) {
                                observer.complete();
                                return;
                            }
                            const chunk = decoder.decode(value, { stream: true });
                            accumulated += chunk;
                            observer.next(accumulated);
                            readChunk();
                        }).catch((err) => {
                            observer.error(err);
                        });
                    }

                    readChunk();
                })
                .catch((err) => observer.error(err));

            // Teardown
            return () => {
                // No-op: fetch cancellation requires AbortController if needed
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
}
