# Project Card Component - Documentation

## Overview
A modern, reusable Angular Material project card component with advanced styling, hover effects, and responsive design. Designed to showcase portfolio projects with images, technologies, and action links.

## Component Details

### Selector
```html
<app-project-card [project]="projectData"></app-project-card>
```

### Inputs
- **`project`** (required): `Project` - The project data object

### Project Model Interface
```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  image?: string;
  technologies: string[];
  link?: string;           // Live demo URL
  github?: string;         // GitHub repository URL
  featured: boolean;
  category?: string;
}
```

## Features

### 1. Image Display
- Responsive image container (220px desktop, 180px tablet, 160px mobile)
- Lazy loading for performance
- Gradient fallback if image not available
- Smooth zoom animation on hover
- Image overlay with action buttons

### 2. Project Information
- Title with gradient text on hover
- Category badge with gradient background
- Short description (2-line clamp)
- Professional typography and spacing

### 3. Technology Tags
- Flexible tag system for technologies used
- Smooth animations and hover effects
- Responsive tag layout
- Automatic color transitions

### 4. Action Buttons
- Live Demo button (primary gradient)
- GitHub link button (accent outlined)
- Ripple effects on click
- Tooltip hints on hover
- Full keyboard accessibility

### 5. Featured Badge
- Optional "⭐ Featured" badge
- Eye-catching gradient background
- Slide-in animation on load
- Positioned top-right of image

### 6. Hover Effects
- Card lift animation (-8px on desktop, -4px on mobile)
- Image zoom (1.08x)
- Image overlay with semi-transparent blue background
- Title color change to primary
- Technology tag color transitions
- Shadow enhancement

### 7. Responsive Design
- **Desktop (1024px+)**: Full featured layout
- **Tablet (768px-1023px)**: Optimized spacing and sizing
- **Mobile (480px-767px)**: Stacked buttons, adjusted fonts
- **Small Mobile (<480px)**: Minimal padding, single-column buttons

### 8. Accessibility
- ARIA labels on all links
- Focus-visible outlines on interactive elements
- Semantic HTML structure
- Keyboard navigation support
- Reduced motion support
- High contrast mode support
- Dark mode support

## Usage Examples

### Basic Usage
```typescript
// In your component
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';

@Component({
  imports: [CommonModule, ProjectCardComponent],
})
export class ProjectsComponent {
  projects = [
    {
      id: '1',
      title: 'E-Commerce Platform',
      shortDescription: 'A full-featured e-commerce platform built with Angular and Material Design.',
      description: 'Full description here...',
      image: 'assets/projects/ecommerce.jpg',
      technologies: ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'Material'],
      link: 'https://ecommerce-demo.com',
      github: 'https://github.com/user/ecommerce',
      featured: true,
      category: 'Web App'
    },
    // More projects...
  ];
}
```

### In Template
```html
<div class="projects-grid">
  @for (project of projects; track project.id) {
    <app-project-card [project]="project"></app-project-card>
  }
</div>
```

### Grid Layout Example
```scss
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 32px;
  padding: 40px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
    padding: 24px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 16px;
  }
}
```

## Customization

### Colors
Modify SCSS variables:
```scss
$primary-color: #1976d2;      // Primary actions
$accent-color: #ff4081;        // Secondary actions
$text-dark: #1a1a1a;          // Main text
$text-light: #666;            // Secondary text
```

### Spacing
Adjust padding in different breakpoints:
```scss
.card-content {
  padding: 20px;              // Desktop

  @media (max-width: $breakpoint-md) {
    padding: 16px;            // Tablet
  }

  @media (max-width: $breakpoint-sm) {
    padding: 14px;            // Mobile
  }
}
```

### Image Height
Customize image container height:
```scss
.image-container {
  height: 220px;              // Desktop

  @media (max-width: $breakpoint-md) {
    height: 180px;            // Tablet
  }

  @media (max-width: $breakpoint-sm) {
    height: 160px;            // Mobile
  }
}
```

### Animations
Adjust transition speed:
```scss
$transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

// For slower animations
$transition-smooth: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
```

### Hover Effect Distance
Modify card lift amount:
```scss
.project-card:hover {
  transform: translateY(-8px);   // Change -8px to desired value
}
```

## Material Modules Required

The component uses the following Angular Material modules:
- `MatCardModule` - Card container
- `MatButtonModule` - Action buttons
- `MatIconModule` - Icons (Material Icons)
- `MatTooltipModule` - Hover tooltips
- `MatBadgeModule` - Optional badges

These are imported in the standalone component.

## Icon Names Used

- `launch` - Live demo link
- `code` - GitHub link
- `open_in_new` - Overlay demo link
- Material Icons library (font-based or SVG)

## Best Practices

### 1. Image Optimization
- Use optimized image sizes (recommendation: 600-800px wide)
- Use WebP format with JPG fallback
- Lazy load images with `loading="lazy"`

### 2. Data Validation
- Ensure `technologies` array is not empty
- Provide meaningful shortDescription (2-3 sentences)
- Include both `link` and `github` when possible

### 3. Category Usage
- Keep category names short (1-2 words)
- Use consistent category names across projects
- Examples: "Web App", "Library", "Tool", "Dashboard"

### 4. Featured Projects
- Limit featured projects to top 2-3
- Use for most impressive or recent work
- Displays special badge and styling

### 5. Layout Integration
```scss
.projects-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 32px;
  padding: 60px;
}
```

## Performance Considerations

- ✅ Lazy image loading
- ✅ OnPush change detection strategy
- ✅ Minimal runtime calculations
- ✅ CSS animations (GPU accelerated)
- ✅ No unnecessary re-renders
- ✅ Efficient flex/grid layouts

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile 90+)

## Testing Checklist

- [ ] Image loads and displays correctly
- [ ] Overlay appears on hover
- [ ] Live demo button links work
- [ ] GitHub button links work
- [ ] Featured badge displays for featured projects
- [ ] Responsive layout works on all breakpoints
- [ ] Animations are smooth
- [ ] Dark mode styles apply correctly
- [ ] Keyboard navigation works
- [ ] Focus visible on all interactive elements
- [ ] Tooltips display on hover
- [ ] Technology tags display and wrap correctly

## Accessibility Compliance

- ✅ WCAG AA Level compliant
- ✅ Semantic HTML
- ✅ ARIA labels on links
- ✅ Focus management
- ✅ Color contrast > 4.5:1
- ✅ Keyboard navigation
- ✅ Screen reader friendly
- ✅ Reduced motion support
- ✅ High contrast mode support

## Dark Mode

The component automatically adapts to dark mode:
- Dark background for cards
- Adjusted text colors for contrast
- Modified border and shadow colors
- Optimized for `@media (prefers-color-scheme: dark)`

## Print Styles

Optimized for printing:
- No box shadows or overlays
- Hidden action buttons and overlays
- Clean, minimal styling
- Page break support

## Troubleshooting

### Image not displaying
- Check image path is correct
- Verify image is in `public/` folder
- Check browser console for 404 errors

### Buttons not clickable
- Verify `link` and `github` URLs are valid
- Check all anchor tags have proper `href`
- Ensure `target="_blank"` is set

### Responsive issues
- Check viewport meta tag is set
- Verify breakpoint values match your design
- Test with browser DevTools device emulation

### Styling not applying
- Verify component imports Material modules
- Check SCSS variables are defined
- Ensure no global CSS overrides styles

## Related Components

- [Experience Card](../experience-card/) - Similar component for experience
- [Skill Card](../skill-card/) - Component for skills display
- [Hero Section](../../features/home/) - Hero section component

## Examples

### Featured Project
```typescript
{
  id: 'featured-1',
  title: 'AI-Powered Portfolio',
  shortDescription: 'Intelligent portfolio with AI assistant.',
  description: '...',
  image: 'assets/projects/ai-portfolio.jpg',
  technologies: ['Angular 21', 'TypeScript', 'Material', 'TailwindCSS'],
  link: 'https://ai-portfolio.com',
  github: 'https://github.com/user/ai-portfolio',
  featured: true,
  category: 'Portfolio'
}
```

### Project with Only GitHub
```typescript
{
  id: 'github-only',
  title: 'TypeScript Utilities Library',
  shortDescription: 'Collection of useful TypeScript utilities.',
  description: '...',
  technologies: ['TypeScript', 'Jest'],
  github: 'https://github.com/user/ts-utils',
  featured: false,
  category: 'Library'
}
```

## Version History

- **v1.0.0** - Initial release with Material integration
- **v2.0.0** - Redesign with enhanced hover effects and responsive improvements
