#!/usr/bin/env node
import { transform } from './index.mjs'

import readline from 'readline'

// Handle errors and run
async function main() {
  try {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    });

    let cssContent = '';

    // Read input line by line
    for await (const line of rl) {
      cssContent += line + '\n';
    }

    // Process hex colors
    const transformed = transform(cssContent);

    // Output the transformed CSS
    process.stdout.write(transformed);
  } catch (error) {
    console.error('Error processing CSS:', error);
    process.exit(1);
  }
}

main();
