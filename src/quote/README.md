# Quote Module

A complete module for creating short quote videos with friendly animations.

## Features

✅ **Flexible Background**: Support for both images and videos
✅ **Audio Support**: Optional background audio/music
✅ **Friendly Animations**: Smooth fade-in, zoom, and pan effects
✅ **Stories/Tags**: Display related stories or tags
✅ **Builder Pattern**: Fluent API for easy configuration
✅ **Type-Safe**: Full TypeScript support with Zod validation
✅ **Responsive Design**: Optimized for vertical (9:16) format

## Quick Start

### Using the Builder

```typescript
import { createQuote } from './quote';

const myQuote = createQuote()
  .withQuote('The only way to do great work is to love what you do.')
  .withAuthor('Steve Jobs')
  .withBackgroundImage('https://example.com/image.jpg', 'zoom-in')
  .withStories('Motivation', 'Success', 'Career')
  .build();
```

### Using Pre-built Examples

```typescript
import { motivationalQuote, wisdomQuote } from './quote/examples';

// Use directly in your composition
<Composition
  id="MotivationalQuote"
  component={Quote}
  defaultProps={motivationalQuote}
/>
```

## API Reference

### Builder Methods

#### `createQuote(): QuoteBuilder`
Creates a new quote builder instance.

#### `withQuote(text: string): QuoteBuilder`
Sets the quote text (required).
- **text**: The quote text to display

#### `withAuthor(name: string): QuoteBuilder`
Sets the author name (required).
- **name**: Author name (e.g., "Steve Jobs")

#### `withBackgroundImage(url: string, animation?: string): QuoteBuilder`
Sets a background image.
- **url**: Image URL
- **animation**: Animation type: 'zoom-in', 'zoom-out', 'fade', 'pan', 'none' (default: 'fade')

#### `withBackgroundVideo(url: string, animation?: string): QuoteBuilder`
Sets a background video.
- **url**: Video URL
- **animation**: Animation type: 'zoom-in', 'zoom-out', 'fade', 'pan', 'none' (default: 'none')

#### `withAudio(url: string): QuoteBuilder`
Adds background audio (optional).
- **url**: Audio file URL

#### `withStories(...stories: string[]): QuoteBuilder`
Adds related stories/tags (optional).
- **stories**: One or more story/tag strings

#### `build(): QuoteProps`
Builds and validates the quote configuration.

## Component Structure

```
Quote Component
├── BackgroundLayer (Image or Video with animations)
│   └── Dark overlay for text readability
├── QuoteText (Main quote with fade-in and scale animation)
├── AuthorText (Author name with delayed fade-in)
└── StoriesIndicator (Tags with staggered animations)
```

## Animation Types

### Background Animations

- **zoom-in**: Gradually zooms into the background (1.0x → 1.3x)
- **zoom-out**: Gradually zooms out from the background (1.3x → 1.0x)
- **fade**: Fades in and out smoothly
- **pan**: Slow horizontal pan effect (-5% → 5%)
- **none**: No animation

### Text Animations

All text animations are built-in:
- **Quote**: Fade-in with spring scale and upward slide (0-30 frames)
- **Author**: Delayed fade-in with upward slide (40-70 frames)
- **Stories**: Staggered fade-in with individual delays (80+ frames)

## Utility Functions

### `calculateQuoteDuration(quote: string, author: string, fps?: number): number`
Calculates optimal video duration based on text length.

### `getOptimalFontSize(quoteLength: number): number`
Returns optimal font size based on quote length.

### `formatQuoteText(quote: string, maxLineLength?: number): string`
Formats long quotes into multiple lines.

### `isValidMediaUrl(url: string): boolean`
Validates media URL format.

### `getAnimationDuration(animationType: string, fps?: number): number`
Returns animation duration in frames.

### `getDefaultQuoteConfig(): Partial<QuoteProps>`
Returns a default quote configuration.

## Examples

### Basic Quote

```typescript
const quote = createQuote()
  .withQuote('Be yourself; everyone else is already taken.')
  .withAuthor('Oscar Wilde')
  .withBackgroundImage('https://example.com/bg.jpg')
  .build();
```

### Quote with Video Background

```typescript
const quote = createQuote()
  .withQuote('Life is what happens when you're busy making other plans.')
  .withAuthor('John Lennon')
  .withBackgroundVideo('https://example.com/video.mp4', 'fade')
  .withAudio('https://example.com/music.mp3')
  .withStories('Life', 'Philosophy')
  .build();
```

### Quote with Multiple Stories

```typescript
const quote = createQuote()
  .withQuote('Success is not final, failure is not fatal.')
  .withAuthor('Winston Churchill')
  .withBackgroundImage('https://example.com/bg.jpg', 'pan')
  .withStories('Success', 'Motivation', 'Perseverance', 'Leadership')
  .build();
```

## Validation

The module automatically validates all configurations using Zod schemas:

```typescript
import { validateQuote } from './quote';

const result = validateQuote(myQuoteData);
if (!result.valid) {
  console.error('Validation errors:', result.errors);
}
```

## Best Practices

1. **Keep quotes concise**: Aim for 10-30 words for best readability
2. **Choose appropriate animations**: Use subtle animations like 'fade' for serious quotes
3. **Use high-quality images**: Minimum 1080x1920 resolution
4. **Add stories/tags**: Help viewers categorize and discover content
5. **Test audio levels**: Ensure background audio doesn't overpower
6. **Consider duration**: Use `calculateQuoteDuration()` for optimal timing

## Integration with Remotion

```typescript
import { Composition } from 'remotion';
import { Quote, motivationalQuote, calculateQuoteDuration } from './quote';

const duration = calculateQuoteDuration(
  motivationalQuote.quote,
  motivationalQuote.author,
  30
);

<Composition
  id="MotivationalQuote"
  component={Quote}
  durationInFrames={duration}
  fps={30}
  width={1080}
  height={1920}
  defaultProps={motivationalQuote}
/>
```

## Troubleshooting

### Quote text is too long
Use `formatQuoteText()` to split into multiple lines or reduce font size.

### Background image doesn't load
Verify the URL is accessible and supports CORS.

### Animations feel too slow/fast
Adjust the composition FPS or modify animation durations in the component.

### Stories not showing
Ensure you've added stories using `withStories()` and the video duration is long enough (80+ frames).
