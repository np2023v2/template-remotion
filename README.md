# Template Remotion - News Stories Video

A Remotion template for creating vertical (9:16 aspect ratio) news stories videos with animations, similar to Instagram/Facebook Stories format.

## 📚 Documentation

- **[Quick Start Guide](QUICKSTART.md)** - Get started in 5 minutes
- **[Advanced Usage](ADVANCED.md)** - Detailed customization guide
- **[Architecture](ARCHITECTURE.md)** - Component structure and technical details

## Features

- ✅ **Vertical format (9:16)**: Optimized for social media stories
- ✅ **Background images with animations**: Support for zoom-in, zoom-out, and fade effects
- ✅ **Animated text segments**: Multiple text animations (fade, slide, typing)
- ✅ **Publication date display**: Shows date in top-left corner
- ✅ **Tags support**: Display multiple tags with animations
- ✅ **Copyright line**: Configurable copyright text
- ✅ **Fully configurable**: All aspects can be customized via props

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