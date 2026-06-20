import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { ABOUT_INFO } from '../../core/constants/mock-data';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, MatChipsModule],
  template: `
    <div class="page-container page-container--narrow">
      <div class="page-header">
        <h1>About Me</h1>
        <p class="page-subtitle">{{ aboutInfo.subtitle }}</p>
      </div>

      <div class="about-content">
        <section class="page-section page-card">
          <h2>Professional Summary</h2>
          <p>{{ aboutInfo.summary }}</p>
        </section>

        <section class="page-section">
          <h2>Experience Overview</h2>
          <div class="page-grid page-grid--2">
            @for (item of aboutInfo.experienceOverview; track item.title) {
              <div class="page-stat-card">
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
              </div>
            }
          </div>
        </section>

        <section class="page-section page-card">
          <h2>Technology Stack</h2>
          <div class="tech-categories">
            @for (item of aboutInfo.technologyStack; track item.category) {
              <div class="tech-category">
                <h3>{{ item.category }}</h3>
                <div class="tech-chips">
                  @for (tech of item.technologies; track tech) {
                    <span class="page-chip">{{ tech }}</span>
                  }
                </div>
              </div>
            }
          </div>
        </section>
      </div>
    </div>
  `,
  styles: [
    `
      .about-content {
        display: grid;
        gap: 32px;
      }

      .tech-categories {
        display: grid;
        gap: 24px;
        margin-top: 8px;
      }

      .tech-category h3 {
        margin: 0 0 12px;
        font-size: 14px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: #6366f1;
      }

      .tech-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  aboutInfo = ABOUT_INFO;
}
