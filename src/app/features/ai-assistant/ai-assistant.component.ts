import {
  Component,
  OnInit,
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
import { ChatMessage } from '../../core/interfaces/app.interface';

@Component({
  selector: 'app-ai-assistant',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatIconModule, MatFormFieldModule],
  template: `
    <div class="page-container page-container--narrow">
      <div class="page-header">
        <h1>AI Portfolio Assistant</h1>
        <p class="page-subtitle">Ask me anything about my projects and experience</p>
      </div>

      <div class="assistant-layout">
        <div class="page-card chat-card">
          <div class="chat-header">
            <mat-icon class="ai-icon">smart_toy</mat-icon>
            <div>
              <h2>Chat</h2>
              <p class="chat-description">Powered by AI — ask about skills, projects, or experience</p>
            </div>
          </div>

          <div class="messages-container" #messagesContainer>
            @if (messages().length === 0) {
              <div class="empty-state">
                <mat-icon>chat</mat-icon>
                <p>No messages yet. Start a conversation!</p>
              </div>
            }

            @for (message of messages(); track message.id) {
              <div
                class="message"
                [class.user]="message.sender === 'user'"
                [class.assistant]="message.sender === 'assistant'"
              >
                <div class="message-content">
                  @if (message.sender === 'assistant') {
                    <mat-icon class="message-icon">smart_toy</mat-icon>
                  }
                  <div class="message-text">{{ message.text }}</div>
                </div>
                <span class="message-time">{{ formatTime(message.timestamp) }}</span>
              </div>
            }

            @if (isTyping()) {
              <div class="message assistant typing">
                <div class="message-content">
                  <mat-icon class="message-icon">smart_toy</mat-icon>
                  <div class="message-text typing-dots">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              </div>
            }
          </div>

          <div class="chat-actions">
            <mat-form-field class="chat-input-field" appearance="outline">
              <mat-label>Type your message...</mat-label>
              <input
                matInput
                [(ngModel)]="userMessage"
                (keyup.enter)="sendMessage()"
                placeholder="Ask me something..."
              />
            </mat-form-field>
            <button
              type="button"
              class="send-button"
              (click)="sendMessage()"
              [disabled]="!userMessage.trim()"
              aria-label="Send message"
            >
              <mat-icon>send</mat-icon>
            </button>
          </div>
        </div>

        <div class="page-card info-card">
          <h3>About This Assistant</h3>
          <p>
            This AI assistant is designed to answer questions about my background, skills,
            projects, and experience. The integration with Genkit is coming soon for more
            advanced AI capabilities.
          </p>
          <p class="features-title">Current Features:</p>
          <ul>
            <li>Answer questions about my professional background</li>
            <li>Discuss my technical skills and expertise</li>
            <li>Learn about my projects and case studies</li>
            <li>Get recommendations for collaboration</li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .assistant-layout {
        display: grid;
        gap: 24px;
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
        .message-content {
          max-width: 100%;
        }

        .messages-container {
          max-height: 320px;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiAssistantComponent implements OnInit {
  private aiService = inject(AiAssistantService);

  messages = signal<ChatMessage[]>([]);
  userMessage = '';
  isTyping = signal(false);

  @ViewChild('messagesContainer', { static: false })
  private messagesContainer!: ElementRef<HTMLDivElement>;

  ngOnInit(): void {
    this.aiService.addMessage(
      "Hi! I'm your AI assistant. Ask me anything about Prasad's background, skills, projects, or experience!",
      'assistant'
    );

    this.aiService.getMessages().subscribe((msgs) => {
      this.messages.set(msgs);
      setTimeout(() => this.scrollToBottom(), 0);
    });
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
