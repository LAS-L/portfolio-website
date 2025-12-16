// App constants
export const APP_NAME = 'DevPortfolio'
export const APP_DESCRIPTION =
  'Modern developer portfolio showcasing projects and skills'
export const APP_AUTHOR = 'Alex Johnson'
export const APP_URL = 'https://yourportfolio.com'

// Contact information
export const CONTACT_INFO = {
  email: 'hello@example.com',
  phone: '+1 (123) 456-7890',
  location: 'San Francisco, CA',
  availability: 'Available for freelance work & full-time positions',
}

// Social media links
export const SOCIAL_LINKS = {
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
  twitter: 'https://twitter.com/yourusername',
  codepen: 'https://codepen.io/yourusername',
  devto: 'https://dev.to/yourusername',
}

// Navigation items
export const NAV_ITEMS = [
  { label: 'Home', href: '#home', icon: '🏠' },
  { label: 'Skills', href: '#skills', icon: '💻' },
  { label: 'Projects', href: '#projects', icon: '🚀' },
  { label: 'Experience', href: '#experience', icon: '📈' },
  { label: 'Contact', href: '#contact', icon: '📞' },
]

// Tech stack categories
export const TECH_CATEGORIES = [
  'Frontend',
  'Backend',
  'Database',
  'DevOps',
  'Tools',
  'Design',
  'Mobile',
  'Testing',
]

// Color themes
export const THEMES = {
  light: {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#1f2937',
    muted: '#6b7280',
  },
  dark: {
    primary: '#60a5fa',
    secondary: '#a78bfa',
    background: '#111827',
    surface: '#1f2937',
    text: '#f9fafb',
    muted: '#9ca3af',
  },
}

// Performance targets
export const PERFORMANCE_TARGETS = {
  lighthouse: {
    performance: 95,
    accessibility: 100,
    bestPractices: 100,
    seo: 100,
  },
  webVitals: {
    lcp: 2500, // 2.5 seconds
    fid: 100, // 100 milliseconds
    cls: 0.1, // 0.1
    inp: 200, // 200 milliseconds
  },
}

// Breakpoints
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

// Local storage keys
export const STORAGE_KEYS = {
  theme: 'portfolio-theme',
  visited: 'portfolio-visited',
  formData: 'portfolio-form-data',
}

// EmailJS configuration
export const EMAILJS_CONFIG = {
  serviceId: 'portfolio_service',
  templateId: 'contact_form',
  userId: 'user_xxxxxxxxxx',
}

// SEO constants
export const SEO = {
  title: 'Alex Johnson | Senior Frontend Developer',
  description:
    'Professional portfolio showcasing modern web development skills, projects, and experience.',
  keywords: [
    'frontend',
    'developer',
    'react',
    'javascript',
    'portfolio',
    'web development',
  ],
  ogImage: '/og-image.png',
  twitterImage: '/twitter-image.png',
}
