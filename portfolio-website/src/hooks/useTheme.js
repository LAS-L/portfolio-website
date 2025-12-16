# Create useTheme hook
cat > src/hooks/useTheme.js << 'EOF'
import { useState, useEffect, useCallback } from 'react'

export const useTheme = () => {
  const [theme, setTheme] = useState('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const savedTheme = localStorage.getItem('theme')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setTheme('dark')
      document.documentElement.classList.add('dark')
    } else {
      setTheme('light')
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
    window.dispatchEvent(new CustomEvent('themechange', { detail: newTheme }))
  }, [theme])

  return { theme, toggleTheme, mounted }
}
EOF

# Create useProjects hook
cat > src/hooks/useProjects.js << 'EOF'
import { useState, useMemo, useCallback } from 'react'
import projectsData from '../data/projects.json'

export const useProjects = () => {
  const [selectedTags, setSelectedTags] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  const allTags = useMemo(() => {
    const tags = new Set()
    projectsData.forEach(project => {
      project.tags.forEach(tag => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [])

  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => {
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => project.tags.includes(tag))
      
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
EOF

# Create useScrollAnimation hook
cat > src/hooks/useScrollAnimation.js << 'EOF'
import { useEffect, useRef, useState } from 'react'

export const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return [ref, isVisible]
}
EOF