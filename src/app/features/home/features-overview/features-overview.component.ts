import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-features-overview',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <aside class="features-overview">
      <header class="features-header">
        <h2>Features Overview</h2>
      </header>

      <ul class="features-list">
        @for (feature of features; track feature.title) {
          <li class="feature-item">
            <div class="feature-icon">
              <mat-icon>{{ feature.icon }}</mat-icon>
            </div>
            <div class="feature-content">
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.description }}</p>
            </div>
          </li>
        }
      </ul>
    </aside>
  `,
  styles: [
    `
      .features-overview {
        display: flex;
        flex-direction: column;
        background: #ffffff;
        border-right: 1px solid #e5e7eb;
        min-height: 100%;
      }

      .features-header {
        background: #4f46e5;
        padding: 14px 20px;

        h2 {
          margin: 0;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #ffffff;
        }
      }

      .features-list {
        list-style: none;
        margin: 0;
        padding: 0;
        flex: 1;
      }

      .feature-item {
        display: flex;
        gap: 14px;
        padding: 18px 20px;
        border-bottom: 1px solid #f0f0f0;
      }

      .feature-icon {
        flex-shrink: 0;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: #1e293b;
        display: flex;
        align-items: center;
        justify-content: center;

        mat-icon {
          font-size: 18px;
          width: 18px;
          height: 18px;
          color: #ffffff;
        }
      }

      .feature-content {
        h3 {
          margin: 0 0 4px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #1e3a5f;
        }

        p {
          margin: 0;
          font-size: 12px;
          line-height: 1.5;
          color: #64748b;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturesOverviewComponent {
  readonly features: FeatureItem[] = [
    {
      icon: 'person',
      title: '1. Home Page',
      description: 'Introduction, experience, tech stack and highlights.',
    },
    {
      icon: 'folder_open',
      title: '2. Projects Section',
      description: 'Showcase projects in beautiful cards.',
    },
    {
      icon: 'chat_bubble_outline',
      title: '3. AI Portfolio Assistant',
      description: 'Visitors can ask questions about your experience, skills and projects.',
    },
    {
      icon: 'school',
      title: '4. AI Interview Me',
      description: 'AI conducts Angular interviews and evaluates answers.',
    },
    {
      icon: 'lightbulb_outline',
      title: '5. AI Project Explainer',
      description: 'Explains your projects and technical experience.',
    },
    {
      icon: 'description',
      title: '6. AI Resume Generator',
      description: 'Generates tailored resumes based on user needs.',
    },
  ];
}
