/**
 * Portfolio SEO Metadata Configuration
 * 
 * This file contains all metadata for SEO optimization including:
 * - Site title and description
 * - Canonical URL
 * - Open Graph image
 * 
 * Requirements: 4.5
 * 
 * Note: Description is kept under 160 characters for optimal SEO
 */

export const siteMetadata = {
  // Site title - appears in browser tab and search results
  title: "Shubham Patra - Full Stack Developer | Web Development Portfolio",
  
  // Meta description - must be 160 characters or less for SEO
  // Current length: 158 characters
  description: "Full-stack developer specializing in scalable web applications. Experienced in React, Node.js, and modern web technologies. View my projects and experience.",
  
  // Canonical URL - the primary domain for this portfolio
  canonicalUrl: "https://shubhampatra.dev",
  
  // Open Graph image - used for social media sharing
  // Using the largest favicon as a fallback until a dedicated OG image is created
  ogImage: "https://shubhampatra.dev/favicon-512x512.png",
  
  // Additional metadata for future use
  author: "Shubham Patra",
  keywords: [
    "full stack developer",
    "web developer",
    "React developer",
    "Node.js developer",
    "portfolio",
    "software engineer",
    "JavaScript developer"
  ],
  
  // Social media handles (for future Twitter Card enhancements)
  social: {
    twitter: "@shubhampatra", // Update with actual handle if available
    github: "https://github.com/shubhampatra", // Update with actual profile
    linkedin: "https://www.linkedin.com/in/patrashubham/" // Update with actual profile
  }
};

export default siteMetadata;
