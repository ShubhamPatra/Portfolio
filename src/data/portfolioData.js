/**
 * Portfolio Data Configuration
 * 
 * This module provides a unified configuration for all portfolio data,
 * combining personal information, projects, and contact details.
 * This data is used to generate structured data (Schema.org) for SEO.
 * 
 * Requirements: 3.1, 3.2, 3.3
 */

import { personal } from './personal.js';
import { projects } from './projects.js';
import { contact } from './contact.js';

/**
 * Complete portfolio data configuration
 * 
 * This object combines all portfolio data in a format compatible with
 * the structured data generators (generateAllStructuredData).
 * 
 * @type {Object}
 * @property {Object} personal - Personal information (name, title, bio)
 * @property {Array} projects - Array of project objects
 * @property {Object} contact - Contact information and social links
 * @property {string} siteUrl - Base URL of the portfolio site
 */
export const portfolioData = {
  // Personal information for Person schema
  personal: {
    name: personal.name,
    tagline: personal.tagline,
    subtitle: personal.subtitle,
    bio: personal.about,
    availableForWork: personal.availableForWork
  },

  // Projects for CreativeWork schemas
  projects: projects.map(project => ({
    name: project.name,
    description: project.description,
    technologies: project.stack,
    githubUrl: project.githubUrl,
    liveUrl: project.liveUrl,
    // Image can be added in the future if project screenshots are available
    image: project.image || null
  })),

  // Contact information for ContactPoint schema
  contact: {
    email: contact.email,
    socialLinks: contact.socialLinks,
    resumeUrl: contact.resumeUrl
  },

  // Site URL - should be updated for production deployment
  siteUrl: 'https://www.shubhampatra.dev'
};

/**
 * Get portfolio data for structured data generation
 * 
 * This is a convenience function that returns the portfolio data
 * in the exact format expected by generateAllStructuredData().
 * 
 * @returns {Object} Portfolio data object
 */
export function getPortfolioData() {
  return portfolioData;
}
