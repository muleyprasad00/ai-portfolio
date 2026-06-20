# Modern Hero Section - Implementation Guide

## Overview
A modern, responsive hero section built with Angular Material and SCSS. Features a two-column layout with profile image, introduction, CTA buttons, social links, and statistics.

## Features

### 1. Two-Column Layout
- **Desktop**: Side-by-side layout with profile image on left, content on right
- **Tablet**: Stacked layout with image on top
- **Mobile**: Full-width responsive design with center-aligned content

### 2. Profile Image
- Responsive image with lazy loading
- Automatic gradient fallback if image is missing
- Smooth hover animations and 3D perspective effect
- Image overlay gradient for visual enhancement

### 3. Introduction Section
- Greeting badge with emoji
- Animated title with gradient text
- Subtitle with professional role
- Detailed description with optimal line height

### 4. CTA Buttons
- Three action buttons: View Projects, Get In Touch, Download Resume
- Material Design raised buttons with custom styling
- Ripple effects on click
- Responsive: horizontal on desktop, stacked on mobile
- Gradient backgrounds with smooth hover transitions

### 5. Social Links
- Icon-based social media links
- Material tooltips on hover
- Circle design with hover animations
- Links: LinkedIn, GitHub, Twitter, Email
- Fully accessible with ARIA labels

### 6. Statistics Section
- Grid layout showing key metrics
- Cards with hover effects
- Gradient-styled numbers
- Responsive grid that adapts to screen size

### 7. Responsive Design
- Mobile-first approach
- Breakpoints: 768px (mobile), 1024px (tablet)
- Optimized font sizes, spacing, and layouts
- Print-friendly styles

### 8. Animations
- Staggered entrance animations for visual appeal
- Smooth transitions on hover
- 3D perspective effects on profile image
- Ripple effects on button clicks

## Setup Instructions

### 1. Add Profile Image
Place a profile image at `public/profile.jpg` (recommended size: 380x380px or larger)

**File path**: `f:\workspace_angular\ai-portfolio\public\profile.jpg`

### 2. Add Resume File
Place your resume at `public/resume.pdf` for download

**File path**: `f:\workspace_angular\ai-portfolio\public\resume.pdf`

### 3. Update Social Links
Edit the `socialLinks` array in `home.component.ts` with your actual URLs:

```typescript
socialLinks = [
  { icon: 'linkedin', url: 'https://linkedin.com/in/your-profile', label: 'LinkedIn' },
  { icon: 'github', url: 'https://github.com/your-username', label: 'GitHub' },
  { icon: 'twitter', url: 'https://twitter.com/your-handle', label: 'Twitter' },
  { icon: 'mail', url: 'mailto:your-email@example.com', label: 'Email' },
];
```

### 4. Customize Statistics
Edit the `stats` array to reflect your actual metrics:

```typescript
stats = [
  { number: '10+', label: 'Years Experience' },
  { number: '50+', label: 'Projects Completed' },
  { number: '100%', label: 'Client Satisfaction' },
];
```

### 5. Update App Constants
Update `src/app/core/constants/app.constants.ts`:

```typescript
export const APP_CONSTANTS = {
  PROFILE_NAME: 'Your Name',
  PROFILE_TITLE: 'Your Professional Title',
  PROFILE_EMAIL: 'your-email@example.com',
  // ... rest of constants
};
```

## File Structure

```
src/app/features/home/
├── home.component.ts       # Component class with data
├── home.component.html     # Template with two-column layout
└── home.component.scss     # Modern responsive styles

public/
├── profile.jpg             # Your profile image (380x380px+)
└── resume.pdf              # Your resume file
```

## Material Icons Used

The component uses the following Material icons:

- `folder_open` - View Projects button
- `mail` - Get In Touch button
- `download` - Resume download button
- `linkedin` - LinkedIn social link
- `github` - GitHub social link
- `twitter` - Twitter social link
- `mail` - Email social link

## Customization

### Colors
Modify SCSS variables in `home.component.scss`:

```scss
$primary-color: #1976d2;
$accent-color: #ff4081;
$gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Breakpoints
Adjust responsive breakpoints:

```scss
$breakpoint-mobile: 768px;
$breakpoint-tablet: 1024px;
```

### Animations
All animations are defined in the SCSS file:
- `slideInLeft` / `slideInRight` / `slideInUp`
- `fadeInDown` / `fadeInUp`

Modify animation duration and timing:

```scss
$transition-smooth: all 0.3s ease; // Change duration here
```

## Dark Mode Support

The component includes automatic dark mode support using `@media (prefers-color-scheme: dark)`. Styling automatically adjusts for dark mode users.

## Accessibility Features

- ✅ ARIA labels on social links
- ✅ Semantic HTML structure
- ✅ Focus-visible outlines on interactive elements
- ✅ Material Design accessibility compliance
- ✅ Lazy loading for images
- ✅ Proper color contrast ratios

## Performance Optimization

- Lazy loading on profile image
- CSS animations (GPU accelerated)
- Optimized Material imports (standalone)
- SVG-based Material icons
- Minimal JavaScript interactions

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Testing Checklist

- [ ] Profile image loads correctly
- [ ] Resume PDF downloads when button clicked
- [ ] Social links open in new tabs
- [ ] CTA buttons navigate to correct routes
- [ ] Responsive design works on mobile, tablet, desktop
- [ ] Animations play smoothly
- [ ] Dark mode styling applies correctly
- [ ] Keyboard navigation works
- [ ] Hover states are visible on all interactive elements
- [ ] Print preview looks good

## Next Steps

1. Add profile image and resume files to `public/` folder
2. Update social links with your actual profiles
3. Customize colors and animations as needed
4. Test on different devices and browsers
5. Verify all links and downloads work
6. Run accessibility checks with AXE or similar tools
