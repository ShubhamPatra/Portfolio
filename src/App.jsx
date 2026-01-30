import './index.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SpiderWeb from './components/SpiderWeb';

function App() {
  return (
    <div className="relative">
      {/* Spider Web Decorations */}
      <SpiderWeb position="top-left" size="lg" className="fixed text-zine-ink z-50" />
      <SpiderWeb position="top-right" size="md" className="fixed text-zine-red z-50" />
      <SpiderWeb position="bottom-left" size="sm" className="fixed text-zine-blue z-50" />
      <SpiderWeb position="bottom-right" size="md" className="fixed text-zine-ink z-50" />

      {/* Scanline Overlay */}
      <div className="scanline-overlay"></div>

      <Header />

      <main className="max-w-7xl mx-auto px-4 pt-32 pb-20 overflow-hidden">
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
