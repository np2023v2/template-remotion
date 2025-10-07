# Quote Module Documentation

## Overview

The Quote Module is a complete, production-ready solution for creating short quote videos with beautiful animations. It follows the same design patterns as the NewsStory module and integrates seamlessly with Remotion.

## 📁 Module Structure

```
src/quote/
├── components/
│   └── Quote.tsx              # Main Quote component
├── quoteBuilder.ts            # Builder pattern implementation
├── utils.ts                   # Utility functions
├── examples.ts                # Pre-built quote examples
├── config.ts                  # Configuration file
├── index.ts                   # Module exports
└── README.md                  # Module documentation
```

## 🚀 Quick Start

### 1. Using Pre-built Examples

The easiest way to get started is using one of the pre-built quote examples:

```typescript
import { Quote, motivationalQuote } from './quote';

// The quote is already configured and ready to use
// It's registered in src/index.tsx as "MotivationalQuote"
```

### 2. Using the Builder Pattern

Create custom quotes with the fluent builder API:

```typescript
import { createQuote } from './quote';

const myQuote = createQuote()
  .withQuote('The best time to plant a tree was 20 years ago. The second best time is now.')
  .withAuthor('Chinese Proverb')
  .withBackgroundImage('https://example.com/image.jpg', 'zoom-in')
  .withStories('Wisdom', 'Nature', 'Growth')
  .build();
```

### 3. Complete Integration Example

```typescript
import { Composition } from 'remotion';
import { Quote, createQuote, calculateQuoteDuration } from './quote';

const customQuote = createQuote()
  .withQuote('Do what you can, with what you have, where you are.')
  .withAuthor('Theodore Roosevelt')
  .withBackgroundImage(
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1920',
    'fade'
  )
  .withStories('Motivation', 'Action')
  .build();

// Calculate optimal duration based on quote length
const duration = calculateQuoteDuration(customQuote.quote, customQuote.author, 30);

<Composition
  id="CustomQuote"
  component={Quote}
  durationInFrames={duration}
  fps={30}
  width={1080}
  height={1920}
  defaultProps={customQuote}
/>
```

## 🎨 Features

### Input Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `quote` | `string` | ✅ Yes | The quote text to display |
| `author` | `string` | ✅ Yes | The author name |
| `backgroundMedia` | `BackgroundMedia` | ✅ Yes | Background image or video configuration |
| `audioUrl` | `string` | ❌ No | Optional background audio URL |
| `stories` | `string[]` | ❌ No | Optional tags/categories |

### BackgroundMedia Object

```typescript
{
  type: 'image' | 'video',
  url: string,
  animation?: 'zoom-in' | 'zoom-out' | 'fade' | 'pan' | 'none'
}
```

### Animation Types

#### Background Animations
- **zoom-in**: Gradually zooms from 1.0x to 1.3x scale
- **zoom-out**: Gradually zooms from 1.3x to 1.0x scale
- **fade**: Smooth fade in/out effect
- **pan**: Horizontal pan from -5% to 5%
- **none**: Static background

#### Text Animations (Built-in)
- **Quote Text**: Fade-in + spring scale + upward slide (0-30 frames)
- **Author**: Delayed fade-in + upward slide (40-70 frames)
- **Stories**: Staggered fade-in with individual delays (80+ frames)

## 🔧 Builder API

### Methods

#### `createQuote(): QuoteBuilder`
Creates a new quote builder instance.

#### `withQuote(text: string): QuoteBuilder`
Sets the quote text (required).

#### `withAuthor(name: string): QuoteBuilder`
Sets the author name (required).

#### `withBackgroundImage(url: string, animation?: string): QuoteBuilder`
Sets a background image with optional animation.

**Parameters:**
- `url`: Image URL
- `animation`: Animation type (default: 'fade')

#### `withBackgroundVideo(url: string, animation?: string): QuoteBuilder`
Sets a background video with optional animation.

**Parameters:**
- `url`: Video URL
- `animation`: Animation type (default: 'none')

#### `withAudio(url: string): QuoteBuilder`
Adds background audio (optional).

#### `withStories(...stories: string[]): QuoteBuilder`
Adds related stories/tags (optional).

#### `build(): QuoteProps`
Builds and validates the quote configuration. Throws an error if validation fails.

## 📊 Utility Functions

### `calculateQuoteDuration(quote: string, author: string, fps?: number): number`
Calculates optimal video duration based on text length.

**Example:**
```typescript
const duration = calculateQuoteDuration(
  'Life is what happens when you are busy making other plans.',
  'John Lennon',
  30
);
// Returns approximately 240 frames (8 seconds at 30fps)
```

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

## 📝 Pre-built Examples

The module includes 7 ready-to-use quote examples:

1. **motivationalQuote** - Steve Jobs quote about loving your work
2. **wisdomQuote** - Robert Frost quote about life
3. **successQuote** - Winston Churchill quote about success and failure
4. **inspirationQuote** - Theodore Roosevelt quote about believing in dreams
5. **happinessQuote** - Dalai Lama quote about happiness
6. **simpleQuote** - Oscar Wilde quote about being yourself
7. **quoteWithAudio** - Quote with background audio example

All are registered as compositions in `src/index.tsx`.

## 🎯 Component Architecture

```
Quote Component
├── BackgroundLayer
│   ├── Background Media (Image or Video)
│   │   └── Animation (zoom, fade, pan, etc.)
│   └── Dark Overlay (for text readability)
├── Audio (optional)
├── QuoteText
│   └── Animation: fade-in + spring scale + slide
├── AuthorText
│   └── Animation: delayed fade-in + slide
└── StoriesIndicator (optional)
    └── Animation: staggered fade-in
```

## ✅ Validation

The module uses Zod schemas for runtime type checking:

```typescript
import { validateQuote } from './quote';

const result = validateQuote(myQuoteData);
if (!result.valid) {
  console.error('Validation errors:', result.errors);
}
```

Common validation errors:
- Missing quote or author
- Invalid media URL
- Invalid animation type

## 🎬 Usage in Remotion

### Option 1: Use in index.tsx (Already Configured)

All example quotes are already registered in `src/index.tsx`. You can:
1. Run `npm run dev`
2. Open http://localhost:3000
3. Select any quote composition from the list

### Option 2: Create Custom Composition

```typescript
import { Composition } from 'remotion';
import { Quote, createQuote, calculateQuoteDuration } from './quote';

const myQuote = createQuote()
  .withQuote('Your quote here')
  .withAuthor('Your name')
  .withBackgroundImage('https://example.com/bg.jpg', 'fade')
  .build();

const duration = calculateQuoteDuration(myQuote.quote, myQuote.author, 30);

export const MyComposition = () => (
  <Composition
    id="MyQuote"
    component={Quote}
    durationInFrames={duration}
    fps={30}
    width={1080}
    height={1920}
    defaultProps={myQuote}
  />
);
```

### Option 3: Render Directly

```bash
npm run build
# Renders the default "NewsStory" composition

# To render a specific quote:
npx remotion render src/index.tsx MotivationalQuote out/motivational-quote.mp4
```

## 🎨 Customization Tips

### 1. Adjusting Animation Speed
Modify animation durations in `Quote.tsx`:
- Quote text: Change `[0, 30]` to `[0, 45]` for slower fade-in
- Author: Change `[40, 70]` to `[60, 90]` for delayed appearance
- Stories: Change `80 + index * 5` to adjust stagger timing

### 2. Changing Colors/Fonts
Edit the style objects in `Quote.tsx`:
```typescript
// Quote text styling
fontSize: '52px',
fontFamily: 'Georgia, serif',
color: 'white',
```

### 3. Background Overlay Darkness
Adjust the gradient opacity in `BackgroundLayer`:
```typescript
background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7))'
// Increase values for darker overlay
```

### 4. Custom Duration
Override the auto-calculated duration:
```typescript
<Composition
  id="MyQuote"
  component={Quote}
  durationInFrames={360}  // Fixed 12 seconds at 30fps
  fps={30}
  width={1080}
  height={1920}
  defaultProps={myQuote}
/>
```

## 🔍 Troubleshooting

### Quote text is too long
**Solution:** Use `formatQuoteText()` or manually break into shorter segments:
```typescript
const quote = "First part.\n\nSecond part.";
```

### Background image doesn't load
**Solutions:**
1. Verify URL is accessible
2. Check CORS policy (use CORS-enabled image hosts)
3. Use local images: Place in `public/` and use `/image.jpg`

### Animations feel too fast/slow
**Solution:** Adjust FPS or modify interpolation ranges in `Quote.tsx`

### Stories not visible
**Solutions:**
1. Ensure video duration is at least 110 frames
2. Check that `stories` array is not empty
3. Verify stories are passed in props

### Audio not playing
**Solutions:**
1. Verify audio URL is accessible
2. Use supported formats (MP3, WAV)
3. Check audio file has CORS headers

## 📚 Related Documentation

- Main README: `/README.md`
- Quote Module README: `/src/quote/README.md`
- Architecture: `/ARCHITECTURE.md`
- Advanced Usage: `/ADVANCED.md`

## 🤝 Integration with Existing Modules

The Quote module follows the same patterns as NewsStory:
- Similar builder pattern
- Consistent Zod validation
- Same composition structure
- Compatible animation system

You can mix quote and news compositions in the same project.

## 📄 License

ISC - Same as the main project
