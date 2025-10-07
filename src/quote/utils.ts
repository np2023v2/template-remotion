/**
 * Utility functions for the quote module
 */

import { QuoteProps } from './components/Quote';

/**
 * Calculate duration in frames based on text length
 * Estimates reading time at ~3 words per second
 */
export function calculateQuoteDuration(
  quote: string,
  author: string,
  fps: number = 30
): number {
  const words = (quote + ' ' + author).split(/\s+/).length;
  const seconds = Math.max(words / 3, 5); // Minimum 5 seconds
  const extraTime = 2; // Add 2 seconds for intro/outro animations
  return Math.ceil((seconds + extraTime) * fps);
}

/**
 * Get optimal font size based on quote length
 */
export function getOptimalFontSize(quoteLength: number): number {
  if (quoteLength < 50) return 60;
  if (quoteLength < 100) return 52;
  if (quoteLength < 150) return 46;
  return 40;
}

/**
 * Split long quotes into multiple lines
 */
export function formatQuoteText(
  quote: string,
  maxLineLength: number = 40
): string {
  const words = quote.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  words.forEach((word) => {
    if ((currentLine + ' ' + word).length <= maxLineLength) {
      currentLine = currentLine ? currentLine + ' ' + word : word;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  });

  if (currentLine) lines.push(currentLine);

  return lines.join('\n');
}

/**
 * Validate that media URL is accessible
 */
export function isValidMediaUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get animation duration in frames
 */
export function getAnimationDuration(
  animationType: string,
  fps: number = 30
): number {
  const durations: { [key: string]: number } = {
    'zoom-in': fps * 0.8,
    'zoom-out': fps * 0.8,
    fade: fps * 1,
    pan: fps * 0.6,
    none: 0,
  };

  return durations[animationType] || 0;
}

/**
 * Create a default quote configuration
 */
export function getDefaultQuoteConfig(): Partial<QuoteProps> {
  return {
    quote: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
    backgroundMedia: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1080&h=1920',
      animation: 'fade',
    },
    stories: ['Motivation', 'Success', 'Inspiration'],
  };
}
