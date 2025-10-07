# Template Remotion - News Stories & Quote Videos

A Remotion template for creating vertical (9:16 aspect ratio) videos with animations, similar to Instagram/Facebook Stories format. Includes both News Stories and Quote modules.

## 📚 Documentation

### General
- **[Quick Start Guide](QUICKSTART.md)** - Get started in 5 minutes
- **[Features Guide](FEATURES.md)** - New features: Factory, Multi-Story, Zod validation
- **[Advanced Usage](ADVANCED.md)** - Detailed customization guide
- **[Architecture](ARCHITECTURE.md)** - Component structure and technical details

### Quote Module (New!)
- **[Quote Module Documentation](QUOTE_MODULE.md)** - Complete guide to the Quote module
- **[Quote Quick Start](QUOTE_QUICKSTART.md)** - Create your first quote video in 5 minutes
- **[Quote Module README](src/quote/README.md)** - API reference and examples

## Features

### News Stories Module
- ✅ **Vertical format (9:16)**: Optimized for social media stories
- ✅ **Background images with animations**: Support for zoom-in, zoom-out, and fade effects
- ✅ **Animated text segments**: Multiple text animations (fade, slide, typing)
- ✅ **Publication date display**: Shows date in top-left corner
- ✅ **Tags support**: Display multiple tags with animations
- ✅ **Copyright line**: Configurable copyright text
- ✅ **Zod schema validation**: Runtime type checking with clear error messages
- ✅ **Story factory**: Fluent builder API for creating stories
- ✅ **Multi-story support**: Combine multiple stories with transitions
- ✅ **Fully configurable**: All aspects can be customized via props

### Quote Module (New!)
- ✅ **Quote videos**: Create beautiful short quote videos
- ✅ **Flexible backgrounds**: Support for both images and videos
- ✅ **Audio support**: Add background music or narration
- ✅ **Friendly animations**: Smooth fade-in, zoom, and pan effects
- ✅ **Stories/Tags**: Display related categories
- ✅ **Builder pattern**: Fluent API for easy configuration
- ✅ **Type-safe**: Full TypeScript support with Zod validation
- ✅ **Pre-built examples**: 7 ready-to-use quote templates

## Installation

```bash
npm install
```

## Usage

### Development Mode

Start the Remotion Studio to preview and edit your video:

```bash
npm run dev
```

### Build Video

Render the video to an MP4 file:

```bash
npm run build
```

The video will be saved to `out/video.mp4`.

## Configuration

The `NewsStory` component accepts the following props:

### Props Interface

```typescript
interface NewsStoryProps {
  backgroundImages: BackgroundImage[];
  textSegments: TextSegment[];
  publishDate: string;
  tags: string[];
  copyright: string;
}

interface BackgroundImage {
  url: string;
  animation?: 'zoom-in' | 'zoom-out' | 'fade' | 'none';
}

interface TextSegment {
  text: string;
  startFrame: number;
  durationInFrames: number;
  animation?: 'fade' | 'slide' | 'typing' | 'none';
}
```

### Example Configuration

```tsx
<Composition
  id="NewsStory"
  component={NewsStory}
  durationInFrames={300}
  fps={30}
  width={1080}
  height={1920}
  defaultProps={{
    backgroundImages: [
      {
        url: 'https://example.com/image.jpg',
        animation: 'zoom-in',
      },
    ],
    textSegments: [
      {
        text: 'Breaking News: Important announcement',
        startFrame: 30,
        durationInFrames: 90,
        animation: 'fade',
      },
      {
        text: 'More details about this story',
        startFrame: 130,
        durationInFrames: 90,
        animation: 'slide',
      },
    ],
    publishDate: '2024-03-15',
    tags: ['#News', '#Breaking', '#World'],
    copyright: '© 2024 Your Company. All rights reserved.',
  }}
/>
```

## Story Factory (New!)

The story factory provides a fluent builder API for creating news stories with automatic validation.

### Basic Usage

```tsx
import { createStory } from './storiesFactory';

const story = createStory()
  .withBackgroundImage(
    'https://example.com/image.jpg',
    'zoom-in'
  )
  .withTextSegment('Breaking News', 30, 90, 'fade')
  .withTextSegment('More details', 130, 90, 'slide')
  .withPublishDate('2024-03-15')
  .withTags('#News', '#Breaking')
  .withCopyright('© 2024 News Agency')
  .build();
```

### Benefits

- **Type-safe**: Full TypeScript support
- **Validated**: Automatic Zod validation
- **Readable**: Clear, fluent API
- **Flexible**: Easy to modify and extend

## Multi-Story Videos (New!)

Combine multiple stories into one video with smooth transitions.

### Usage

```tsx
import { MultiStory } from './components/MultiStory';
import { createStory } from './storiesFactory';

const stories = [
  {
    story: createStory()
      .withBackgroundImage(url1, 'zoom-in')
      .withTextSegment('First story', 30, 180, 'fade')
      .withPublishDate('2024-03-15')
      .withTags('#News')
      .withCopyright('© 2024')
      .build(),
    durationInFrames: 240,
    transition: 'fade',
    transitionDuration: 20,
  },
  {
    story: createStory()
      .withBackgroundImage(url2, 'zoom-out')
      .withTextSegment('Second story', 30, 180, 'slide')
      .withPublishDate('2024-03-15')
      .withTags('#News')
      .withCopyright('© 2024')
      .build(),
    durationInFrames: 240,
    transition: 'slide-left',
    transitionDuration: 25,
  },
];

<MultiStory stories={stories} />
```

### Transition Types

- **fade**: Smooth fade in/out
- **slide-left**: Slide from right to left
- **slide-right**: Slide from left to right
- **zoom**: Zoom in on entry, zoom out on exit
- **none**: Instant cut (no transition)

## Animation Options

### Background Animations

- **zoom-in**: Gradually zooms into the background image
- **zoom-out**: Gradually zooms out from the background image
- **fade**: Fades in and out
- **none**: No animation

### Text Animations

- **fade**: Smooth fade in and out effect
- **slide**: Slides in from bottom with spring animation
- **typing**: Typewriter effect
- **none**: No animation

## Customization

### Video Duration

The default video duration is 300 frames (10 seconds at 30 fps). You can adjust this in `src/index.tsx`:

```tsx
durationInFrames={300}  // 10 seconds at 30 fps
fps={30}
```

### Video Dimensions

The video is set to 1080x1920 (9:16 aspect ratio) for vertical stories:

```tsx
width={1080}
height={1920}
```

### Text Timing

Control when text appears and how long it stays on screen:

```tsx
{
  text: 'Your text here',
  startFrame: 30,        // Appears at 1 second (30 frames / 30 fps)
  durationInFrames: 90,  // Stays for 3 seconds
  animation: 'fade',
}
```

### Styling

You can customize the styling by modifying the components in `src/components/NewsStory.tsx`:

- Text size, color, and font
- Tag colors and styling
- Date display format and position
- Copyright text appearance
- Background overlay gradients

## Quote Module

The Quote Module is a complete solution for creating short quote videos. See [QUOTE_MODULE.md](QUOTE_MODULE.md) for full documentation.

### Quick Example

```typescript
import { createQuote } from './quote';

const myQuote = createQuote()
  .withQuote('The only way to do great work is to love what you do.')
  .withAuthor('Steve Jobs')
  .withBackgroundImage('https://example.com/image.jpg', 'zoom-in')
  .withStories('Motivation', 'Success')
  .build();
```

### Pre-built Quote Examples

The module includes 7 ready-to-use quotes:
- Motivational Quote (Steve Jobs)
- Wisdom Quote (Robert Frost)
- Success Quote (Winston Churchill)
- Inspiration Quote (Theodore Roosevelt)
- Happiness Quote (Dalai Lama)
- Simple Quote (Oscar Wilde)
- Quote with Audio (Henry Wadsworth Longfellow)

All are available in the Remotion Studio when you run `npm run dev`.

### Quote Module Features

- **Builder Pattern**: Fluent API for creating quotes
- **Background Support**: Both images and videos
- **Audio Support**: Add background music
- **Animations**: zoom-in, zoom-out, fade, pan
- **Automatic Duration**: Calculates optimal video length
- **Stories/Tags**: Add categories to quotes
- **Validation**: Zod schema validation

For more details, see [QUOTE_QUICKSTART.md](QUOTE_QUICKSTART.md).

## Scripts

- `npm run dev` - Start Remotion Studio for development
- `npm run build` - Render video to MP4
- `npm run preview` - Preview the video
- `npm run format` - Format code with Prettier
- `npm run type-check` - Check TypeScript types

## Technology Stack

- **Remotion**: Video creation framework
- **React**: UI library
- **TypeScript**: Type-safe development
- **Prettier**: Code formatting

## License

ISC