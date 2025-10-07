# Quote Module - Usage Examples

This file contains practical examples for using the Quote Module.

## Table of Contents

1. [Basic Examples](#basic-examples)
2. [Advanced Examples](#advanced-examples)
3. [Composition Examples](#composition-examples)
4. [Utility Usage](#utility-usage)
5. [Error Handling](#error-handling)

## Basic Examples

### Example 1: Simple Quote

```typescript
import { createQuote } from './quote';

const simpleQuote = createQuote()
  .withQuote('Be yourself; everyone else is already taken.')
  .withAuthor('Oscar Wilde')
  .withBackgroundImage(
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1920'
  )
  .build();
```

### Example 2: Quote with Stories/Tags

```typescript
const taggedQuote = createQuote()
  .withQuote('The only way to do great work is to love what you do.')
  .withAuthor('Steve Jobs')
  .withBackgroundImage(
    'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1080&h=1920',
    'fade'
  )
  .withStories('Motivation', 'Work', 'Success', 'Passion')
  .build();
```

### Example 3: Quote with Animation

```typescript
const animatedQuote = createQuote()
  .withQuote('Success is not final, failure is not fatal.')
  .withAuthor('Winston Churchill')
  .withBackgroundImage(
    'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=1080&h=1920',
    'zoom-in' // Choose: 'zoom-in', 'zoom-out', 'fade', 'pan', 'none'
  )
  .withStories('Success', 'Perseverance')
  .build();
```

## Advanced Examples

### Example 4: Quote with Video Background

```typescript
const videoQuote = createQuote()
  .withQuote('Life is what happens when you are busy making other plans.')
  .withAuthor('John Lennon')
  .withBackgroundVideo(
    'https://example.com/your-video.mp4',
    'fade'
  )
  .withStories('Life', 'Philosophy')
  .build();
```

### Example 5: Quote with Audio

```typescript
const audioQuote = createQuote()
  .withQuote('Where words fail, music speaks.')
  .withAuthor('Hans Christian Andersen')
  .withBackgroundImage(
    'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1080&h=1920',
    'pan'
  )
  .withAudio('https://cdn.pixabay.com/audio/2022/03/10/audio_d1718ab41b.mp3')
  .withStories('Music', 'Art', 'Expression')
  .build();
```

### Example 6: Long Quote with Formatting

```typescript
import { createQuote, formatQuoteText } from './quote';

const longText = 'It is not the critic who counts; not the man who points out how the strong man stumbles. The credit belongs to the man who is actually in the arena.';

const longQuote = createQuote()
  .withQuote(longText)
  .withAuthor('Theodore Roosevelt')
  .withBackgroundImage(
    'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=1080&h=1920',
    'fade'
  )
  .withStories('Courage', 'Action', 'Perseverance')
  .build();

// Optional: Format the quote text
const formatted = formatQuoteText(longText, 60);
console.log(formatted);
```

## Composition Examples

### Example 7: Basic Remotion Composition

```typescript
import { Composition } from 'remotion';
import { Quote, createQuote } from './quote';

const myQuote = createQuote()
  .withQuote('Do what you can, with what you have, where you are.')
  .withAuthor('Theodore Roosevelt')
  .withBackgroundImage('https://example.com/image.jpg', 'fade')
  .build();

export const MyComposition = () => (
  <Composition
    id="MyQuote"
    component={Quote}
    durationInFrames={240}
    fps={30}
    width={1080}
    height={1920}
    defaultProps={myQuote}
  />
);
```

### Example 8: Auto-calculated Duration

```typescript
import { Composition } from 'remotion';
import { Quote, createQuote, calculateQuoteDuration } from './quote';

const myQuote = createQuote()
  .withQuote('Your quote text here')
  .withAuthor('Author Name')
  .withBackgroundImage('https://example.com/image.jpg')
  .build();

// Automatically calculate optimal duration
const duration = calculateQuoteDuration(myQuote.quote, myQuote.author, 30);

export const AutoDurationComposition = () => (
  <Composition
    id="AutoQuote"
    component={Quote}
    durationInFrames={duration}
    fps={30}
    width={1080}
    height={1920}
    defaultProps={myQuote}
  />
);
```

### Example 9: Multiple Quote Compositions

```typescript
import { Composition } from 'remotion';
import { Quote, createQuote, calculateQuoteDuration } from './quote';

const quotes = [
  {
    id: 'Quote1',
    quote: 'First quote text',
    author: 'Author 1',
    image: 'https://example.com/image1.jpg',
  },
  {
    id: 'Quote2',
    quote: 'Second quote text',
    author: 'Author 2',
    image: 'https://example.com/image2.jpg',
  },
];

export const MultipleQuotesComposition = () => (
  <>
    {quotes.map((q) => {
      const quoteData = createQuote()
        .withQuote(q.quote)
        .withAuthor(q.author)
        .withBackgroundImage(q.image, 'fade')
        .build();
      
      const duration = calculateQuoteDuration(q.quote, q.author, 30);
      
      return (
        <Composition
          key={q.id}
          id={q.id}
          component={Quote}
          durationInFrames={duration}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={quoteData}
        />
      );
    })}
  </>
);
```

## Utility Usage

### Example 10: Calculate Duration

```typescript
import { calculateQuoteDuration } from './quote';

// Short quote
const shortDuration = calculateQuoteDuration(
  'Be yourself.',
  'Oscar Wilde',
  30
);
console.log('Short quote duration:', shortDuration, 'frames');

// Long quote
const longQuote = 'The only way to do great work is to love what you do. If you haven\'t found it yet, keep looking.';
const longDuration = calculateQuoteDuration(longQuote, 'Steve Jobs', 30);
console.log('Long quote duration:', longDuration, 'frames');
```

### Example 11: Get Optimal Font Size

```typescript
import { getOptimalFontSize } from './quote';

const quote1 = 'Short quote';
const quote2 = 'This is a much longer quote that needs a smaller font size to fit properly on the screen';

console.log('Font size for short quote:', getOptimalFontSize(quote1.length));
console.log('Font size for long quote:', getOptimalFontSize(quote2.length));
```

### Example 12: Format Quote Text

```typescript
import { formatQuoteText } from './quote';

const longQuote = 'The future belongs to those who believe in the beauty of their dreams and work hard to make them a reality.';

// Format with default max line length (40 chars)
const formatted = formatQuoteText(longQuote);
console.log(formatted);

// Format with custom max line length
const formatted60 = formatQuoteText(longQuote, 60);
console.log(formatted60);
```

### Example 13: Validate Quote Configuration

```typescript
import { validateQuote } from './quote';

const validQuote = {
  quote: 'Valid quote text',
  author: 'Valid Author',
  backgroundMedia: {
    type: 'image',
    url: 'https://example.com/image.jpg',
  },
};

const invalidQuote = {
  quote: '', // Invalid: empty
  author: 'Author',
  backgroundMedia: {
    type: 'image',
    url: 'not-a-url', // Invalid: not a URL
  },
};

const result1 = validateQuote(validQuote);
console.log('Valid quote:', result1.valid); // true

const result2 = validateQuote(invalidQuote);
console.log('Invalid quote:', result2.valid); // false
console.log('Errors:', result2.errors);
```

## Error Handling

### Example 14: Handle Builder Errors

```typescript
import { createQuote } from './quote';

try {
  // This will throw an error - missing author
  const quote = createQuote()
    .withQuote('Quote without author')
    .build();
} catch (error) {
  console.error('Error creating quote:', error.message);
  // Output: Error creating quote: Invalid quote configuration:
  //   - author: Author name is required
}
```

### Example 15: Validate Before Building

```typescript
import { createQuote, validateQuote } from './quote';

const quoteData = {
  quote: 'Your quote',
  author: 'Your author',
  backgroundMedia: {
    type: 'image' as const,
    url: 'https://example.com/image.jpg',
  },
};

// Validate first
const validation = validateQuote(quoteData);

if (validation.valid) {
  // Safe to build
  const quote = createQuote()
    .withQuote(quoteData.quote)
    .withAuthor(quoteData.author)
    .withBackgroundImage(quoteData.backgroundMedia.url)
    .build();
  
  console.log('Quote created successfully');
} else {
  console.error('Validation failed:', validation.errors);
}
```

### Example 16: Template-based Creation with Error Handling

```typescript
import { createQuoteFromTemplate } from './quote';

const template = {
  quote: 'Template quote',
  author: 'Template author',
  backgroundMedia: {
    type: 'image' as const,
    url: 'https://example.com/image.jpg',
    animation: 'fade' as const,
  },
  stories: ['Tag1', 'Tag2'],
};

try {
  const quote = createQuoteFromTemplate(template).build();
  console.log('Quote created from template:', quote);
} catch (error) {
  console.error('Failed to create quote from template:', error.message);
}
```

## Real-world Use Cases

### Example 17: Daily Motivation Quote Generator

```typescript
import { createQuote, calculateQuoteDuration } from './quote';
import { Composition } from 'remotion';
import { Quote } from './quote';

const dailyQuotes = [
  { quote: 'Monday motivation...', author: 'Author 1' },
  { quote: 'Tuesday inspiration...', author: 'Author 2' },
  // ... more quotes
];

const backgroundImages = [
  'https://example.com/sunrise.jpg',
  'https://example.com/mountains.jpg',
  // ... more images
];

export const DailyQuoteCompositions = () => (
  <>
    {dailyQuotes.map((q, index) => {
      const quoteData = createQuote()
        .withQuote(q.quote)
        .withAuthor(q.author)
        .withBackgroundImage(
          backgroundImages[index % backgroundImages.length],
          'fade'
        )
        .withStories('Daily', 'Motivation')
        .build();
      
      return (
        <Composition
          key={`day-${index}`}
          id={`DailyQuote${index + 1}`}
          component={Quote}
          durationInFrames={calculateQuoteDuration(q.quote, q.author, 30)}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={quoteData}
        />
      );
    })}
  </>
);
```

### Example 18: Quote Series with Consistent Styling

```typescript
import { createQuote } from './quote';

const baseImage = 'https://example.com/brand-background.jpg';
const brandStories = ['BrandName', 'Inspiration'];

const quoteSeriesData = [
  { quote: 'Quote 1', author: 'Author 1' },
  { quote: 'Quote 2', author: 'Author 2' },
  { quote: 'Quote 3', author: 'Author 3' },
];

const quoteSeries = quoteSeriesData.map((data) =>
  createQuote()
    .withQuote(data.quote)
    .withAuthor(data.author)
    .withBackgroundImage(baseImage, 'pan')
    .withStories(...brandStories)
    .build()
);

export { quoteSeries };
```

## Tips and Best Practices

1. **Keep quotes concise**: 10-30 words work best
2. **Use high-quality images**: Minimum 1080x1920 resolution
3. **Test animations**: Try different animations to see what fits
4. **Calculate duration**: Use `calculateQuoteDuration()` for optimal timing
5. **Add stories**: Help viewers discover and categorize content
6. **Validate early**: Use `validateQuote()` before building
7. **Handle errors**: Wrap `.build()` in try-catch for production code
8. **Test audio levels**: Ensure background audio doesn't overpower

## Resources

- [Quote Module README](src/quote/README.md)
- [Complete Documentation](QUOTE_MODULE.md)
- [Quick Start Guide](QUOTE_QUICKSTART.md)
- [Implementation Summary](QUOTE_MODULE_SUMMARY.md)
