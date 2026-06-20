# Project Card Component - Implementation Examples

## Basic Grid Layout

### HTML Template
```html
<div class="projects-grid">
  @for (project of projects; track project.id) {
    <app-project-card [project]="project"></app-project-card>
  }
</div>
```

### SCSS Styling
```scss
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 32px;
  padding: 60px 40px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
    padding: 40px 24px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 24px 16px;
  }
}
```

## Advanced: Grid with Categories

### Component Class
```typescript
import { Component, OnInit, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from './services/portfolio.service';
import { Project } from './models/project.model';
import { ProjectCardComponent } from './shared/components/project-card/project-card.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent, MatButtonModule],
  template: `
    <section class="projects-section">
      <div class="section-header">
        <h1 class="section-title">My Projects</h1>
        <p class="section-subtitle">Featured work and case studies</p>
      </div>

      <!-- Category Filter -->
      <div class="filter-controls">
        <button
          mat-stroked-button
          [class.active]="selectedCategory() === 'all'"
          (click)="selectedCategory.set('all')"
        >
          All Projects
        </button>
        @for (category of categories(); track category) {
          <button
            mat-stroked-button
            [class.active]="selectedCategory() === category"
            (click)="selectedCategory.set(category)"
          >
            {{ category }}
          </button>
        }
      </div>

      <!-- Projects Grid -->
      <div class="projects-grid">
        @for (project of filteredProjects(); track project.id) {
          <app-project-card [project]="project"></app-project-card>
        }
      </div>

      <!-- Empty State -->
      @if (filteredProjects().length === 0) {
        <div class="empty-state">
          <p>No projects found in this category.</p>
        </div>
      }
    </section>
  `,
  styles: [`
    .projects-section {
      padding: 80px 60px;
      max-width: 1400px;
      margin: 0 auto;

      @media (max-width: 1024px) {
        padding: 60px 40px;
      }

      @media (max-width: 768px) {
        padding: 40px 20px;
      }
    }

    .section-header {
      text-align: center;
      margin-bottom: 60px;
    }

    .section-title {
      margin: 0;
      font-size: 48px;
      font-weight: 800;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;

      @media (max-width: 768px) {
        font-size: 32px;
      }
    }

    .section-subtitle {
      margin: 16px 0 0;
      font-size: 18px;
      color: #666;

      @media (max-width: 768px) {
        font-size: 16px;
      }
    }

    .filter-controls {
      display: flex;
      justify-content: center;
      gap: 12px;
      flex-wrap: wrap;
      margin-bottom: 48px;

      button {
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-2px);
        }

        &.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
      }
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 32px;
      margin-bottom: 60px;

      @media (max-width: 1024px) {
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 24px;
      }

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 16px;
      }
    }

    .empty-state {
      text-align: center;
      padding: 60px 40px;
      color: #999;

      p {
        font-size: 16px;
        margin: 0;
      }
    }
  `],
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
```

## Masonry Layout

For a Pinterest-style masonry layout:

```scss
.projects-masonry {
  column-count: 3;
  column-gap: 32px;

  @media (max-width: 1024px) {
    column-count: 2;
  }

  @media (max-width: 768px) {
    column-count: 1;
  }

  app-project-card {
    break-inside: avoid;
    margin-bottom: 32px;
    display: block;
  }
}
```

## Slider/Carousel Layout

For a featured projects carousel:

```typescript
// Using ngx-swiper or similar library
<swiper
  [slides-per-view]="3"
  [space-between]="32"
  [breakpoints]="{
    1024: { slidesPerView: 2, spaceBetween: 24 },
    768: { slidesPerView: 1, spaceBetween: 16 }
  }"
>
  @for (project of featuredProjects; track project.id) {
    <swiper-slide>
      <app-project-card [project]="project"></app-project-card>
    </swiper-slide>
  }
</swiper>
```

## Search & Filter

```typescript
@Component({
  template: `
    <div class="projects-container">
      <!-- Search Input -->
      <input
        type="text"
        placeholder="Search projects..."
        [(ngModel)]="searchTerm"
        class="search-input"
      />

      <!-- Projects Grid -->
      <div class="projects-grid">
        @for (project of filteredProjects(); track project.id) {
          <app-project-card [project]="project"></app-project-card>
        }
      </div>
    </div>
  `
})
export class ProjectsComponent {
  searchTerm = signal('');
  projects = signal<Project[]>([...]);

  filteredProjects = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.projects();

    return this.projects().filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.technologies.some((t) => t.toLowerCase().includes(term))
    );
  });
}
```

## Sample Project Data

```typescript
const SAMPLE_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    shortDescription: 'Full-stack e-commerce solution with Angular frontend and Node.js backend.',
    description: 'A complete e-commerce platform featuring product browsing, shopping cart, checkout, and order management.',
    image: 'assets/projects/ecommerce.jpg',
    technologies: ['Angular', 'TypeScript', 'RxJS', 'Material', 'NgRx'],
    link: 'https://ecommerce-demo.com',
    github: 'https://github.com/user/ecommerce-platform',
    featured: true,
    category: 'Web App'
  },
  {
    id: '2',
    title: 'AI Assistant Component Library',
    shortDescription: 'Reusable Angular component library for AI-powered features and interactions.',
    description: 'A comprehensive library of components for integrating AI and machine learning features into Angular applications.',
    image: 'assets/projects/ai-components.jpg',
    technologies: ['Angular', 'TypeScript', 'Storybook', 'Jest'],
    github: 'https://github.com/user/ai-components',
    featured: true,
    category: 'Library'
  },
  {
    id: '3',
    title: 'Task Management Dashboard',
    shortDescription: 'Real-time collaborative task management application with WebSocket sync.',
    description: 'A modern task management dashboard with real-time updates, team collaboration, and advanced filtering.',
    image: 'assets/projects/task-manager.jpg',
    technologies: ['Angular', 'Node.js', 'MongoDB', 'Socket.io'],
    link: 'https://task-manager-demo.com',
    github: 'https://github.com/user/task-manager',
    featured: false,
    category: 'Web App'
  },
  {
    id: '4',
    title: 'Performance Monitoring Tool',
    shortDescription: 'Real-time performance metrics visualization and analytics dashboard.',
    description: 'Advanced analytics dashboard for monitoring application performance with real-time charts and alerts.',
    technologies: ['Angular', 'Chart.js', 'D3.js', 'TypeScript'],
    github: 'https://github.com/user/performance-monitor',
    featured: false,
    category: 'Tool'
  }
];
```

## Styling Variants

### Compact Cards
```scss
.projects-grid.compact {
  app-project-card {
    // Reduced padding and spacing
    ::ng-deep .card-content {
      padding: 12px 16px;
    }

    ::ng-deep .card-actions {
      padding: 8px 16px;
    }
  }
}
```

### Large Featured Grid
```scss
.projects-grid.featured {
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));

  app-project-card[featured] {
    grid-column: span 1;
  }
}
```

### Dark Background
```scss
.projects-section.dark {
  background: #1a1a1a;
  color: white;

  .section-title {
    color: white;
  }

  .section-subtitle {
    color: #aaa;
  }
}
```

## Integration with Portfolio Service

```typescript
// portfolio.service.ts
import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private projects: Project[] = [
    // Your projects data
  ];

  getProjects(): Observable<Project[]> {
    return of(this.projects);
  }

  getProjectById(id: string): Observable<Project | undefined> {
    return of(this.projects.find(p => p.id === id));
  }

  getProjectsByCategory(category: string): Observable<Project[]> {
    return of(this.projects.filter(p => p.category === category));
  }

  getFeaturedProjects(): Observable<Project[]> {
    return of(this.projects.filter(p => p.featured));
  }

  getProjectsSync(): Project[] {
    return this.projects;
  }
}
```

## Accessibility Enhancements

```html
<section class="projects-section" aria-labelledby="projects-title">
  <h1 id="projects-title">My Projects</h1>

  <div class="projects-grid" role="list">
    @for (project of projects; track project.id) {
      <article role="listitem">
        <app-project-card [project]="project"></app-project-card>
      </article>
    }
  </div>
</section>
```

## Performance Tips

1. **Lazy Load Images**: Use `loading="lazy"` attribute
2. **Virtual Scrolling**: For large project lists, consider CDK Virtual Scrolling
3. **Track Function**: Always use track functions in `@for` loops
4. **ChangeDetection**: Use `OnPush` strategy (already implemented)
5. **Pagination**: For large lists, implement pagination
6. **Memoization**: Cache filtered results with computed signals

## Browser Testing

Test the project card component across:
- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Tablet (iPad, Android tablets)
- ✅ Mobile (iPhone, Android phones)
- ✅ Dark mode browsers
- ✅ High contrast mode
- ✅ Screen readers (NVDA, JAWS)
- ✅ Keyboard navigation only
