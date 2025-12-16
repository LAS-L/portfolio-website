import React from 'react'
import { motion } from 'framer-motion'
import { FaBriefcase, FaCalendar, FaMapMarkerAlt, FaStar } from 'react-icons/fa'
import experienceData from '../data/experience.json'

const Experience = () => {
  return (
    <section id="experience" className="py-16 md:py-24">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Work <span className="text-gradient">Experience</span>
        </motion.h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          My professional journey and career milestones in the tech industry.
        </p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary-500 to-purple-500"></div>

        <div className="space-y-12">
          {experienceData.map((exp, index) => {
            const isLeft = index % 2 === 0

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row items-center ${
                  isLeft ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-1/2 transform -translate-x-1/2 md:left-1/2 md:-translate-x-1/2 
                              w-4 h-4 rounded-full bg-primary-500 border-4 border-white dark:border-gray-900 
                              z-10"
                ></div>

                {/* Content Card */}
                <div
                  className={`w-full md:w-5/12 ${isLeft ? 'md:pr-12' : 'md:pl-12'} mt-8 md:mt-0`}
                >
                  <div className="card p-6 hover:scale-[1.02] transition-transform duration-300">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <FaBriefcase className="text-primary-500" />
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {exp.position}
                          </h3>
                        </div>
                        <h4 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">
                          {exp.company}
                        </h4>
                      </div>

                      {/* Type badge */}
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          exp.type === 'full-time'
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                            : exp.type === 'contract'
                              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                              : 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
                        }`}
                      >
                        {exp.type.charAt(0).toUpperCase() + exp.type.slice(1)}
                      </span>
                    </div>

                    {/* Meta info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <div className="flex items-center gap-2">
                        <FaCalendar />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <div className="mb-4">
                      <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
                        <FaStar className="text-yellow-500" />
                        Key Achievements:
                      </h5>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="mt-1.5 w-1.5 h-1.5 bg-primary-500 rounded-full flex-shrink-0"></span>
                            <span className="text-gray-600 dark:text-gray-400 text-sm">
                              {achievement}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        Technologies:
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 
                                     text-gray-700 dark:text-gray-300 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Empty spacer for opposite side */}
                <div className="hidden md:block w-5/12"></div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Download Resume CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-16"
      >
        <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-8 card max-w-2xl mx-auto">
          <div className="text-left">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Want to see more details?
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Download my complete resume with detailed work history, education,
              and references.
            </p>
          </div>
          <button
            onClick={() => {
              const link = document.createElement('a')
              link.href = '/resume.pdf'
              link.download = 'alex-johnson-resume.pdf'
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)
            }}
            className="btn-primary whitespace-nowrap"
          >
            Download Full Resume
          </button>
        </div>
      </motion.div>
    </section>
  )
}

export default Experience
