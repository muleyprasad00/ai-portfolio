import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { contactInfo } from '../../core/constants/mock-data';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>Get in Touch</h1>
        <p class="page-subtitle">Let's discuss your project or opportunity</p>
      </div>

      <div class="contact-content">
        <div class="page-card contact-info">
          <div class="info-item">
            <div class="info-icon"><mat-icon>mail</mat-icon></div>
            <div>
              <h3>Email</h3>
              <a [href]="'mailto:' + contactInfo.email">{{ contactInfo.email }}</a>
            </div>
          </div>

          <div class="info-item">
            <div class="info-icon"><mat-icon>phone</mat-icon></div>
            <div>
              <h3>Phone</h3>
              <a [href]="'tel:' + contactInfo.phone">{{ contactInfo.phone }}</a>
            </div>
          </div>

          <div class="info-item">
            <div class="info-icon"><mat-icon>location_on</mat-icon></div>
            <div>
              <h3>Location</h3>
              <p>{{ contactInfo.address }}</p>
            </div>
          </div>

          <div class="social-links">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" class="social-link">
              <i class="fab fa-github"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="social-link">
              <i class="fab fa-linkedin"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" class="social-link">
              <i class="fab fa-twitter"></i>
            </a>
          </div>
        </div>

        <div class="page-card form-card">
          <h2>Send Me a Message</h2>

          <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
            <mat-form-field class="full-width" appearance="outline">
              <mat-label>Name</mat-label>
              <input matInput formControlName="name" placeholder="Your name" />
              @if (contactForm.get('name')?.invalid && contactForm.get('name')?.touched) {
                <mat-error>Name is required</mat-error>
              }
            </mat-form-field>

            <mat-form-field class="full-width" appearance="outline">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" placeholder="your.email@example.com" />
              @if (contactForm.get('email')?.invalid && contactForm.get('email')?.touched) {
                <mat-error>
                  @if (contactForm.get('email')?.errors?.['required']) {
                    Email is required
                  } @else if (contactForm.get('email')?.errors?.['email']) {
                    Please enter a valid email
                  }
                </mat-error>
              }
            </mat-form-field>

            <mat-form-field class="full-width" appearance="outline">
              <mat-label>Message</mat-label>
              <textarea matInput formControlName="message" placeholder="Your message..." rows="6"></textarea>
              @if (contactForm.get('message')?.invalid && contactForm.get('message')?.touched) {
                <mat-error>Message must be at least 10 characters</mat-error>
              }
            </mat-form-field>

            @if (submitted()) {
              <div class="form-message" [class.success]="!contactForm.invalid">
                @if (!contactForm.invalid) {
                  <mat-icon>check_circle</mat-icon>
                  <span>Thank you! I'll get back to you soon.</span>
                } @else {
                  <mat-icon>error</mat-icon>
                  <span>Please fix the errors above</span>
                }
              </div>
            }

            <button type="submit" class="submit-button" [disabled]="!contactForm.valid || submitted()">
              <mat-icon>send</mat-icon>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .contact-content {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 24px;
        align-items: start;
      }

      .contact-info {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }

      .info-item {
        display: flex;
        gap: 16px;
        align-items: flex-start;
      }

      .info-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 10px;
        background: rgba(99, 102, 241, 0.1);
        flex-shrink: 0;
      }

      .info-icon mat-icon {
        color: #6366f1;
        font-size: 20px;
        width: 20px;
        height: 20px;
      }

      .info-item h3 {
        margin: 0;
        font-size: 13px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: #1e3a5f;
      }

      .info-item p,
      .info-item a {
        margin: 4px 0 0;
        font-size: 14px;
        color: #64748b;
      }

      .info-item a {
        text-decoration: none;
        color: #6366f1;
      }

      .info-item a:hover {
        color: #22c55e;
      }

      .social-links {
        display: flex;
        gap: 12px;
        margin-top: 8px;
      }

      .social-link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 8px;
        background: #f8fafc;
        border: 1px solid #e5e7eb;
        color: #64748b;
        font-size: 18px;
        transition: all 0.2s ease;
      }

      .social-link:hover {
        background: #6366f1;
        border-color: #6366f1;
        color: #ffffff;
      }

      .form-card h2 {
        margin: 0 0 24px;
        font-size: 22px;
        font-weight: 700;
        color: #1e3a5f;
      }

      form {
        display: grid;
        gap: 8px;
      }

      .full-width {
        width: 100%;
      }

      .form-message {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        border-radius: 8px;
        background-color: #fef2f2;
        color: #dc2626;
        margin: 8px 0;
        font-size: 14px;
      }

      .form-message.success {
        background-color: #f0fdf4;
        color: #16a34a;
      }

      .submit-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        margin-top: 8px;
        padding: 12px 24px;
        font-size: 14px;
        font-weight: 600;
        border: none;
        border-radius: 8px;
        background: #22c55e;
        color: #ffffff;
        cursor: pointer;
        transition: background 0.2s ease;
      }

      .submit-button:hover:not(:disabled) {
        background: #16a34a;
      }

      .submit-button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .submit-button mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }

      @media (max-width: 768px) {
        .contact-content {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  contactInfo = contactInfo;
  contactForm: FormGroup;
  submitted = signal(false);

  constructor() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
      this.submitted.set(true);
      setTimeout(() => {
        this.contactForm.reset();
        this.submitted.set(false);
      }, 3000);
    }
  }
}
