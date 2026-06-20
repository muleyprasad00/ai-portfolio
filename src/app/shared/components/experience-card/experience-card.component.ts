import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Experience } from '../../../models/experience.model';

@Component({
    selector: 'app-experience-card',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatChipsModule],
    template: `
    <mat-card class="experience-card">
      <mat-card-header>
        <div class="header-content">
          <h3 class="position">{{ experience().position }}</h3>
          <p class="company">{{ experience().company }}</p>
        </div>
        @if (experience().isCurrentRole) {
        <span class="current-badge">Current</span>
        }
      </mat-card-header>

      <mat-card-content>
        <div class="duration">
          <span>{{ formatDate(experience().duration.start) }}</span>
          <span class="separator">—</span>
          <span>{{ experience().duration.end ? formatDate(experience().duration.end) : 'Present' }}</span>
        </div>

        <p class="description">{{ experience().description }}</p>

        @if (experience().technologies?.length) {
        <div class="technologies">
            <h4>Technologies</h4>

            <mat-chip-set aria-label="Technologies">
            <mat-chip *ngFor="let tech of (experience().technologies ?? [])">
                {{ tech }}
            </mat-chip>
            </mat-chip-set>
        </div>
        }
      </mat-card-content>
    </mat-card>
  `,
    styles: [
        `
      .experience-card {
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        transition: box-shadow 0.2s ease, border-color 0.2s ease;
      }

      .experience-card:hover {
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
        border-color: #cbd5e1;
      }

      mat-card-header {
        display: flex;
        justify-content: space-between;
        align-items: start;
        margin-bottom: 16px;
      }

      .header-content {
        flex: 1;
      }

      .position {
        margin: 0;
        font-size: 18px;
        font-weight: 700;
        color: #1e3a5f;
      }

      .company {
        margin: 4px 0 0;
        font-size: 14px;
        color: #6366f1;
        font-weight: 500;
      }

      .current-badge {
        background-color: #22c55e;
        color: white;
        padding: 4px 12px;
        border-radius: 999px;
        font-size: 12px;
        font-weight: 600;
      }

      .duration {
        font-size: 12px;
        color: #94a3b8;
        margin-bottom: 12px;
      }

      .separator {
        margin: 0 8px;
      }

      .description {
        font-size: 14px;
        color: #64748b;
        line-height: 1.6;
        margin: 12px 0;
      }

      .technologies h4 {
        margin: 0 0 8px;
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: #94a3b8;
      }

      mat-chip {
        margin-right: 8px !important;
        margin-bottom: 8px !important;
      }
    `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceCardComponent {
    experience = input.required<Experience>();

    formatDate(date: Date | undefined): string {
        if (!date) return '';
        const d = new Date(date);
        return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(d);
    }
}
