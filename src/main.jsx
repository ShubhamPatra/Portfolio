import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import App from './App.jsx';
import { printConsoleGreeting } from './utils/consoleGreeting.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
);

// Console easter egg
printConsoleGreeting();

// Dispatch render-complete event for prerendering
// This signals to vite-plugin-prerender that the app has finished rendering
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    // Use setTimeout to ensure all React effects have completed
    setTimeout(() => {
      document.dispatchEvent(new Event('render-complete'));
    }, 0);
  });
}
