/**
 * Crawlability Validation Script
 * 
 * This script validates that crawlers can access all content without executing JavaScript.
 * It fetches the HTML as a crawler would (without JS execution) and verifies that all
 * necessary sections and content are present in the prerendered HTML.
 * 
 * Requirements: 12.1, 12.4
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { JSDOM } from 'jsdom';

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  bold: '\x1b[1m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function validateCrawlability() {
  log('\n' + '='.repeat(70), 'bold');
  log('CRAWLABILITY VALIDATION SCRIPT', 'bold');
  log('Simulating crawler access without JavaScript execution', 'cyan');
  log('='.repeat(70) + '\n', 'bold');
  
  const distPath = join(process.cwd(), 'dist', 'index.html');
  let html;
  
  // Step 1: Fetch HTML without JavaScript (simulating crawler behavior)
  log('Step 1: Fetching HTML without JavaScript execution...', 'blue');
  try {
    html = readFileSync(distPath, 'utf-8');
    log('✓ Successfully fetched dist/index.html', 'green');
    log(`  File size: ${(html.length / 1024).toFixed(2)} KB`, 'cyan');
  } catch (error) {
    log('✗ Failed to fetch dist/index.html', 'red');
    log(`  Error: ${error.message}`, 'red');
    log('\n  Make sure to run "npm run build" first!', 'yellow');
    process.exit(1);
  }

  // Parse HTML with JSDOM (without executing JavaScript)
  const dom = new JSDOM(html, {
    runScripts: 'outside-only', // Don't execute any scripts
    resources: 'usable'
  });
  
  const document = dom.window.document;
  
  let passed = 0;
  let failed = 0;
  let warnings = 0;

  // Step 2: Verify all sections are present in raw HTML
  log('\nStep 2: Verifying all sections present in raw HTML...', 'blue');
  
  const requiredSections = [
    { id: 'hero', name: 'Hero', minChars: 50 },
    { id: 'about', name: 'About', minChars: 100 },
    { id: 'experience', name: 'Experience', minChars: 100 },
    { id: 'projects', name: 'Projects', minChars: 100 },
    { id: 'contact', name: 'Contact', minChars: 50 }
  ];

  requiredSections.forEach(({ id, name, minChars }) => {
    const section = document.querySelector(`#${id}`);
    
    if (section) {
      const textContent = section.textContent.trim();
      const charCount = textContent.length;
      
      if (charCount >= minChars) {
        log(`  ✓ ${name} section found with ${charCount} characters`, 'green');
        passed++;
      } else {
        log(`  ✗ ${name} section found but has insufficient content (${charCount} < ${minChars} chars)`, 'red');
        failed++;
      }
    } else {
      log(`  ✗ ${name} section not found (id="${id}")`, 'red');
      failed++;
    }
  });

  // Step 3: Check for Projects content specifically (Requirement 12.1)
  log('\nStep 3: Checking for Projects content (Requirement 12.1)...', 'blue');
  
  const projectsSection = document.querySelector('#projects');
  
  if (projectsSection) {
    const projectsText = projectsSection.textContent.trim();
    
    // Check for project articles
    const projectArticles = projectsSection.querySelectorAll('article');
    const projectHeadings = projectsSection.querySelectorAll('h3');
    
    if (projectArticles.length > 0) {
      log(`  ✓ Found ${projectArticles.length} project article(s)`, 'green');
      passed++;
      
      // Verify each project has content
      let projectsWithContent = 0;
      projectArticles.forEach((article, index) => {
        const articleText = article.textContent.trim();
        const projectTitle = article.querySelector('h3');
        
        if (articleText.length > 50) {
          projectsWithContent++;
          if (projectTitle) {
            log(`    ✓ Project ${index + 1}: "${projectTitle.textContent.trim()}" (${articleText.length} chars)`, 'green');
          } else {
            log(`    ✓ Project ${index + 1}: Has content (${articleText.length} chars)`, 'green');
          }
        } else {
          log(`    ✗ Project ${index + 1}: Insufficient content (${articleText.length} chars)`, 'red');
          failed++;
        }
      });
      
      if (projectsWithContent === projectArticles.length) {
        log(`  ✓ All ${projectsWithContent} projects have substantial content`, 'green');
        passed++;
      } else {
        log(`  ⚠ Only ${projectsWithContent}/${projectArticles.length} projects have substantial content`, 'yellow');
        warnings++;
      }
    } else if (projectHeadings.length > 0) {
      log(`  ✓ Found ${projectHeadings.length} project heading(s)`, 'green');
      passed++;
    } else {
      log('  ✗ No project entries found (no articles or h3 headings)', 'red');
      failed++;
    }
    
    // Check for project descriptions
    if (projectsText.length > 200) {
      log(`  ✓ Projects section has substantial text content (${projectsText.length} chars)`, 'green');
      passed++;
    } else {
      log(`  ✗ Projects section has minimal text content (${projectsText.length} chars)`, 'red');
      failed++;
    }
    
    // Check for project links
    const projectLinks = projectsSection.querySelectorAll('a[href]');
    if (projectLinks.length > 0) {
      log(`  ✓ Found ${projectLinks.length} project link(s)`, 'green');
      passed++;
    } else {
      log('  ⚠ No project links found', 'yellow');
      warnings++;
    }
  } else {
    log('  ✗ Projects section not found', 'red');
    failed++;
  }

  // Step 4: Check for Contact content specifically (Requirement 12.1)
  log('\nStep 4: Checking for Contact content (Requirement 12.1)...', 'blue');
  
  const contactSection = document.querySelector('#contact');
  
  if (contactSection) {
    const contactText = contactSection.textContent.trim();
    
    // Check for contact form
    const contactForm = contactSection.querySelector('form');
    
    if (contactForm) {
      log('  ✓ Contact form found', 'green');
      passed++;
      
      // Check for form inputs
      const inputs = contactForm.querySelectorAll('input, textarea');
      if (inputs.length > 0) {
        log(`  ✓ Form has ${inputs.length} input field(s)`, 'green');
        passed++;
        
        // Check each input has a name attribute
        let inputsWithNames = 0;
        inputs.forEach(input => {
          if (input.getAttribute('name')) {
            inputsWithNames++;
          }
        });
        
        if (inputsWithNames === inputs.length) {
          log(`  ✓ All ${inputsWithNames} inputs have name attributes`, 'green');
          passed++;
        } else {
          log(`  ⚠ Only ${inputsWithNames}/${inputs.length} inputs have name attributes`, 'yellow');
          warnings++;
        }
        
        // Check for labels
        const labels = contactForm.querySelectorAll('label');
        if (labels.length > 0) {
          log(`  ✓ Form has ${labels.length} label(s)`, 'green');
          passed++;
        } else {
          log('  ⚠ Form missing labels', 'yellow');
          warnings++;
        }
        
        // Check for submit button
        const submitButton = contactForm.querySelector('button[type="submit"], input[type="submit"]');
        if (submitButton) {
          log('  ✓ Form has submit button', 'green');
          passed++;
        } else {
          log('  ⚠ Form missing submit button', 'yellow');
          warnings++;
        }
      } else {
        log('  ✗ Form has no input fields', 'red');
        failed++;
      }
    } else {
      log('  ✗ Contact form not found', 'red');
      failed++;
    }
    
    // Check for contact text content
    if (contactText.length > 50) {
      log(`  ✓ Contact section has text content (${contactText.length} chars)`, 'green');
      passed++;
    } else {
      log(`  ✗ Contact section has minimal text content (${contactText.length} chars)`, 'red');
      failed++;
    }
    
    // Check for contact information (email, social links, etc.)
    const contactLinks = contactSection.querySelectorAll('a[href]');
    if (contactLinks.length > 0) {
      log(`  ✓ Found ${contactLinks.length} contact link(s)`, 'green');
      passed++;
    } else {
      log('  ⚠ No contact links found', 'yellow');
      warnings++;
    }
  } else {
    log('  ✗ Contact section not found', 'red');
    failed++;
  }

  // Step 5: Verify semantic HTML structure
  log('\nStep 5: Verifying semantic HTML structure...', 'blue');
  
  const semanticElements = [
    { selector: 'header', name: 'header' },
    { selector: 'nav', name: 'nav' },
    { selector: 'main', name: 'main' },
    { selector: 'section', name: 'section' },
    { selector: 'footer', name: 'footer' }
  ];

  semanticElements.forEach(({ selector, name }) => {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      log(`  ✓ Found ${elements.length} ${name} element(s)`, 'green');
      passed++;
    } else {
      log(`  ✗ No ${name} elements found`, 'red');
      failed++;
    }
  });

  // Step 6: Check for proper heading hierarchy
  log('\nStep 6: Checking heading hierarchy...', 'blue');
  
  const h1s = document.querySelectorAll('h1');
  const h2s = document.querySelectorAll('h2');
  const h3s = document.querySelectorAll('h3');
  
  if (h1s.length === 1) {
    log(`  ✓ Found exactly one h1 element: "${h1s[0].textContent.trim()}"`, 'green');
    passed++;
  } else if (h1s.length === 0) {
    log('  ✗ No h1 element found', 'red');
    failed++;
  } else {
    log(`  ⚠ Found ${h1s.length} h1 elements (should be exactly 1)`, 'yellow');
    warnings++;
  }
  
  if (h2s.length > 0) {
    log(`  ✓ Found ${h2s.length} h2 element(s)`, 'green');
    passed++;
  } else {
    log('  ✗ No h2 elements found', 'red');
    failed++;
  }
  
  if (h3s.length > 0) {
    log(`  ✓ Found ${h3s.length} h3 element(s)`, 'green');
    passed++;
  } else {
    log('  ⚠ No h3 elements found', 'yellow');
    warnings++;
  }

  // Step 7: Check for meta tags and structured data
  log('\nStep 7: Checking meta tags and structured data...', 'blue');
  
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription && metaDescription.getAttribute('content')) {
    log('  ✓ Meta description found', 'green');
    passed++;
  } else {
    log('  ✗ Meta description missing', 'red');
    failed++;
  }
  
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle && ogTitle.getAttribute('content')) {
    log('  ✓ Open Graph title found', 'green');
    passed++;
  } else {
    log('  ✗ Open Graph title missing', 'red');
    failed++;
  }
  
  const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
  if (jsonLdScripts.length > 0) {
    log(`  ✓ Found ${jsonLdScripts.length} JSON-LD structured data script(s)`, 'green');
    passed++;
    
    // Validate JSON-LD content
    let validSchemas = 0;
    jsonLdScripts.forEach((script, index) => {
      try {
        const schema = JSON.parse(script.textContent);
        if (schema['@context'] && schema['@type']) {
          validSchemas++;
          log(`    ✓ Schema ${index + 1}: Valid ${schema['@type']} schema`, 'green');
        } else {
          log(`    ⚠ Schema ${index + 1}: Missing @context or @type`, 'yellow');
          warnings++;
        }
      } catch (error) {
        log(`    ✗ Schema ${index + 1}: Invalid JSON`, 'red');
        failed++;
      }
    });
    
    if (validSchemas === jsonLdScripts.length) {
      log(`  ✓ All ${validSchemas} schemas are valid`, 'green');
      passed++;
    }
  } else {
    log('  ✗ No JSON-LD structured data found', 'red');
    failed++;
  }

  // Step 8: Check for navigation links
  log('\nStep 8: Checking navigation links...', 'blue');
  
  const nav = document.querySelector('nav');
  if (nav) {
    const navLinks = nav.querySelectorAll('a[href]');
    if (navLinks.length > 0) {
      log(`  ✓ Found ${navLinks.length} navigation link(s)`, 'green');
      passed++;
      
      // Verify links have valid hrefs
      let validLinks = 0;
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && (href.startsWith('#') || href.startsWith('http') || href.startsWith('/'))) {
          validLinks++;
        }
      });
      
      if (validLinks === navLinks.length) {
        log(`  ✓ All ${validLinks} navigation links have valid hrefs`, 'green');
        passed++;
      } else {
        log(`  ⚠ Only ${validLinks}/${navLinks.length} links have valid hrefs`, 'yellow');
        warnings++;
      }
    } else {
      log('  ✗ No navigation links found', 'red');
      failed++;
    }
  } else {
    log('  ✗ Navigation element not found', 'red');
    failed++;
  }

  // Step 9: Check for problematic patterns
  log('\nStep 9: Checking for problematic patterns...', 'blue');
  
  const problematicPatterns = [
    { pattern: 'Loading...', name: 'Loading placeholder' },
    { pattern: 'loading...', name: 'Loading placeholder (lowercase)' },
    { pattern: 'Please wait', name: 'Wait message' },
    { pattern: 'Fetching', name: 'Fetching message' },
    { pattern: 'data-src=', name: 'Lazy loading images (data-src)' }
  ];
  
  let foundProblems = false;
  problematicPatterns.forEach(({ pattern, name }) => {
    if (html.includes(pattern)) {
      log(`  ✗ Found ${name}`, 'red');
      foundProblems = true;
      failed++;
    }
  });
  
  if (!foundProblems) {
    log('  ✓ No problematic patterns found', 'green');
    passed++;
  }

  // Step 10: Calculate overall content metrics
  log('\nStep 10: Analyzing overall content metrics...', 'blue');
  
  const bodyText = document.body.textContent.trim();
  const wordCount = bodyText.split(/\s+/).filter(word => word.length > 0).length;
  const charCount = bodyText.length;
  
  log(`  Total characters: ${charCount}`, 'cyan');
  log(`  Total words: ${wordCount}`, 'cyan');
  
  if (wordCount > 200) {
    log('  ✓ Substantial content present (>200 words)', 'green');
    passed++;
  } else if (wordCount > 100) {
    log('  ⚠ Moderate content present (100-200 words)', 'yellow');
    warnings++;
  } else {
    log('  ✗ Minimal content present (<100 words)', 'red');
    failed++;
  }
  
  // Check content distribution
  const sectionsWithContent = requiredSections.filter(({ id }) => {
    const section = document.querySelector(`#${id}`);
    return section && section.textContent.trim().length > 50;
  }).length;
  
  const contentDistribution = (sectionsWithContent / requiredSections.length) * 100;
  log(`  Content distribution: ${sectionsWithContent}/${requiredSections.length} sections (${contentDistribution.toFixed(0)}%)`, 'cyan');
  
  if (contentDistribution === 100) {
    log('  ✓ All sections have content', 'green');
    passed++;
  } else if (contentDistribution >= 80) {
    log('  ⚠ Most sections have content', 'yellow');
    warnings++;
  } else {
    log('  ✗ Many sections lack content', 'red');
    failed++;
  }

  // Final Summary
  log('\n' + '='.repeat(70), 'bold');
  log('CRAWLABILITY VALIDATION SUMMARY', 'bold');
  log('='.repeat(70), 'bold');
  
  const total = passed + failed;
  const successRate = ((passed / total) * 100).toFixed(1);
  
  log(`\nTests Passed:    ${passed}`, 'green');
  log(`Tests Failed:    ${failed}`, 'red');
  log(`Warnings:        ${warnings}`, 'yellow');
  log(`Success Rate:    ${successRate}%`, successRate >= 90 ? 'green' : successRate >= 70 ? 'yellow' : 'red');
  
  log('\n' + '-'.repeat(70), 'cyan');
  log('REQUIREMENT VALIDATION', 'bold');
  log('-'.repeat(70), 'cyan');
  
  // Requirement 12.1: Initial HTML payload contains all text content
  const req121Passed = sectionsWithContent === requiredSections.length;
  log(`\nRequirement 12.1: Initial HTML contains all text content`, 'blue');
  if (req121Passed) {
    log('  ✓ PASSED - All sections present with content', 'green');
  } else {
    log('  ✗ FAILED - Some sections missing or lack content', 'red');
  }
  
  // Requirement 12.4: Content visible in page source
  const req124Passed = !foundProblems && wordCount > 200;
  log(`\nRequirement 12.4: Content visible in page source`, 'blue');
  if (req124Passed) {
    log('  ✓ PASSED - Content is visible without JavaScript', 'green');
  } else {
    log('  ✗ FAILED - Content may require JavaScript', 'red');
  }
  
  log('\n' + '='.repeat(70), 'bold');
  
  // Exit with appropriate code
  if (failed > 0) {
    log('\n✗ CRAWLABILITY VALIDATION FAILED', 'red');
    log('The site may not be fully crawlable by search engines.', 'red');
    log('Please review the failed tests above and fix the issues.', 'yellow');
    process.exit(1);
  } else if (warnings > 0) {
    log('\n⚠ CRAWLABILITY VALIDATION PASSED WITH WARNINGS', 'yellow');
    log('The site is crawlable but some improvements could be made.', 'yellow');
    process.exit(0);
  } else {
    log('\n✓ CRAWLABILITY VALIDATION PASSED', 'green');
    log('The site is fully crawlable by search engines!', 'green');
    log('All content is accessible without JavaScript execution.', 'green');
    process.exit(0);
  }
}

// Run the validation
validateCrawlability();
