import { Component, OnInit, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { Experience } from '../../models/experience.model';
import { ExperienceCardComponent } from '../../shared/components/experience-card/experience-card.component';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, ExperienceCardComponent],
  template: `
    <div class="page-container page-container--narrow">
      <div class="page-header">
        <h1>Professional Experience</h1>
        <p class="page-subtitle">My career journey and roles</p>
      </div>

      <div class="timeline">
        <div class="timeline-track"></div>
        <div class="experience-list">
          @for (exp of experiences(); track exp.id) {
            <div class="timeline-item" [class.current]="exp.isCurrentRole">
              <div class="timeline-marker"></div>
              <app-experience-card [experience]="exp"></app-experience-card>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .timeline {
        position: relative;
        padding: 0;
      }

      .timeline-track {
        position: absolute;
        left: 24px;
        top: 0;
        bottom: 0;
        width: 2px;
        background: linear-gradient(to bottom, #6366f1, #818cf8);
      }

      .experience-list {
        display: grid;
        gap: 32px;
        padding: 24px 0 24px 100px;
      }

      .timeline-item {
        position: relative;
      }

      .timeline-marker {
        position: absolute;
        left: -82px;
        top: 50px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: #6366f1;
        border: 4px solid #f8fafc;
        box-shadow: 0 0 0 2px #6366f1;
        transition: transform 0.3s ease;
      }

      .timeline-item.current .timeline-marker {
        background-color: #22c55e;
        box-shadow: 0 0 0 2px #22c55e, 0 0 8px rgba(34, 197, 94, 0.4);
        transform: scale(1.3);
      }

      @media (max-width: 768px) {
        .timeline-track {
          left: 8px;
        }

        .experience-list {
          padding: 24px 0 24px 50px;
        }

        .timeline-marker {
          left: -38px;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceComponent implements OnInit {
  private portfolioService = inject(PortfolioService);

  experiences = signal<Experience[]>([]);

  ngOnInit(): void {
    this.experiences.set(this.portfolioService.getExperienceSync());
  }
}
