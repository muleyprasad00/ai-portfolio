import {
  Component,
  OnInit,
  DestroyRef,
  ChangeDetectionStrategy,
  signal,
  inject,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AiAssistantService } from '../../services/ai-assistant.service';
import { ChatMessage, PortfolioFaqItem, PortfolioSearchResult } from '../../core/interfaces/app.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-ai-assistant',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatIconModule, MatFormFieldModule],
  templateUrl: './ai-assistant.component.html',
  styles: [
    `
      .assistant-layout {
        display: grid;
        gap: 24px;
      }

      .mode-switch {
        display: inline-grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 4px;
        padding: 4px;
        margin-bottom: 16px;
        border: 1px solid #dbe3ee;
        border-radius: 10px;
        background: #ffffff;
        width: fit-content;
      }

      .mode-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        min-width: 112px;
        border: 0;
        border-radius: 8px;
        padding: 10px 14px;
        background: transparent;
        color: #475569;
        font-weight: 600;
        transition: background 0.2s ease, color 0.2s ease;
      }

      .mode-button.active {
        background: #0f172a;
        color: #ffffff;
      }

      .mode-button mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }

      .chat-card {
        display: flex;
        flex-direction: column;
        min-height: 560px;
        padding: 0;
        overflow: hidden;
      }

      .chat-header {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 20px 24px;
        background: #0b0f19;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      }

      .chat-header h2 {
        margin: 0;
        font-size: 18px;
        font-weight: 700;
        color: #ffffff;
      }

      .ai-icon {
        font-size: 32px;
        width: 32px;
        height: 32px;
        color: #6366f1;
      }

      .chat-description {
        margin: 4px 0 0;
        color: #94a3b8;
        font-size: 13px;
      }

      .messages-container {
        flex: 1;
        overflow-y: auto;
        padding: 20px 24px;
        background: #f8fafc;
        display: grid;
        gap: 12px;
        min-height: 360px;
        max-height: 420px;
      }

      .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: #94a3b8;
        min-height: 200px;
      }

      .empty-state mat-icon {
        font-size: 48px;
        width: 48px;
        height: 48px;
        margin-bottom: 12px;
        opacity: 0.5;
        color: #6366f1;
      }

      .message {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .message.user {
        align-items: flex-end;
      }

      .message-content {
        display: flex;
        gap: 8px;
        align-items: flex-start;
        max-width: 85%;
      }

      .message.user .message-content {
        flex-direction: row-reverse;
      }

      .message-icon {
        flex-shrink: 0;
        color: #6366f1;
        margin-top: 4px;
        font-size: 20px;
        width: 20px;
        height: 20px;
      }

      .message-text {
        padding: 12px 16px;
        border-radius: 12px;
        word-wrap: break-word;
        font-size: 14px;
        line-height: 1.5;
      }

      .message.assistant .message-text {
        background: #ffffff;
        color: #0f172a;
        border: 1px solid #e5e7eb;
      }

      .message.user .message-text {
        background: #6366f1;
        color: #ffffff;
      }

      .message-time {
        font-size: 11px;
        color: #94a3b8;
        padding: 0 8px;
      }

      .typing-dots {
        display: inline-flex;
        gap: 6px;
        align-items: center;
        background: transparent !important;
        border: none !important;
        padding: 8px 12px !important;
      }

      .typing-dots span {
        display: inline-block;
        width: 8px;
        height: 8px;
        background: #6366f1;
        border-radius: 50%;
        animation: typingDot 1s infinite linear;
      }

      .typing-dots span:nth-child(2) { animation-delay: 0.15s; }
      .typing-dots span:nth-child(3) { animation-delay: 0.3s; }

      @keyframes typingDot {
        0%, 100% { transform: translateY(0); opacity: 0.6; }
        50% { transform: translateY(-6px); opacity: 1; }
      }

      .chat-actions {
        display: flex;
        gap: 12px;
        align-items: flex-start;
        padding: 16px 24px;
        border-top: 1px solid #e5e7eb;
        background: #ffffff;
      }

      .fallback-banner {
        margin: 0 24px 24px;
        padding: 12px 14px;
        border-radius: 10px;
        background: #fff7ed;
        border: 1px solid #fed7aa;
        color: #9a3412;
        font-size: 13px;
        line-height: 1.5;
      }

      .chat-input-field {
        flex: 1;
      }

      .send-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        border: none;
        border-radius: 10px;
        background: #22c55e;
        color: #ffffff;
        cursor: pointer;
        flex-shrink: 0;
        margin-top: 4px;
        transition: background 0.2s ease;
      }

      .send-button:hover:not(:disabled) {
        background: #16a34a;
      }

      .send-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .info-card h3 {
        margin: 0 0 12px;
        font-size: 18px;
        font-weight: 700;
        color: #1e3a5f;
      }

      .info-card p {
        margin: 12px 0;
        color: #64748b;
        line-height: 1.6;
        font-size: 14px;
      }

      .search-card {
        display: grid;
        gap: 16px;
      }

      .search-header h3 {
        margin: 0;
        font-size: 18px;
        font-weight: 700;
        color: #1e3a5f;
      }

      .search-header p {
        margin: 6px 0 0;
        color: #64748b;
        line-height: 1.5;
        font-size: 14px;
      }

      .search-input-field {
        width: 100%;
      }

      .faq-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: 10px;
      }

      .faq-button {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 12px;
        border: 1px solid #dbe3ee;
        border-radius: 10px;
        background: #f8fafc;
        color: #0f172a;
        text-align: left;
        font-size: 13px;
        line-height: 1.4;
      }

      .faq-button mat-icon {
        flex-shrink: 0;
        font-size: 18px;
        width: 18px;
        height: 18px;
        color: #6366f1;
      }

      .search-results {
        display: grid;
        gap: 12px;
      }

      .search-empty {
        padding: 16px;
        border: 1px dashed #cbd5e1;
        border-radius: 10px;
        background: #ffffff;
        color: #64748b;
        font-size: 14px;
      }

      .search-result {
        padding: 14px 16px;
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        background: #ffffff;
      }

      .search-result-head {
        display: grid;
        gap: 4px;
        margin-bottom: 8px;
      }

      .result-type {
        display: inline-flex;
        width: fit-content;
        padding: 2px 8px;
        border-radius: 999px;
        background: #e0e7ff;
        color: #3730a3;
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0;
      }

      .search-result h4 {
        margin: 0;
        font-size: 15px;
        color: #0f172a;
      }

      .search-result p {
        margin: 0;
        color: #64748b;
        font-size: 14px;
        line-height: 1.5;
      }

      .features-title {
        font-weight: 700;
        color: #1e3a5f !important;
        margin-top: 16px !important;
      }

      ul {
        margin: 8px 0 0;
        padding-left: 20px;
        color: #64748b;
        font-size: 14px;
      }

      li {
        margin: 6px 0;
      }

      @media (max-width: 768px) {
        .mode-switch {
          width: 100%;
        }

        .mode-button {
          min-width: 0;
          width: 100%;
        }

        .message-content {
          max-width: 100%;
        }

        .messages-container {
          max-height: 320px;
        }

        .faq-grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiAssistantComponent implements OnInit {
  private aiService = inject(AiAssistantService);
  private destroyRef = inject(DestroyRef);

  messages = signal<ChatMessage[]>([]);
  userMessage = '';
  isTyping = signal(false);
  assistantAvailable = signal(true);
  mode = signal<'chat' | 'search'>('chat');
  searchQuery = '';
  searchResults = signal<PortfolioSearchResult[]>(this.aiService.searchPortfolio(''));
  faqItems: PortfolioFaqItem[] = this.aiService.getFaqItems();

  @ViewChild('messagesContainer', { static: false })
  private messagesContainer!: ElementRef<HTMLDivElement>;

  ngOnInit(): void {
    this.updateSearch('');

    this.aiService.backendAvailable$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((available) => {
        this.assistantAvailable.set(available);
      });

    this.aiService.addMessage(
      "Hi! I'm your portfolio assistant. Ask me anything about Prasad's background, skills, projects, or experience!",
      'assistant'
    );

    this.aiService.getMessages().subscribe((msgs) => {
      this.messages.set(msgs);
      setTimeout(() => this.scrollToBottom(), 0);
    });
  }

  setMode(mode: 'chat' | 'search'): void {
    this.mode.set(mode);
    if (mode === 'search' && !this.searchQuery.trim()) {
      this.updateSearch('');
    }
  }

  updateSearch(query: string): void {
    this.searchQuery = query;
    this.searchResults.set(this.aiService.searchPortfolio(query));
  }

  runFaq(faq: PortfolioFaqItem): void {
    this.setMode('search');
    this.updateSearch(faq.query);
  }

  sendMessage(): void {
    if (!this.userMessage.trim()) return;

    const userMsg = this.userMessage.trim();
    this.aiService.addMessage(userMsg, 'user');
    this.userMessage = '';
    this.isTyping.set(true);

    // Add a placeholder assistant message and keep its ID for streaming updates
    const assistantMsgId = this.aiService.addMessage('', 'assistant');

    this.aiService.sendMessage(userMsg).subscribe({
      next: (chunk) => {
        this.aiService.updateMessageText(assistantMsgId, chunk);
      },
      error: () => {
        this.aiService.updateMessageText(assistantMsgId, 'Sorry, something went wrong.');
        this.isTyping.set(false);
      },
      complete: () => {
        this.isTyping.set(false);
      },
    });
  }

  formatTime(date: Date): string {
    return new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit' }).format(
      new Date(date)
    );
  }

  private scrollToBottom(): void {
    try {
      const el = this.messagesContainer?.nativeElement;
      if (el) {
        el.scrollTop = el.scrollHeight - el.clientHeight;
      }
    } catch {
      // ignore
    }
  }
}
