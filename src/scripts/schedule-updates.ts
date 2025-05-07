import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

async function runScript(scriptName: string) {
  try {
    const scriptPath = path.join(__dirname, scriptName);
    const { stdout, stderr } = await execAsync(`ts-node ${scriptPath}`);
    
    if (stderr) {
      console.error(`Error running ${scriptName}:`, stderr);
    } else {
      console.log(`Successfully ran ${scriptName}:`, stdout);
    }
  } catch (error) {
    console.error(`Failed to run ${scriptName}:`, error);
  }
}

async function main() {
  // Run validation first
  await runScript('validate-data.ts');
  
  // If validation passes, run the update
  await runScript('update-gyms.ts');
}

// Run immediately
main();

// Schedule to run every week
setInterval(main, 7 * 24 * 60 * 60 * 1000); 