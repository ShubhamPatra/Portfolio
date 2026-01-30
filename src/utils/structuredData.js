/**
 * Structured Data Generator Utilities
 * 
 * This module provides functions to generate Schema.org compliant structured data
 * in JSON-LD format for SEO optimization. The structured data helps search engines
 * understand the content and display rich snippets in search results.
 * 
 * Requirements: 3.1, 3.2, 3.3
 * 
 * @see https://schema.org/
 */

/**
 * Generates a Person schema for the portfolio owner
 * 
 * @param {Object} data - Personal information
 * @param {string} data.name - Full name of the person
 * @param {string} [data.jobTitle] - Job title or professional role
 * @param {string} [data.url] - Personal website URL
 * @param {string[]} [data.socialLinks] - Array of social media profile URLs
 * @param {string} [data.email] - Email address
 * @returns {Object} Person schema in JSON-LD format
 * 
 * Requirements: 3.1
 * 
 * @example
 * const personSchema = generatePersonSchema({
 *   name: "John Doe",
 *   jobTitle: "Full Stack Developer",
 *   url: "https://johndoe.com",
 *   socialLinks: ["https://github.com/johndoe", "https://linkedin.com/in/johndoe"],
 *   email: "john@example.com"
 * });
 */
export function generatePersonSchema(data) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: data.name
  };

  // Add optional fields only if they exist
  if (data.jobTitle) {
    schema.jobTitle = data.jobTitle;
  }

  if (data.url) {
    schema.url = data.url;
  }

  if (data.socialLinks && data.socialLinks.length > 0) {
    schema.sameAs = data.socialLinks;
  }

  if (data.email) {
    schema.email = data.email;
  }

  return schema;
}

/**
 * Generates a CreativeWork schema for a project
 * 
 * @param {Object} project - Project information
 * @param {string} project.name - Project name
 * @param {string} project.description - Project description
 * @param {Object} project.author - Person schema for the project author
 * @param {string} [project.url] - Project URL (live demo or website)
 * @param {string} [project.image] - Project image URL
 * @param {string} [project.dateCreated] - ISO 8601 date string
 * @returns {Object} CreativeWork schema in JSON-LD format
 * 
 * Requirements: 3.2
 * 
 * @example
 * const projectSchema = generateProjectSchema({
 *   name: "My Awesome App",
 *   description: "A web application that does amazing things",
 *   author: personSchema,
 *   url: "https://myapp.com",
 *   image: "https://myapp.com/screenshot.png"
 * });
 */
export function generateProjectSchema(project) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    description: project.description,
    author: project.author
  };

  // Add optional fields only if they exist
  if (project.url) {
    schema.url = project.url;
  }

  if (project.image) {
    schema.image = project.image;
  }

  if (project.dateCreated) {
    schema.dateCreated = project.dateCreated;
  }

  return schema;
}

/**
 * Generates a ContactPoint schema for contact information
 * 
 * @param {Object} data - Contact information
 * @param {string} data.contactType - Type of contact (e.g., "customer service", "technical support", "personal")
 * @param {string} [data.email] - Email address
 * @param {string} [data.telephone] - Phone number
 * @param {string} [data.url] - Contact page URL
 * @returns {Object} ContactPoint schema in JSON-LD format
 * 
 * Requirements: 3.3
 * 
 * @example
 * const contactSchema = generateContactPointSchema({
 *   contactType: "personal",
 *   email: "john@example.com",
 *   url: "https://johndoe.com/#contact"
 * });
 */
export function generateContactPointSchema(data) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPoint',
    contactType: data.contactType
  };

  // Add optional fields only if they exist
  if (data.email) {
    schema.email = data.email;
  }

  if (data.telephone) {
    schema.telephone = data.telephone;
  }

  if (data.url) {
    schema.url = data.url;
  }

  return schema;
}

/**
 * Generates all structured data for the portfolio
 * 
 * This is a convenience function that generates Person, Projects, and ContactPoint
 * schemas all at once, ensuring proper relationships between entities.
 * 
 * @param {Object} portfolioData - Complete portfolio data
 * @param {Object} portfolioData.personal - Personal information
 * @param {Array} portfolioData.projects - Array of project objects
 * @param {Object} portfolioData.contact - Contact information
 * @param {string} portfolioData.siteUrl - Base URL of the portfolio site
 * @returns {Object} Object containing all structured data schemas
 * 
 * Requirements: 3.1, 3.2, 3.3, 3.5
 * 
 * @example
 * const allSchemas = generateAllStructuredData({
 *   personal: { name: "John Doe", ... },
 *   projects: [{ name: "Project 1", ... }],
 *   contact: { email: "john@example.com", ... },
 *   siteUrl: "https://johndoe.com"
 * });
 */
export function generateAllStructuredData(portfolioData) {
  const { personal, projects, contact, siteUrl } = portfolioData;

  // Generate Person schema first (will be referenced by projects)
  const personSchema = generatePersonSchema({
    name: personal.name,
    jobTitle: personal.tagline || personal.subtitle,
    url: siteUrl,
    socialLinks: contact.socialLinks?.map(link => link.url) || [],
    email: contact.email
  });

  // Generate project schemas with person as author
  const projectSchemas = projects.map(project => 
    generateProjectSchema({
      name: project.name,
      description: project.description,
      author: personSchema,
      url: project.liveUrl || project.githubUrl,
      // Projects could have images in the future
      image: project.image
    })
  );

  // Generate contact point schema
  const contactPointSchema = generateContactPointSchema({
    contactType: 'personal',
    email: contact.email,
    url: `${siteUrl}/#contact`
  });

  return {
    person: personSchema,
    projects: projectSchemas,
    contact: contactPointSchema
  };
}
