import './index.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SpiderWeb from './components/SpiderWeb';
import SEOHead from './components/SEOHead';
import { siteMetadata } from './data/metadata';
import { getPortfolioData } from './data/portfolioData';
import { generateAllStructuredData } from './utils/structuredData';

function App() {
  // Generate structured data for SEO
  const portfolioData = getPortfolioData();
  const structuredData = generateAllStructuredData(portfolioData);

  return (
    <div className="relative">
      {/* SEO Meta Tags */}
      <SEOHead
        title={siteMetadata.title}
        description={siteMetadata.description}
        canonicalUrl={siteMetadata.canonicalUrl}
        ogImage={siteMetadata.ogImage}
        structuredData={structuredData}
      />

      {/* Spider Web Decorations */}
      <SpiderWeb position="top-left" size="lg" className="fixed text-zine-ink z-50" />
      <SpiderWeb position="top-right" size="md" className="fixed text-zine-red z-50" />
      <SpiderWeb position="bottom-left" size="sm" className="fixed text-zine-blue z-50" />
      <SpiderWeb position="bottom-right" size="md" className="fixed text-zine-ink z-50" />

      {/* Scanline Overlay */}
      <div className="scanline-overlay"></div>

      <Header />

      <main id="main-content" className="max-w-7xl mx-auto px-4 pt-32 pb-20 overflow-hidden">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
