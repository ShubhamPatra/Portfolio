import puppeteer from 'puppeteer';
import { writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import { createReadStream } from 'fs';
import { lookup } from 'mime-types';
import process from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Simple static file server
function startServer(distPath, port = 3000) {
  const server = createServer((req, res) => {
    let filePath = join(distPath, req.url === '/' ? 'index.html' : req.url);
    
    if (!existsSync(filePath)) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    
    const mimeType = lookup(filePath) || 'text/html';
    res.writeHead(200, { 'Content-Type': mimeType });
    createReadStream(filePath).pipe(res);
  });
  
  return new Promise((resolve) => {
    server.listen(port, () => {
      console.log(`Server started on http://localhost:${port}`);
      resolve({ server, port });
    });
  });
}

async function prerender() {
  console.log('Starting prerendering...');
  
  const distPath = join(__dirname, '..', 'dist');
  const indexPath = join(distPath, 'index.html');
  
  // Start a local server to serve the built files
  const { server, port } = await startServer(distPath);
  
  // Launch headless browser
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Navigate to the local server
    await page.goto(`http://localhost:${port}`, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    
    // Wait for the render-complete event or a timeout
    await Promise.race([
      page.evaluate(() => {
        return new Promise((resolve) => {
          document.addEventListener('render-complete', resolve);
        });
      }),
      new Promise(resolve => setTimeout(resolve, 3000))
    ]);
    
    // Give React a moment to finish any pending updates
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Get the fully rendered HTML
    const renderedHtml = await page.content();
    
    // Write the prerendered HTML back to index.html
    writeFileSync(indexPath, renderedHtml, 'utf-8');
    
    console.log('✓ Prerendering complete! Static HTML generated at:', indexPath);
  } catch (error) {
    console.error('Error during prerendering:', error);
    process.exit(1);
  } finally {
    await browser.close();
    server.close();
  }
}

prerender();
