# Ariel Mesa - Motion Graphics Portfolio

A professional, responsive, and accessible single-page portfolio website built with React, featuring multilingual support, theme switching, dual carousels, enhanced contact form, and interactive elements.

## 🚀 Quick Start

```bash
# Install dependencies
cd frontend && yarn install

# Start development server
yarn start

# Open http://localhost:3000
```

## 📋 New Features & Enhancements

### ✨ Major Updates Implemented:
- **Updated Hero**: "Take your brand to the next level." headline
- **Calendly Integration**: Schedule call button opens https://calendly.com/amesaedits01/30min
- **Dual Carousels**: Brand logos + YouTube channels with subscriber counts
- **Enhanced Projects**: 2x4 grid on desktop, swipeable carousel on mobile, video-only cards
- **Centered FAQ**: Horizontally centered with 5 accessible accordions + navbar link
- **Advanced Contact Form**: Service type, project type, budget fields + enhanced theming
- **Improved i18n**: Complete translation coverage with client-side switching
- **Alternating Backgrounds**: Soft gradient transitions between sections
- **Enhanced Theme System**: Proper CSS variables and localStorage persistence

## 🎨 Sections & Layout

1. **Hero**: Interactive landing with updated headline and Calendly link
2. **Brand Carousel**: Infinite loop of company logos (autoplay, pause on hover)
3. **YouTube Carousel**: Creator profiles with subscriber counts (dynamic markup)
4. **Projects**: 2x4 desktop grid, mobile swipe carousel, video thumbnails only
5. **FAQ**: Centered block with 5 accessible accordions
6. **Contact**: Enhanced form with service/project type, budget, and theme-aware styling
7. **Footer**: Social links and copyright

## 🔧 Configuration Guide

### 📅 Calendly Link Configuration
**Location**: `/frontend/src/components/Hero.js` (line ~88)
```javascript
const handleScheduleCall = () => {
  window.open('https://calendly.com/amesaedits01/30min', '_blank', 'noopener,noreferrer');
};
```
**To change**: Update the URL in the `handleScheduleCall` function.

### 📧 Email Configuration
**Location**: `/frontend/src/components/Contact.js` (line ~11)
```javascript
const destinationEmail = 'amesaedits01@gmail.com';
const webhookUrl = 'https://formspree.io/f/your-form-id'; // Replace with actual endpoint
```

**Mailto Fallback**: Automatically creates mailto links with form data
**Backend Endpoint**: For production, replace `webhookUrl` with your form handler

### 🏢 Brand Carousel Configuration
**Location**: `/frontend/src/components/BrandCarousel.js` (lines 12-21)
```javascript
const brands = [
  { id: 1, name: 'Google', url: 'https://logo.clearbit.com/google.com' },
  // Add more brands here
];
```
**To modify**: Edit the `brands` array with your client logos.

### 🎥 YouTube Carousel Configuration  
**Location**: `/frontend/src/components/YouTubeCarousel.js` (lines 12-62)
```javascript
const youtubeChannels = [
  { 
    id: 1, 
    name: 'MrBeast', 
    profileUrl: 'https://yt3.ggpht.com/...',
    subscribers: '112M',
    handle: '@MrBeast'
  },
  // Add more channels here  
];
```
**To modify**: Update the `youtubeChannels` array with actual creator data.

## 🌐 Translation System

### Adding New Languages
1. Create new locale file: `/public/locales/[lang].json`
2. Copy structure from existing files
3. Add language option to navbar

### Locale File Structure
- `/public/locales/es.json` - Spanish (default)
- `/public/locales/en.json` - English

### Translation Keys
```json
{
  "nav": { "home": "Home", "projects": "Projects", "faq": "FAQ", "contact": "Contact" },
  "hero": { "title": "...", "subtitle": "...", "microcopy": "..." },
  "contact": {
    "serviceTypes": { "videoEditing": "Video Editing" },
    "budgetRanges": { "under500": "Under $500" }
  }
}
```

## 🎨 Theme & Color System

### CSS Variables Location
**File**: `/frontend/src/App.css` (lines 3-45)

### Key Variables:
```css  
:root {
  --color-bg: #ffffff;           /* Main background */
  --color-text: #151515;         /* Primary text */
  --color-accent: #0070f3;       /* Accent color */
  --color-section-1: #ffffff;    /* Hero background */
  --color-section-2: linear-gradient(...); /* Brand carousel */
  /* etc... */
}

[data-theme="dark"] {
  --color-bg: #0b1220;          /* Dark background */
  --color-text: #ffffff;        /* Dark text */
  /* etc... */
}
```

### Theme Persistence
- **Location**: `/frontend/src/contexts/ThemeContext.js`
- **Storage**: `localStorage.getItem('theme')`
- **Fallback**: `prefers-color-scheme` media query

## 📱 Responsive Design

### Breakpoints
- **320px**: Minimum mobile
- **480px**: Large mobile  
- **768px**: Tablet (Projects switches to desktop grid)
- **1024px**: Desktop
- **1440px**: Large desktop

### Projects Layout
- **Desktop (≥768px)**: 2x4 grid (2 columns, 4 rows)
- **Mobile (<768px)**: Swipeable carousel with touch gestures

## ♿ Accessibility Features

- **WCAG AA Compliance**: Proper contrast ratios and color usage
- **Keyboard Navigation**: All interactive elements accessible via Tab/Enter/Space
- **Screen Reader Support**: ARIA labels, roles, and proper semantic HTML
- **Focus Management**: Visible focus indicators on all interactive elements
- **Reduced Motion**: Respects `prefers-reduced-motion` setting
- **Form Accessibility**: Error messages with `role="alert"`, proper labels

## 🧪 QA Testing Checklist

### ✅ Accessibility Tests
- [ ] Tab navigation works through all interactive elements
- [ ] FAQ accordions keyboard operable (Enter/Space)
- [ ] Play buttons keyboard operable (Enter/Space)  
- [ ] Form validation accessible (aria-invalid, role="alert")
- [ ] Color contrast meets WCAG AA standards
- [ ] Screen reader compatibility verified

### ✅ Theme Persistence Tests  
- [ ] Theme toggle works (light/dark switching)
- [ ] Theme persists on page reload
- [ ] System preference detected on first visit
- [ ] All sections respect theme colors
- [ ] Contact section stays dark in both themes

### ✅ Translation Tests
- [ ] Language selector switches without page reload
- [ ] All text translates (nav, hero, FAQ, contact form)
- [ ] Language persists on page reload  
- [ ] Form validation messages translate
- [ ] Select dropdown options translate

### ✅ Form Submission Tests
- [ ] All form fields validate correctly
- [ ] Service type and project type required
- [ ] Budget selection required  
- [ ] Email validation works
- [ ] Success/error messages display
- [ ] Mailto fallback works if webhook fails

### ✅ Carousel Behavior Tests
- [ ] Brand carousel autoplays and loops infinitely
- [ ] Brand carousel pauses on hover
- [ ] YouTube carousel shows subscriber counts
- [ ] Both carousels respect reduced motion preference
- [ ] Carousel controls work (pause/play buttons)

### ✅ Mobile Responsiveness Tests
- [ ] Projects carousel swipes work on mobile
- [ ] Touch gestures respond correctly
- [ ] Navigation indicators update on swipe
- [ ] All text readable on small screens (320px+)
- [ ] Forms work properly on mobile

### ✅ Performance Tests
- [ ] LCP (Largest Contentful Paint) ≤ 2.5s
- [ ] Images lazy load properly
- [ ] Videos use preload="none"
- [ ] Smooth animations (60fps)
- [ ] No layout shifts during load

## 📦 Production Build

```bash
# Build optimized version
yarn build

# Preview build locally  
npx serve -s build

# Deploy build/ folder to hosting provider
```

## 🔧 Technical Implementation Notes

### Form Submission Options

**Option 1: Mailto Fallback (Current)**
```javascript
// Automatically creates mailto: links with form data
const mailtoLink = `mailto:${destinationEmail}?subject=${subject}&body=${body}`;
window.location.href = mailtoLink;
```

**Option 2: Backend Endpoint (Recommended)**
```javascript
// Replace webhookUrl with your form handler
const response = await fetch(webhookUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});
```

### Carousel Implementation
- **Infinite Loop**: Uses CSS transforms with 3x content duplication
- **Performance**: Hardware-accelerated with `will-change: transform`
- **Accessibility**: Pause/play controls, respect reduced motion

### Theme System Architecture
- **CSS Custom Properties**: Centralized color management
- **Context API**: React state management for theme
- **Local Storage**: Persistent user preference
- **Media Query**: System preference fallback

## 🐛 Common Issues & Solutions

**Issue**: Carousel not looping smoothly
**Solution**: Ensure 3x content duplication and proper CSS animation keyframes

**Issue**: Theme not persisting  
**Solution**: Check localStorage access and ThemeContext provider wrapping

**Issue**: Translations not updating
**Solution**: Verify data-i18n attributes and useEffect dependencies

**Issue**: Form not submitting
**Solution**: Check webhook URL or mailto fallback implementation

---

**Built with ❤️ for Ariel Mesa - Motion Graphics Professional**  
Portfolio optimized for performance, accessibility, and user experience.
