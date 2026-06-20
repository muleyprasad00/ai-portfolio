import { Component, OnInit, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { Skill } from '../../models/skill.model';
import { SkillCardComponent } from '../../shared/components/skill-card/skill-card.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, SkillCardComponent],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>Skills & Expertise</h1>
        <p class="page-subtitle">Technologies and tools I work with</p>
      </div>

      <div class="filter-tabs">
        @for (tab of tabs; track tab.key) {
          <button
            type="button"
            class="page-filter-btn"
            [class.active]="selectedTab() === tab.key"
            (click)="selectedTab.set(tab.key)"
          >
            {{ tab.label }}
          </button>
        }
      </div>

      <div class="page-grid page-grid--3 skills-grid">
        @for (skill of filteredSkills(); track skill.id) {
          <app-skill-card [skill]="skill"></app-skill-card>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .filter-tabs {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: center;
        margin-bottom: 32px;
      }

      .skills-grid {
        padding-bottom: 24px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent implements OnInit {
  private portfolioService = inject(PortfolioService);

  allSkills = signal<Skill[]>([]);
  selectedTab = signal('all');

  readonly tabs = [
    { key: 'all', label: 'All Skills' },
    { key: 'Frontend', label: 'Frontend' },
    { key: 'Backend', label: 'Backend' },
    { key: 'DevOps', label: 'DevOps' },
  ];

  filteredSkills = computed(() => {
    const tab = this.selectedTab();
    if (tab === 'all') return this.allSkills();
    return this.allSkills().filter((s) => s.category === tab);
  });

  ngOnInit(): void {
    this.allSkills.set(this.portfolioService.getSkillsSync());
  }
}
