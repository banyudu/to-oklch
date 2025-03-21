#!/usr/bin/env node

const Color = require('colorjs.io').default;
const readline = require('readline');

// Regular expressions for matching different color formats
const hexRegex = /#([0-9A-Fa-f]{3,8})\b/g;
const rgbRegex = /rgba?\([^)]+\)/g;

// Function to convert color to OKLCH and get multiple formats
function convertToOklch(colorStr) {
  try {
    const color = new Color(colorStr);
    const [l, c, h] = color.oklch;
    // Get RGB values as numbers 0-255
    const [r, g, b] = color.srgb.map(x => Math.round(x * 255));
    const alpha = color.alpha !== undefined ? color.alpha : 1;

    // Format RGBA string manually
    const rgba = alpha === 1
      ? `rgb(${r}, ${g}, ${b})`
      : `rgba(${r}, ${g}, ${b}, ${alpha})`;
    const hex = color.to('srgb').toString({ format: 'hex' });

    return {
      original: colorStr,
      converted: `oklch(${Math.round((l || 0) * 1000) / 1000} ${Math.round((c || 0) * 1000) / 1000} ${Math.round((h || 0) * 1000) / 1000})`,
      rgba: rgba,
      hex: hex
    };
  } catch (e) {
    return {
      original: colorStr,
      converted: colorStr,
      rgba: colorStr,
      hex: colorStr
    };
  }
}

// Process the CSS input
async function processCSS() {
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
  const transformed = cssContent.replace(hexRegex, (match) => {
    const { converted, rgba, hex } = convertToOklch(match);
    return `${converted} /* rgba: ${rgba}, hex: ${hex} */`;
  });

  // Output the transformed CSS
  process.stdout.write(transformed);
}

// Handle errors and run
async function main() {
  try {
    await processCSS();
  } catch (error) {
    console.error('Error processing CSS:', error);
    process.exit(1);
  }
}

main();