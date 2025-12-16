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
