
import { useState, useMemo, useCallback } from 'react'

// Import projects data
const projectsData = [
  {
    "id": 1,
    "title": "E-Commerce Platform",
    "description": "A full-featured e-commerce platform with real-time inventory, payment processing, and admin dashboard.",
    "longDescription": "Built a scalable e-commerce solution using React, Node.js, and MongoDB. Implemented features like real-time inventory updates, secure payment processing with Stripe, and a comprehensive admin dashboard for order management.",
    "image": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "tags": ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
    "github": "https://github.com/yourusername/ecommerce-platform",
    "liveUrl": "https://ecommerce-demo.example.com",
    "features": [
      "Real-time inventory management",
      "Secure payment processing",
      "Admin dashboard",
      "Responsive design",
      "User authentication"
    ],
    "challenges": "Handling concurrent inventory updates and ensuring payment security.",
    "solution": "Implemented WebSocket for real-time updates and used Stripe's secure payment API.",
    "impact": "Reduced cart abandonment by 30% and improved page load speed by 40%."
  },
  {
    "id": 2,
    "title": "Health & Fitness Tracker",
    "description": "Mobile-first fitness tracking application with workout plans and nutrition logging.",
    "longDescription": "Developed a Progressive Web App for fitness tracking with offline capabilities. Features include workout planning, nutrition logging, progress tracking, and social sharing.",
    "image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "tags": ["React", "PWA", "Chart.js", "Firebase", "Service Workers"],
    "github": "https://github.com/yourusername/fitness-tracker",
    "liveUrl": "https://fitness-tracker.example.com",
    "features": [
      "Offline functionality",
      "Workout planning",
      "Progress charts",
      "Nutrition tracking",
      "Social features"
    ],
    "challenges": "Implementing offline data sync and complex chart visualizations.",
    "solution": "Used IndexedDB for offline storage and Chart.js for data visualization.",
    "impact": "Helped users achieve 25% better consistency in workout routines."
  },
  {
    "id": 3,
    "title": "Real Estate Marketplace",
    "description": "Modern property listing platform with virtual tours and AI-powered recommendations.",
    "longDescription": "Created a real estate marketplace with virtual property tours, AI-powered property recommendations, and advanced search filters. Integrated with Google Maps API and implemented a bidding system.",
    "image": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "tags": ["Next.js", "TypeScript", "Tailwind CSS", "Google Maps API", "AI/ML"],
    "github": "https://github.com/yourusername/real-estate-platform",
    "liveUrl": "https://real-estate.example.com",
    "features": [
      "Virtual property tours",
      "AI recommendations",
      "Advanced search",
      "Map integration",
      "Bidding system"
    ],
    "challenges": "Handling large datasets and implementing real-time bidding.",
    "solution": "Used WebSocket for real-time updates and optimized database queries.",
    "impact": "Increased user engagement by 45% and reduced property search time by 60%."
  },
  {
    "id": 4,
    "title": "Task Management SaaS",
    "description": "Collaborative task management platform for teams with time tracking and reporting.",
    "longDescription": "Built a comprehensive task management solution with team collaboration features, time tracking, automated reporting, and integration with popular tools like Slack and GitHub.",
    "image": "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "tags": ["Vue.js", "Express", "PostgreSQL", "Docker", "Redis"],
    "github": "https://github.com/yourusername/task-management",
    "liveUrl": "https://tasks.example.com",
    "features": [
      "Team collaboration",
      "Time tracking",
      "Automated reports",
      "Third-party integrations",
      "Role-based access"
    ],
    "challenges": "Managing real-time updates across multiple teams and users.",
    "solution": "Implemented Redis for pub/sub messaging and optimized database design.",
    "impact": "Improved team productivity by 35% and reduced meeting time by 50%."
  },
  {
    "id": 5,
    "title": "Learning Management System",
    "description": "Online learning platform with video courses, quizzes, and progress tracking.",
    "longDescription": "Developed an LMS supporting video courses, interactive quizzes, progress tracking, and certificate generation. Features include course creation tools for instructors and learning analytics.",
    "image": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "tags": ["React", "Django", "PostgreSQL", "Video.js", "JWT"],
    "github": "https://github.com/yourusername/lms-platform",
    "liveUrl": "https://learn.example.com",
    "features": [
      "Video courses",
      "Interactive quizzes",
      "Progress tracking",
      "Certificate generation",
      "Learning analytics"
    ],
    "challenges": "Streaming video content efficiently and handling concurrent users.",
    "solution": "Used CDN for video delivery and optimized database queries with caching.",
    "impact": "Supported 10,000+ active learners with 95% satisfaction rate."
  },
  {
    "id": 6,
    "title": "Weather Dashboard",
    "description": "Real-time weather application with forecasts, maps, and severe weather alerts.",
    "longDescription": "Created a weather dashboard using multiple weather APIs to provide accurate forecasts, interactive maps, severe weather alerts, and historical data visualization.",
    "image": "https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "tags": ["JavaScript", "Weather APIs", "Chart.js", "Leaflet", "Webpack"],
    "github": "https://github.com/yourusername/weather-dashboard",
    "liveUrl": "https://weather.example.com",
    "features": [
      "Real-time forecasts",
      "Interactive maps",
      "Severe weather alerts",
      "Historical data",
      "Location-based"
    ],
    "challenges": "Integrating multiple weather APIs and handling rate limits.",
    "solution": "Implemented API caching and fallback mechanisms.",
    "impact": "Provided reliable weather information to 50,000+ monthly users."
  }
]

export const useProjects = () => {
  const [selectedTags, setSelectedTags] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  // Extract all unique tags from projects
  const allTags = useMemo(() => {
    const tags = new Set()
    projectsData.forEach(project => {
      project.tags.forEach(tag => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [])

  // Filter projects based on selected tags and search query
  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => {
      // Filter by tags (if any selected)
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => project.tags.includes(tag))
      
      // Filter by search query
      const matchesSearch = !searchQuery || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      
      return matchesTags && matchesSearch
    })
  }, [selectedTags, searchQuery])

  const toggleTag = useCallback((tag) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag)
      } else {
        return [...prev, tag]
      }
    })
  }, [])

  const clearFilters = useCallback(() => {
    setSelectedTags([])
    setSearchQuery('')
  }, [])

  return {
    projects: filteredProjects,
    allTags,
    selectedTags,
    searchQuery,
    setSearchQuery,
    toggleTag,
    clearFilters,
    totalProjects: projectsData.length,
    showingProjects: filteredProjects.length
  }
}
