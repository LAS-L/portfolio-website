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