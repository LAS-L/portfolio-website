# Create Projects component
cat > src/components/Projects.jsx << 'EOF'
import React from 'react'
import { motion } from 'framer-motion'
import { useProjects } from '../hooks/useProjects'
import ProjectCard from './ProjectCard'
import { FaFilter, FaSearch, FaTimes } from 'react-icons/fa'

const Projects = () => {
  const {
    projects,
    allTags,
    selectedTags,
    searchQuery,
    setSearchQuery,
    toggleTag,
    clearFilters,
    totalProjects,
    showingProjects
  } = useProjects()

  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Featured <span className="text-gradient">Projects</span>
        </motion.h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A collection of my recent work showcasing problem-solving, technical skills, and design thinking.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <div className="max-w-2xl mx-auto">
          <div className="relative mb-6">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by name, tech, or description..."
              className="w-full pl-12 pr-12 py-3 rounded-lg border border-gray-300 dark:border-gray-700 
                       bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              aria-label="Search projects"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <FaTimes />
              </button>
            )}
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FaFilter className="text-gray-500" />
                <span className="font-medium">Filter by Tech Stack:</span>
              </div>
              {selectedTags.length > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => {
                const isSelected = selectedTags.includes(tag)
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 
                              ${isSelected 
                                ? 'bg-primary-600 text-white' 
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                              }`}
                    aria-pressed={isSelected}
                  >
                    {tag}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Showing {showingProjects} of {totalProjects} projects
            {selectedTags.length > 0 && ` • Filtered by: ${selectedTags.join(', ')}`}
          </div>
        </div>
      </motion.div>

      {projects.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-5xl mb-4">📭</div>
          <h3 className="text-xl font-semibold mb-2">No projects found</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Try adjusting your search or filters
          </p>
          <button
            onClick={clearFilters}
            className="mt-4 text-primary-600 dark:text-primary-400 hover:underline"
          >
            Clear all filters
          </button>
        </motion.div>
      )}
    </section>
  )
}

export default Projects
EOF

# Create ProjectCard component
cat > src/components/ProjectCard.jsx << 'EOF'
import React from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaStar } from 'react-icons/fa'

const ProjectCard = ({ project, index }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="card overflow-hidden group"
    >
      {/* Project Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Project Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {project.title}
          </h3>
          {project.featured && (
            <FaStar className="text-yellow-500 flex-shrink-0" />
          )}
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Features List */}
        {project.features && (
          <ul className="mb-4 space-y-1">
            {project.features.slice(0, 3).map((feature, idx) => (
              <li key={idx} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                {feature}
              </li>
            ))}
          </ul>
        )}

        {/* Links */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            aria-label="View code on GitHub"
          >
            <FaGithub />
            <span className="text-sm font-medium">Code</span>
          </a>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            aria-label="View live demo"
          >
            <FaExternalLinkAlt />
            <span className="text-sm font-medium">Live Demo</span>
          </a>
        </div>
      </div>
    </motion.article>
  )
}

export default ProjectCard
EOF

# Create Loading Spinner
cat > src/components/LoadingSpinner.jsx << 'EOF'
import React from 'react'
import { motion } from 'framer-motion'

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full"
      />
    </div>
  )
}

export default LoadingSpinner
EOF

# Create SEO component
cat > src/components/SEO.jsx << 'EOF'
import React from 'react'
import { Helmet } from 'react-helmet-async'

export const SEO = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Alex Johnson",
    "jobTitle": "Senior Frontend Developer",
    "url": "https://yourportfolio.com",
    "sameAs": [
      "https://github.com/yourusername",
      "https://linkedin.com/in/yourusername",
      "https://twitter.com/yourusername"
    ],
    "knowsAbout": ["React", "JavaScript", "TypeScript", "Frontend Development", "UI/UX Design"]
  }

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>Alex Johnson | Senior Frontend Developer</title>
      <meta name="title" content="Alex Johnson | Senior Frontend Developer" />
      <meta name="description" content="Professional portfolio showcasing modern web development skills, projects, and experience in React, JavaScript, and frontend technologies." />
      <meta name="keywords" content="frontend developer, react developer, javascript, portfolio, web development" />
      <meta name="author" content="Alex Johnson" />
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://yourportfolio.com/" />
      <meta property="og:title" content="Alex Johnson | Senior Frontend Developer" />
      <meta property="og:description" content="Professional portfolio showcasing modern web development skills, projects, and experience in React, JavaScript, and frontend technologies." />
      <meta property="og:image" content="https://yourportfolio.com/og-image.png" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://yourportfolio.com/" />
      <meta property="twitter:title" content="Alex Johnson | Senior Frontend Developer" />
      <meta property="twitter:description" content="Professional portfolio showcasing modern web development skills, projects, and experience in React, JavaScript, and frontend technologies." />
      <meta property="twitter:image" content="https://yourportfolio.com/twitter-image.png" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Canonical URL */}
      <link rel="canonical" href="https://yourportfolio.com/" />
    </Helmet>
  )
}
EOF