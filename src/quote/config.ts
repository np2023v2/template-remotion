/**
 * Configuration file for quote videos
 * Import and use these in your compositions or create custom configurations
 */

import { simpleQuote, motivationalQuote } from './examples';

// Active quote config (change this to switch between quotes)
export const activeQuoteConfig = simpleQuote;

// Alternative: Create a custom quote config
// export const activeQuoteConfig = {
//   quote: 'Your custom quote here',
//   author: 'Author Name',
//   backgroundMedia: {
//     type: 'image' as const,
//     url: 'https://your-image-url.jpg',
//     animation: 'fade' as const,
//   },
//   audioUrl: 'https://your-audio-url.mp3', // optional
//   stories: ['Tag1', 'Tag2'], // optional
// };
