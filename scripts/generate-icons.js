
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');

async function generateIcons() {
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });

    try {
        const page = await browser.newPage();
        const svgContent = fs.readFileSync(path.join(publicDir, 'favicon-maskable.svg'), 'utf8');

        // Function to capture icon string
        const capture = async (size, filename) => {
            console.log(`Generating ${size}x${size} icon: ${filename}...`);
            await page.setViewport({ width: size, height: size });

            // Inject SVG, ensuring it scales to viewport
            // We modify the width/height attributes to 100% or remove them to let viewBox handle it
            // The original has width="512" height="512". 
            // We can replace them or wrapping it in a container.
            // Easiest is to serve a data URI image or just raw HTML with adjusted style.

            await page.setContent(`
        <html>
          <body style="margin: 0; padding: 0; overflow: hidden; background: transparent;">
            ${svgContent.replace('width="512"', 'width="100%"').replace('height="512"', 'height="100%"')}
          </body>
        </html>
      `);

            const outputPath = path.join(publicDir, filename);
            await page.screenshot({ path: outputPath, omitBackground: true }); // PNG by default
            console.log(`Saved to ${outputPath}`);
        };

        await capture(192, 'favicon-maskable-192x192.png');
        await capture(512, 'favicon-maskable-512x512.png');

    } catch (err) {
        console.error('Error generating icons:', err);
        process.exit(1);
    } finally {
        await browser.close();
    }
}

generateIcons();
