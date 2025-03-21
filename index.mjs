#!/usr/bin/env node

import Color from 'colorjs.io'

// Regular expressions for matching different color formats
const colorRegex = /(#(([0-9A-Fa-f]{3,8})\b)|(rgba?\([^)]+\)))/g;

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

export const transform = (cssContent) => {
  const transformed = cssContent.replace(colorRegex, (match) => {
    const { converted, rgba, hex } = convertToOklch(match);
    return `${converted} /* rgba: ${rgba}, hex: ${hex} */`;
  });

  return transformed;
}
