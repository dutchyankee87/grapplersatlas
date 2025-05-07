import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envPath = join(__dirname, '../../../.env');
console.log('Full .env contents:');
console.log(readFileSync(envPath, 'utf8'));

dotenv.config({ path: envPath });
console.log('\nEnvironment variables after loading:');
Object.keys(process.env).forEach(key => {
  if (key.includes('SUPABASE') || key.includes('SERP')) {
    console.log(`${key}: ${key.includes('KEY') ? '[HIDDEN]' : process.env[key]}`);
  }
}); 