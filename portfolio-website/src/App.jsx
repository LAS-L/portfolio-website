import React, { Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import Header from './components/Header'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Contact from './components/Contact.jsx'

import Footer from './components/Footer'
import LoadingSpinner from './components/LoadingSpinner'
import { SEO } from './components/SEO'
import { useTheme } from './hooks/useTheme'

const App = () => {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 ${theme}`}>
      <SEO />
      <Helmet>
        <html lang="en" className={theme} />
      </Helmet>
      
      <AnimatePresence mode="wait">
        <Suspense fallback={<LoadingSpinner />}>
          <Header />
          
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Hero />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Skills />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Projects />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Experience />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Contact />
            </motion.div>
          </main>

          <Footer />
        </Suspense>
      </AnimatePresence>
    </div>
  )
}

export default App
