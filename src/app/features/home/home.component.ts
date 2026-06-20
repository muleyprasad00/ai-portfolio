import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PortfolioPreviewComponent } from './portfolio-preview/portfolio-preview.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PortfolioPreviewComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
