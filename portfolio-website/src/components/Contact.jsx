import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCheck,
  FaExclamationTriangle,
  FaPaperPlane,
} from 'react-icons/fa'
import { validateEmail, validatePhone } from '../utils/validators'

const Contact = () => {
  const formRef = useRef()
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const contactInfo = [
    {
      icon: FaPhone,
      title: 'Call Me',
      value: '+1 (123) 456-7890',
      action: 'tel:+11234567890',
      description: 'Available Mon-Fri, 9AM-6PM EST',
    },
    {
      icon: FaEnvelope,
      title: 'Email Me',
      value: 'hello@example.com',
      action: 'mailto:hello@example.com',
      description: 'Response within 24 hours',
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Location',
      value: 'San Francisco, CA',
      action: 'https://maps.google.com/?q=San+Francisco+CA',
      description: 'Open to remote work worldwide',
    },
  ]

  const validateForm = () => {
    const newErrors = {}

    if (!formState.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formState.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formState.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (formState.phone && !validatePhone(formState.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (!formState.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formState.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Initialize EmailJS with your public key
      emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)

      const templateParams = {
        from_name: formState.name,
        from_email: formState.email,
        from_phone: formState.phone || 'Not provided',
        subject: formState.subject || 'Portfolio Contact',
        message: formState.message,
        timestamp: new Date().toISOString(),
      }

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams
      )

      setSubmitStatus('success')
      setFormState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      })

      setTimeout(() => setSubmitStatus(null), 5000)
    } catch (error) {
      console.error('Email send error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Get In <span className="text-gradient">Touch</span>
        </motion.h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Have a project in mind? Let's discuss how we can work together to
          bring your ideas to life.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-1 space-y-6"
        >
          {contactInfo.map((info, index) => (
            <motion.a
              key={info.title}
              href={info.action}
              target={info.action.startsWith('http') ? '_blank' : '_self'}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card p-6 block hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400">
                  <info.icon size={20} />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-lg mb-1">{info.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-1">
                    {info.value}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {info.description}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2"
        >
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="card p-8 space-y-6"
            noValidate
          >
            {/* Status Messages */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
              >
                <div className="flex items-center gap-3">
                  <FaCheck className="text-green-600 dark:text-green-400" />
                  <div>
                    <p className="font-medium text-green-800 dark:text-green-300">
                      Message sent successfully!
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                      I'll get back to you within 24 hours.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
              >
                <div className="flex items-center gap-3">
                  <FaExclamationTriangle className="text-red-600 dark:text-red-400" />
                  <div>
                    <p className="font-medium text-red-800 dark:text-red-300">
                      Something went wrong!
                    </p>
                    <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                      Please try again or email me directly.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.name
                      ? 'border-red-300 dark:border-red-700'
                      : 'border-gray-300 dark:border-gray-700'
                  } bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p
                    id="name-error"
                    className="mt-2 text-sm text-red-600 dark:text-red-400"
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email
                      ? 'border-red-300 dark:border-red-700'
                      : 'border-gray-300 dark:border-gray-700'
                  } bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p
                    id="email-error"
                    className="mt-2 text-sm text-red-600 dark:text-red-400"
                  >
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formState.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.phone
                      ? 'border-red-300 dark:border-red-700'
                      : 'border-gray-300 dark:border-gray-700'
                  } bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                  placeholder="+1 (123) 456-7890"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                />
                {errors.phone && (
                  <p
                    id="phone-error"
                    className="mt-2 text-sm text-red-600 dark:text-red-400"
                  >
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Project inquiry, job opportunity, etc."
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2"
              >
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                rows="6"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.message
                    ? 'border-red-300 dark:border-red-700'
                    : 'border-gray-300 dark:border-gray-700'
                } bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none`}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
                placeholder="Tell me about your project, timeline, and budget..."
              />
              {errors.message && (
                <p
                  id="message-error"
                  className="mt-2 text-sm text-red-600 dark:text-red-400"
                >
                  {errors.message}
                </p>
              )}
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-right">
                {formState.message.length} characters
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full md:w-auto min-w-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <FaPaperPlane />
                    Send Message
                  </span>
                )}
              </button>
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                * Required fields. By submitting, you agree to our privacy
                policy.
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
