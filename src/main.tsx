import { Buffer } from 'buffer';
import process from 'process';

// Polyfill Buffer and process
if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
  window.process = process;
  window.global = window;
}

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Error boundary for development
if (import.meta.env.DEV) {
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
  });
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);

try {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} catch (error) {
  console.error('Error rendering app:', error);
}