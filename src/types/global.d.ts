import { Buffer } from 'buffer';
import process from 'process';

declare global {
  interface Window {
    Buffer: typeof Buffer;
    process: typeof process;
    global: Window;
  }
} 