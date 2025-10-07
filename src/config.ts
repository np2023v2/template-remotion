/**
 * Configuration file for switching between different story templates
 * Change the imported example to use different configurations
 */

import {
  worldNewsExample,
  techNewsExample,
  sportsNewsExample,
  simpleNewsExample,
} from './examples';

// Change this to switch between different configurations
export const activeConfig = worldNewsExample;

// Or create your own custom configuration:
// export const activeConfig = {
//   backgroundImages: [
//     {
//       url: 'your-image-url',
//       animation: 'zoom-in',
//     },
//   ],
//   textSegments: [
//     {
//       text: 'Your custom text',
//       startFrame: 30,
//       durationInFrames: 90,
//       animation: 'fade',
//     },
//   ],
//   publishDate: '2024-03-15',
//   tags: ['#YourTag'],
//   copyright: '© 2024 Your Company',
// };
