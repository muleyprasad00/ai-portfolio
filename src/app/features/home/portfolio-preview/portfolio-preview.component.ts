import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { APP_CONSTANTS } from '../../../core/constants/app.constants';
import { PortfolioService } from '../../../services/portfolio.service';
import { Project } from '../../../models/project.model';

interface TechBadge {
  name: string;
  icon: string;
  color: string;
}

interface PreviewProject extends Project {
  previewIcon: string;
}

@Component({
  selector: 'app-portfolio-preview',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './portfolio-preview.component.html',
  styleUrl: './portfolio-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioPreviewComponent {
  private readonly portfolioService = inject(PortfolioService);

  readonly name = APP_CONSTANTS.PROFILE_NAME;
  readonly title = APP_CONSTANTS.PROFILE_TITLE;
  readonly bio =
    '6+ years of experience in building scalable web applications and AI-powered solutions.';

  readonly techStack: TechBadge[] = [
    { name: 'Angular', icon: 'code', color: '#dd0031' },
    { name: 'AG Grid', icon: 'grid_view', color: '#00b4a0' },
    { name: 'GraphQL', icon: 'hub', color: '#e535ab' },
    { name: 'NGINX', icon: 'dns', color: '#009639' },
    { name: 'GitHub Actions', icon: 'settings', color: '#2088ff' },
    { name: 'AI Development', icon: 'psychology', color: '#00b4a0' },
  ];

  readonly featuredProjects: PreviewProject[] = this.portfolioService
    .getProjectsSync()
    .filter((p) => p.featured)
    .slice(0, 3)
    .map((project, index) => ({
      ...project,
      previewIcon: ['code', 'psychology', 'visibility'][index] ?? 'folder',
    }));
}
