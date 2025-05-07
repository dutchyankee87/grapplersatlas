import { Buffer } from 'buffer';

// Polyfill Buffer and process
if (typeof window !== 'undefined') {
  // Buffer polyfill
  window.Buffer = Buffer;
  window.global = window;

  // Process polyfill
  window.process = {
    env: {},
    cwd: () => '/',
    platform: 'browser',
    nextTick: (cb: Function) => setTimeout(cb, 0),
    version: '',
    versions: {},
    browser: true,
    argv: [],
    stdout: { write: () => {} },
    stderr: { write: () => {} },
    stdin: { read: () => {} },
  };
}

// Export the polyfilled Buffer
export { Buffer }; 