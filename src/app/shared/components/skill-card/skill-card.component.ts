import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { Skill } from '../../../models/skill.model';

@Component({
    selector: 'app-skill-card',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatProgressBarModule, MatIconModule],
    template: `
    <mat-card class="skill-card">
      <mat-card-header>
        <div class="card-header">
          @if (skill().icon) {
          <mat-icon class="skill-icon">{{ skill().icon }}</mat-icon>
          }
          <h3 class="skill-name">{{ skill().name }}</h3>
        </div>
        <span class="category-badge">{{ skill().category }}</span>
      </mat-card-header>

      <mat-card-content>
        @if (skill().description) {
        <p class="skill-description">{{ skill().description }}</p>
        }

        <div class="proficiency-section">
          <div class="proficiency-header">
            <span>Proficiency</span>
            <span class="proficiency-value">{{ skill().proficiency }}%</span>
          </div>
          <mat-progress-bar
            mode="determinate"
            [value]="skill().proficiency"
            class="proficiency-bar"
          ></mat-progress-bar>
        </div>
      </mat-card-content>
    </mat-card>
  `,
    styles: [
        `
      .skill-card {
        height: 100%;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
      }

      .skill-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
        border-color: #cbd5e1;
      }

      mat-card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      }

      .card-header {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;
      }

      .skill-icon {
        font-size: 32px;
        width: 32px;
        height: 32px;
        color: #6366f1;
      }

      .skill-name {
        margin: 0;
        font-size: 18px;
        font-weight: 700;
        color: #1e3a5f;
      }

      .category-badge {
        background-color: #f8fafc;
        padding: 4px 12px;
        border-radius: 999px;
        font-size: 12px;
        font-weight: 500;
        color: #6366f1;
        border: 1px solid #e5e7eb;
      }

      .skill-description {
        font-size: 14px;
        color: #64748b;
        margin: 12px 0;
        line-height: 1.5;
      }

      .proficiency-section {
        margin-top: 16px;
      }

      .proficiency-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
        font-size: 14px;
      }

      .proficiency-value {
        font-weight: 600;
        color: #6366f1;
      }

      .proficiency-bar {
        height: 6px;
        border-radius: 3px;
      }
    `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillCardComponent {
    skill = input.required<Skill>();
}
