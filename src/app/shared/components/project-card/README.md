# 🎨 Project Card Component

A modern, reusable Angular Material project card component designed for portfolio websites. Features a two-column layout with project images, technology tags, GitHub links, live demo buttons, and stunning hover effects.

## ✨ Key Features

### Visual Design
- **Material Design** - Professional, consistent styling
- **Gradient Accents** - Modern color gradients for primary actions
- **Smooth Animations** - Polished transitions and hover effects
- **Responsive Images** - Lazy loading with gradient fallback

### Interactive Elements  
- **Image Overlay** - Click-to-action buttons appear on hover
- **Featured Badge** - ⭐ Badge for standout projects
- **CTA Buttons** - Live Demo (primary) and GitHub (accent) links
- **Tooltips** - Material Design tooltips for button hints
- **Ripple Effects** - Button click animations

### Responsive Layout
- **Desktop**: Full-featured 220px image with side-by-side layout
- **Tablet**: 180px image with optimized spacing
- **Mobile**: 160px image with stacked buttons
- **Breakpoints**: 480px, 768px, 1024px

### Accessibility
- ✅ WCAG AA Compliant
- ✅ ARIA Labels on all links
- ✅ Semantic HTML structure
- ✅ Keyboard navigation support
- ✅ Focus visible indicators
- ✅ Dark mode support
- ✅ High contrast mode support
- ✅ Reduced motion support
- ✅ Screen reader friendly

### Performance
- 🚀 OnPush change detection
- 🚀 Lazy image loading
- 🚀 GPU-accelerated animations
- 🚀 Minimal JavaScript
- 🚀 Efficient CSS grid layouts

## 📦 Component Structure

```
project-card/
├── project-card.component.ts       (24 lines - Component class)
├── project-card.component.html     (70+ lines - Template)
├── project-card.component.scss     (550+ lines - Styles)
├── PROJECT_CARD_GUIDE.md          (Detailed reference)
├── EXAMPLES.md                     (Implementation examples)
└── IMPLEMENTATION_SUMMARY.md       (Overview & checklist)
```

## 🚀 Quick Start

### 1. Import the Component

```typescript
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';

@Component({
  imports: [ProjectCardComponent]
})
```

### 2. Add to Template

```html
<app-project-card [project]="myProject"></app-project-card>
```

### 3. Prepare Project Data

```typescript
const project: Project = {
  id: '1',
  title: 'E-Commerce Platform',
  shortDescription: 'Full-featured e-commerce built with Angular.',
  description: 'Detailed description...',
  image: 'assets/projects/ecommerce.jpg',
  technologies: ['Angular', 'TypeScript', 'Material'],
  link: 'https://demo.example.com',
  github: 'https://github.com/user/ecommerce',
  featured: true,
  category: 'Web App'
};
```

### 4. Create Grid Layout

```html
<div class="projects-grid">
  @for (project of projects; track project.id) {
    <app-project-card [project]="project"></app-project-card>
  }
</div>
```

```scss
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 32px;
  padding: 60px;
}
```

## 📋 Project Model

```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  image?: string;          // Project screenshot/image
  technologies: string[];  // Array of tech tags
  link?: string;           // Live demo URL
  github?: string;         // GitHub repository URL
  featured: boolean;       // Show featured badge
  category?: string;       // Project category
}
```

## 🎯 Input Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `project` | `Project` | ✅ Yes | The project data object |

## 🎨 Customization

### Colors
```scss
// In your component or global styles
$primary-color: #1976d2;      // Primary buttons
$accent-color: #ff4081;        // Secondary buttons
$gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Spacing
```scss
.projects-grid {
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); // Larger cards
  gap: 48px; // More space between cards
}
```

### Animations
```scss
$transition-smooth: all 0.5s ease; // Slower animations
```

## 🌙 Dark Mode

Automatically adapts to user's system preference:
```css
@media (prefers-color-scheme: dark) {
  /* Dark mode styles applied */
}
```

## ♿ Accessibility Features

```html
<!-- ARIA labels on links -->
<a aria-label="View Live Demo"></a>

<!-- Semantic structure -->
<article role="listitem">
  <app-project-card></app-project-card>
</article>

<!-- Focus management -->
<a href="..." mat-icon-button>
  <!-- Automatic focus-visible outline -->
</a>

<!-- Reduced motion support -->
@media (prefers-reduced-motion: reduce) {
  /* No animations */
}
```

## 📱 Responsive Breakpoints

| Breakpoint | Width | Changes |
|------------|-------|---------|
| Mobile | < 480px | Single-column buttons, minimal padding |
| Tablet | 480px - 767px | Optimized spacing, smaller fonts |
| Small Desktop | 768px - 1023px | Two-column layout prep |
| Desktop | ≥ 1024px | Full-featured layout |

## 🎭 Hover Effects

- **Card**: Lifts 8px with enhanced shadow
- **Image**: Zooms to 1.08x with overlay blur
- **Buttons**: Glow effect with elevation change
- **Tags**: Color transition to primary color
- **Title**: Changes to primary gradient color

## 🔗 Material Dependencies

Required Angular Material modules (auto-imported):
- `MatCardModule` - Card container
- `MatButtonModule` - Buttons
- `MatIconModule` - Icons
- `MatTooltipModule` - Tooltips
- `MatBadgeModule` - Optional badges

## 🌍 Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 90+ | ✅ Full |
| Firefox | 88+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Edge | 90+ | ✅ Full |
| iOS Safari | 14+ | ✅ Full |
| Chrome Mobile | 90+ | ✅ Full |

## 📊 File Size

- **Component TS**: 0.3 KB (minified)
- **HTML**: 2.1 KB (minified)
- **SCSS**: 18 KB (compiled CSS ~10 KB minified)
- **Total**: ~13 KB (compiled & minified)

## 🧪 Testing

### Unit Test Example
```typescript
describe('ProjectCardComponent', () => {
  let component: ProjectCardComponent;
  let fixture: ComponentFixture<ProjectCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('project', mockProject);
    fixture.detectChanges();
  });

  it('should display project title', () => {
    expect(fixture.nativeElement.querySelector('.project-title').textContent)
      .toContain('Project Title');
  });

  it('should display technology tags', () => {
    const tags = fixture.nativeElement.querySelectorAll('.tech-tag');
    expect(tags.length).toBe(3);
  });

  it('should have correct links', () => {
    const demoBtn = fixture.nativeElement.querySelector('.live-demo-btn');
    expect(demoBtn.href).toBe(mockProject.link);
  });
});
```

### Accessibility Test
```bash
# Install Axe DevTools
npm install --save-dev @axe-core/react

# Run accessibility tests
axe(document)
```

## 📚 Documentation

1. **[PROJECT_CARD_GUIDE.md](./PROJECT_CARD_GUIDE.md)** - Complete reference guide
2. **[EXAMPLES.md](./EXAMPLES.md)** - Implementation examples and use cases
3. **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Overview and checklist

## 🎯 Common Use Cases

### Gallery/Portfolio Page
```html
<section class="projects-gallery">
  <h1>My Projects</h1>
  <div class="projects-grid">
    @for (project of projects; track project.id) {
      <app-project-card [project]="project"></app-project-card>
    }
  </div>
</section>
```

### Featured Projects Carousel
```html
<swiper [slides-per-view]="3" gap="32">
  @for (project of featuredProjects; track project.id) {
    <swiper-slide>
      <app-project-card [project]="project"></app-project-card>
    </swiper-slide>
  }
</swiper>
```

### Filtered Project List
```typescript
filteredProjects = computed(() => {
  const term = this.searchTerm();
  return this.projects().filter(p =>
    p.title.includes(term) || p.technologies.some(t => t.includes(term))
  );
});
```

## 🔧 Troubleshooting

### Image Not Loading
- Verify image path is correct
- Check image is in `public/` folder
- Inspect browser network tab for 404 errors

### Buttons Not Working
- Ensure `link` and `github` URLs are valid
- Verify `target="_blank"` is present
- Check console for any errors

### Responsive Issues
- Verify viewport meta tag in HTML head
- Test with browser DevTools device emulation
- Check breakpoint values match your design

### Styling Not Applying
- Ensure component imports Material modules
- Check SCSS variables are properly scoped
- Verify no global CSS overrides

## 🚀 Performance Tips

1. **Lazy Load Images**: Uses `loading="lazy"` by default
2. **Optimize Images**: Use WebP with JPG fallback
3. **CSS Animations**: GPU-accelerated, no performance issues
4. **OnPush Detection**: Minimal change detection cycles
5. **Virtual Scrolling**: Consider for 100+ projects

## 📝 License

Included with the AI Portfolio project.

## 🤝 Contributing

When modifying the project card component:
1. Maintain accessibility compliance (WCAG AA)
2. Test on multiple devices and browsers
3. Preserve OnPush change detection
4. Update documentation
5. Test keyboard navigation

## 📞 Support

For issues or questions:
1. Check [PROJECT_CARD_GUIDE.md](./PROJECT_CARD_GUIDE.md)
2. Review [EXAMPLES.md](./EXAMPLES.md)
3. See [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)

---

**Last Updated**: 2026-06-03  
**Component Version**: 2.0.0  
**Angular Version**: 21+  
**Material Version**: 21+
