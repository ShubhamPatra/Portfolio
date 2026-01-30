import './index.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
