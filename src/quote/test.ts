/**
 * Test file demonstrating the Quote module usage
 *
 * This file shows various ways to create and configure quotes.
 * You can run these examples or use them as templates.
 */

import {
  createQuote,
  createQuoteFromTemplate,
  validateQuote,
  calculateQuoteDuration,
  formatQuoteText,
  getOptimalFontSize,
} from './index';

// Example 1: Basic quote with minimal configuration
export const basicQuoteTest = createQuote()
  .withQuote('Be the change you wish to see in the world.')
  .withAuthor('Mahatma Gandhi')
  .withBackgroundImage(
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1920'
  )
  .build();

// Example 2: Quote with all features
export const fullFeaturedQuoteTest = createQuote()
  .withQuote(
    'The future belongs to those who believe in the beauty of their dreams.'
  )
  .withAuthor('Eleanor Roosevelt')
  .withBackgroundImage(
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1080&h=1920',
    'zoom-in'
  )
  .withStories('Dreams', 'Future', 'Belief', 'Inspiration')
  .build();

// Example 3: Quote with video background
export const videoBackgroundQuoteTest = createQuote()
  .withQuote(
    'Live as if you were to die tomorrow. Learn as if you were to live forever.'
  )
  .withAuthor('Mahatma Gandhi')
  .withBackgroundVideo(
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'fade'
  )
  .withStories('Life', 'Learning', 'Wisdom')
  .build();

// Example 4: Quote with audio
export const quoteWithAudioTest = createQuote()
  .withQuote('Where words fail, music speaks.')
  .withAuthor('Hans Christian Andersen')
  .withBackgroundImage(
    'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1080&h=1920',
    'pan'
  )
  .withAudio('https://cdn.pixabay.com/audio/2022/03/10/audio_d1718ab41b.mp3')
  .withStories('Music', 'Art', 'Expression')
  .build();

// Example 5: Long quote with formatting
const longQuoteText =
  'It is not the critic who counts; not the man who points out how the strong man stumbles, or where the doer of deeds could have done them better. The credit belongs to the man who is actually in the arena.';

export const longQuoteTest = createQuote()
  .withQuote(longQuoteText)
  .withAuthor('Theodore Roosevelt')
  .withBackgroundImage(
    'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=1080&h=1920',
    'fade'
  )
  .withStories('Courage', 'Action', 'Perseverance')
  .build();

// Example 6: Creating from template
const templateQuote = {
  quote: 'Template-based quote',
  author: 'Test Author',
  backgroundMedia: {
    type: 'image' as const,
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1920',
    animation: 'zoom-out' as const,
  },
  stories: ['Template', 'Test'],
};

export const templateQuoteTest = createQuoteFromTemplate(templateQuote).build();

// Utility function tests
export const utilityTests = {
  // Test duration calculation
  shortQuoteDuration: calculateQuoteDuration('Short quote', 'Author', 30),
  longQuoteDuration: calculateQuoteDuration(
    longQuoteText,
    'Theodore Roosevelt',
    30
  ),

  // Test font size calculation
  shortQuoteFontSize: getOptimalFontSize(20),
  mediumQuoteFontSize: getOptimalFontSize(80),
  longQuoteFontSize: getOptimalFontSize(200),

  // Test text formatting
  formattedQuote: formatQuoteText(longQuoteText, 50),
};

// Validation tests
export const validationTests = {
  validQuote: validateQuote(basicQuoteTest),
  invalidQuote: validateQuote({
    quote: '', // Invalid: empty quote
    author: 'Author',
    backgroundMedia: {
      type: 'image',
      url: 'invalid-url', // Invalid: not a URL
    },
  }),
};

// Error handling test
export const errorHandlingTest = () => {
  try {
    // This should throw an error due to missing required fields
    createQuote().withQuote('Only quote, no author').build();
  } catch (error) {
    console.error('Expected error caught:', error);
    return { success: true, error: error };
  }
  return { success: false };
};

// Export all test quotes as an array for easy iteration
export const allTestQuotes = [
  { name: 'Basic Quote', config: basicQuoteTest },
  { name: 'Full Featured Quote', config: fullFeaturedQuoteTest },
  { name: 'Video Background Quote', config: videoBackgroundQuoteTest },
  { name: 'Quote with Audio', config: quoteWithAudioTest },
  { name: 'Long Quote', config: longQuoteTest },
  { name: 'Template Quote', config: templateQuoteTest },
];

// Log test results
console.log('Quote Module Tests');
console.log('==================');
console.log('\nUtility Tests:');
console.log(
  '- Short quote duration:',
  utilityTests.shortQuoteDuration,
  'frames'
);
console.log('- Long quote duration:', utilityTests.longQuoteDuration, 'frames');
console.log('- Font sizes:', {
  short: utilityTests.shortQuoteFontSize,
  medium: utilityTests.mediumQuoteFontSize,
  long: utilityTests.longQuoteFontSize,
});

console.log('\nValidation Tests:');
console.log(
  '- Valid quote:',
  validationTests.validQuote.valid ? '✓ Pass' : '✗ Fail'
);
console.log(
  '- Invalid quote:',
  !validationTests.invalidQuote.valid ? '✓ Pass' : '✗ Fail'
);
if (validationTests.invalidQuote.errors) {
  console.log('  Errors:', validationTests.invalidQuote.errors);
}

console.log('\nError Handling Test:');
const errorTest = errorHandlingTest();
console.log('- Error handling:', errorTest.success ? '✓ Pass' : '✗ Fail');

console.log('\nAll test quotes created successfully!');
console.log('Total quotes:', allTestQuotes.length);
