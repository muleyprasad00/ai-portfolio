import { Component, OnInit, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { Project } from '../../models/project.model';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>Projects</h1>
        <p class="page-subtitle">Featured projects and case studies</p>
      </div>

      <div class="filter-section">
        <h3>Filter by Category</h3>
        <div class="filter-tabs">
          <button
            type="button"
            class="page-filter-btn"
            [class.active]="selectedCategory() === 'all'"
            (click)="selectedCategory.set('all')"
          >
            All
          </button>
          @for (category of categories(); track category) {
            <button
              type="button"
              class="page-filter-btn"
              [class.active]="selectedCategory() === category"
              (click)="selectedCategory.set(category)"
            >
              {{ category }}
            </button>
          }
        </div>
      </div>

      <div class="page-grid page-grid--3 projects-grid">
        @for (project of filteredProjects(); track project.id) {
          <app-project-card [project]="project"></app-project-card>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .filter-section {
        margin: 0 0 40px;
        text-align: center;
      }

      .filter-section h3 {
        margin: 0 0 16px;
        font-size: 14px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: #1e3a5f;
      }

      .filter-tabs {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        justify-content: center;
      }

      .projects-grid {
        margin-bottom: 48px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent implements OnInit {
  private portfolioService = inject(PortfolioService);

  allProjects = signal<Project[]>([]);
  selectedCategory = signal<string>('all');

  categories = computed(() => {
    const cats = this.allProjects()
      .map((p) => p.category || 'Other')
      .filter((v, i, a) => a.indexOf(v) === i);
    return cats.sort();
  });

  filteredProjects = computed(() => {
    const selected = this.selectedCategory();
    if (selected === 'all') {
      return this.allProjects();
    }
    return this.allProjects().filter((p) => (p.category || 'Other') === selected);
  });

  ngOnInit(): void {
    this.allProjects.set(this.portfolioService.getProjectsSync());
  }
}
