import './index.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SEOHead from './components/SEOHead';
import ZineDivider from './components/ZineDivider';
import CropMarks from './components/CropMarks';
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

      {/* Print Crop Marks */}
      <CropMarks />

      {/* Scanline Overlay */}
      <div className="scanline-overlay"></div>

      <Header />

      <main id="main-content" className="max-w-7xl mx-auto px-4 pt-32 pb-20 overflow-hidden">
        <Hero />
        <ZineDivider variant="glitch" />
        <About />
        <ZineDivider variant="redacted" />
        <Experience />
        <ZineDivider variant="torn" />
        <Projects />
        <ZineDivider variant="dashed" />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
