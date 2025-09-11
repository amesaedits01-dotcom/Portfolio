# Ariel Mesa - Motion Graphics Portfolio

A professional, responsive, and accessible single-page portfolio website built with React, featuring multilingual support, theme switching, and interactive elements.

## 🚀 Quick Start

```bash
# Install dependencies
cd frontend && yarn install

# Start development server
yarn start

# Open http://localhost:3000
```

## 📋 Features

- **Responsive Design**: Works perfectly on all devices (320px to 1440px+)
- **Accessibility First**: WCAG AA compliant with keyboard navigation
- **Multilingual**: Spanish/English with persistent language selection
- **Theme Switching**: Light/dark mode with system preference detection
- **Interactive Elements**: Parallax particles, video previews, smooth animations
- **Performance Optimized**: Lazy loading, WebP images, minimal bundle size

## 🎨 Sections

1. **Hero**: Interactive landing with parallax particles and CTA buttons
2. **Logo Carousel**: Rotating client logos with pause/play controls
3. **Projects**: Tabbed portfolio (Reels, UI Videos, Product Videos, Logo Reveals)
4. **FAQ**: Expandable questions with smooth animations
5. **Contact**: Form with webhook integration and validation
6. **Footer**: Social links and copyright

## 🌐 Internationalization (i18n)

### Adding New Languages

1. Create new locale file: `/public/locales/[lang].json`
2. Copy structure from existing locale files
3. Add translation keys following the nested structure:

```json
{
  "nav": {
    "projects": "Projects",
    "contact": "Contact"
  },
  "hero": {
    "title": "Your title here",
    "subtitle": "Your subtitle here"
  }
}
```

### Locale File Structure

- `/public/locales/es.json` - Spanish translations
- `/public/locales/en.json` - English translations

All text content is externalized to these files for easy editing without code changes.

## 🎨 Theme System

### CSS Variables

The theme system uses CSS custom properties defined in `/src/App.css`:

```css
:root {
  --bg: #ffffff;
  --text: #151515;
  --accent: #0070f3;
  /* ... more variables */
}

[data-theme="dark"] {
  --bg: #0b1220;
  --text: #ffffff;
  --accent: #88a2ff;
  /* ... dark theme overrides */
}
```

### Adding Theme Variables

1. Define new variable in `:root` for light theme
2. Override in `[data-theme="dark"]` for dark theme
3. Use `var(--variable-name)` in CSS

## ✨ Animation System

### Background Particles

Located in `/src/components/Hero.js`:

- Uses `requestAnimationFrame` for smooth 60fps animation
- 3-layer mouse parallax system
- Respects `prefers-reduced-motion`
- Pausible with accessibility controls

### Micro-interactions

Configured in component CSS files:

- Hover states: `transform: translateY(-2px)`
- Transitions: `transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`
- Focus states: Visible outlines for keyboard navigation

## 📊 Content Management

### Schema.json Configuration

The `/public/schema.json` file controls all editable content:

```json
{
  "landing": {
    "name": "Ariel Mesa",
    "heroCopy": { ... }
  },
  "projects": [ ... ],
  "contact": {
    "webhookUrl": "https://your-webhook-url.com"
  }
}
```

### Webhook Configuration

To connect the contact form:

1. Update `webhookUrl` in `schema.json`
2. Form will POST JSON data to this endpoint
3. Expected payload format:
```json
{
  "name": "User Name",
  "email": "user@example.com", 
  "message": "User message"
}
```

## 🛠 Development

### File Structure

```
src/
├── components/
│   ├── Navbar.js + Navbar.css
│   ├── Hero.js + Hero.css
│   ├── Projects.js + Projects.css
│   ├── FAQ.js + FAQ.css
│   ├── Contact.js + Contact.css
│   └── Footer.js + Footer.css
├── contexts/
│   ├── ThemeContext.js
│   └── I18nContext.js
└── App.js + App.css
```

### Adding New Components

1. Create component file in `/src/components/`
2. Create matching CSS file
3. Import and use in `App.js`
4. Add necessary translations to locale files

## 📱 Responsive Breakpoints

Defined in `/src/App.css`:

- **320px**: Minimum mobile
- **480px**: Large mobile
- **768px**: Tablet
- **1024px**: Desktop
- **1440px**: Large desktop

## ♿ Accessibility Features

- **Keyboard Navigation**: All interactive elements accessible via Tab/Enter/Space
- **Screen Reader Support**: Proper ARIA labels and roles
- **Focus Management**: Visible focus indicators
- **Reduced Motion**: Respects `prefers-reduced-motion` setting
- **Color Contrast**: WCAG AA compliant contrast ratios
- **Form Validation**: Accessible error messages with `role="alert"`

## 🧪 Testing Checklist

### Manual QA Tests

- [ ] i18n persistence (language saves on reload)
- [ ] Theme persistence (dark/light mode saves on reload)
- [ ] Hamburger menu keyboard operable (Enter/Space)
- [ ] Play buttons keyboard operable (Enter/Space)
- [ ] FAQ accordion keyboard operable
- [ ] Form validation works correctly
- [ ] All links have proper `aria-label` attributes
- [ ] prefers-reduced-motion respected (animations disabled)
- [ ] Contrast checks pass WCAG AA standards
- [ ] Mobile responsive design works 320px-1440px+

### Performance Tests

- [ ] LCP (Largest Contentful Paint) ≤ 2.5s
- [ ] Images use `loading="lazy"`
- [ ] Videos use `preload="none"`
- [ ] No layout shifts during load
- [ ] Smooth 60fps animations

## 📦 Production Build

```bash
# Build for production
yarn build

# Preview build locally
npx serve -s build

# Deploy build/ folder to your hosting provider
```

## 🔧 Customization

### Colors
Edit CSS variables in `/src/App.css`

### Content
Edit translations in `/public/locales/*.json`

### Projects
Update project data in `/public/schema.json`

### Contact Form
Set webhook URL in `/public/schema.json`

---

Built with ❤️ for Ariel Mesa - Motion Graphics Designer
