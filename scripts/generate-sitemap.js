/**
 * Sitemap Generation Script
 * 
 * This script generates a sitemap.xml file for the portfolio website.
 * It includes entries for the main page and all section anchors with
 * proper lastmod, changefreq, and priority values.
 * 
 * Requirements: 5.1, 5.2, 5.3, 5.4
 * 
 * Usage: 
 *   - Standalone: node scripts/generate-sitemap.js
 *   - As part of build: npm run build (automatically runs this script)
 * 
 * Output: public/sitemap.xml (copied to dist/ during build)
 * 
 * Configuration:
 *   - Base URL: Update config.baseUrl to match your domain
 *   - Entries: Modify config.entries to add/remove pages or sections
 *   - Metadata: Adjust lastmod, changefreq, and priority as needed
 * 
 * Sitemap Protocol: http://www.sitemaps.org/protocol.html
 */

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Configuration for sitemap generation
 */
const config = {
  // Base URL for the portfolio website
  baseUrl: 'https://shubhampatra.dev',
  
  // Sitemap entries with metadata
  entries: [
    {
      url: '/',
      lastmod: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
      changefreq: 'monthly',
      priority: 1.0
    },
    {
      url: '/#about',
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      url: '/#experience',
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      url: '/#skills',
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      url: '/#projects',
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      url: '/#contact',
      changefreq: 'monthly',
      priority: 0.7
    }
  ]
};

/**
 * Generates a sitemap entry XML string
 * @param {Object} entry - Sitemap entry configuration
 * @param {string} entry.url - URL path (relative to baseUrl)
 * @param {string} [entry.lastmod] - Last modification date (ISO format)
 * @param {string} [entry.changefreq] - Change frequency
 * @param {number} [entry.priority] - Priority (0.0 to 1.0)
 * @param {string} baseUrl - Base URL for the website
 * @returns {string} XML string for the sitemap entry
 */
function generateSitemapEntry(entry, baseUrl) {
  const { url, lastmod, changefreq, priority } = entry;
  const fullUrl = `${baseUrl}${url}`;
  
  let xml = '  <url>\n';
  xml += `    <loc>${fullUrl}</loc>\n`;
  
  if (lastmod) {
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
  }
  
  if (changefreq) {
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
  }
  
  if (priority !== undefined) {
    xml += `    <priority>${priority.toFixed(1)}</priority>\n`;
  }
  
  xml += '  </url>';
  
  return xml;
}

/**
 * Generates the complete sitemap XML
 * @param {Object} config - Sitemap configuration
 * @param {string} config.baseUrl - Base URL for the website
 * @param {Array} config.entries - Array of sitemap entries
 * @returns {string} Complete sitemap XML string
 */
function generateSitemap(config) {
  const { baseUrl, entries } = config;
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  entries.forEach((entry, index) => {
    xml += generateSitemapEntry(entry, baseUrl);
    if (index < entries.length - 1) {
      xml += '\n';
    }
  });
  
  xml += '\n</urlset>\n';
  
  return xml;
}

/**
 * Main function to generate and write sitemap.xml
 */
function main() {
  console.log('Generating sitemap.xml...');
  
  try {
    // Generate the sitemap XML
    const sitemapXml = generateSitemap(config);
    
    // Determine output path (public directory for static files)
    const outputPath = join(__dirname, '..', 'public', 'sitemap.xml');
    
    // Write the sitemap to file
    writeFileSync(outputPath, sitemapXml, 'utf-8');
    
    console.log('✓ Sitemap generated successfully!');
    console.log(`  Output: ${outputPath}`);
    console.log(`  Entries: ${config.entries.length}`);
    console.log(`  Base URL: ${config.baseUrl}`);
  } catch (error) {
    console.error('✗ Error generating sitemap:', error);
    process.exit(1);
  }
}

// Run the script
main();
