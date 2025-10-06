# Advanced Usage Guide

## Customizing Your News Story Video

### Animation Timing

Each frame in Remotion represents a single frame of video. The timing depends on your FPS (frames per second) setting.

**Formula**: `time_in_seconds = frames / fps`

Example with 30 fps:
- 30 frames = 1 second
- 90 frames = 3 seconds
- 300 frames = 10 seconds

### Background Image Animations

#### Zoom In
Creates a subtle zoom-in effect throughout the video:
```typescript
{
  url: 'your-image-url.jpg',
  animation: 'zoom-in'
}
```

#### Zoom Out
Creates a zoom-out effect:
```typescript
{
  url: 'your-image-url.jpg',
  animation: 'zoom-out'
}
```

#### Fade
Fades the image in and out:
```typescript
{
  url: 'your-image-url.jpg',
  animation: 'fade'
}
```

#### None
Static background without animation:
```typescript
{
  url: 'your-image-url.jpg',
  animation: 'none'
}
```

### Text Animations

#### Fade
Smooth fade in and out effect:
```typescript
{
  text: 'Your news headline',
  startFrame: 30,
  durationInFrames: 90,
  animation: 'fade'
}
```

#### Slide
Slides in from bottom with spring physics:
```typescript
{
  text: 'Your news headline',
  startFrame: 30,
  durationInFrames: 90,
  animation: 'slide'
}
```

#### Typing
Typewriter effect that types out the text:
```typescript
{
  text: 'Your news headline',
  startFrame: 30,
  durationInFrames: 120,  // Give more time for typing
  animation: 'typing'
}
```

#### None
Text appears instantly without animation:
```typescript
{
  text: 'Your news headline',
  startFrame: 30,
  durationInFrames: 90,
  animation: 'none'
}
```

## Using Multiple Text Segments

You can show multiple text segments sequentially. Make sure they don't overlap:

```typescript
textSegments: [
  {
    text: 'First headline',
    startFrame: 30,
    durationInFrames: 90,
    animation: 'fade',
  },
  {
    text: 'Second headline',
    startFrame: 130,  // Starts after first ends (30 + 90 + 10 gap)
    durationInFrames: 90,
    animation: 'slide',
  },
  {
    text: 'Final message',
    startFrame: 230,
    durationInFrames: 60,
    animation: 'typing',
  },
]
```

## Date Formatting

The date is automatically formatted using Vietnamese locale. You can change the format by modifying the `DateDisplay` component:

```typescript
new Date(date).toLocaleDateString('vi-VN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})
```

For other locales:
- English: `'en-US'`
- French: `'fr-FR'`
- Japanese: `'ja-JP'`

## Tags Styling

Tags appear at the bottom of the video with a staggered animation. To customize:

1. **Change tag colors**: Edit the `backgroundColor` in `TagsDisplay` component
2. **Change animation delay**: Modify `const delay = index * 5;`
3. **Change position**: Edit the `bottom` style property

## Copyright Text

The copyright appears near the end of the video. To change when it appears:

```typescript
const opacity = interpolate(
  frame,
  [durationInFrames - 60, durationInFrames - 40],  // Appears 60 frames before end
  [0, 1],
  // ...
);
```

## Image Sources

### Using Local Images

1. Place images in `public/images/` folder
2. Reference them in your config:
```typescript
backgroundImages: [
  {
    url: '/images/your-image.jpg',
    animation: 'zoom-in'
  }
]
```

### Using External URLs

You can use any publicly accessible image URL:
```typescript
backgroundImages: [
  {
    url: 'https://example.com/image.jpg',
    animation: 'zoom-in'
  }
]
```

### Using Unsplash

For development, you can use Unsplash URLs with size parameters:
```typescript
url: 'https://images.unsplash.com/photo-PHOTO_ID?w=1080&h=1920&fit=crop'
```

## Rendering Options

### Preview in Studio
```bash
npm run dev
```

### Render Full Video
```bash
npm run build
```

### Render with Custom Settings
```bash
npx remotion render src/index.tsx NewsStory out/custom.mp4 --codec h264
```

### Render Only Part of Video
```bash
npx remotion render src/index.tsx NewsStory out/clip.mp4 --frames=60-120
```

### Render in Higher Quality
```bash
npx remotion render src/index.tsx NewsStory out/hq.mp4 --quality=100
```

## Creating Multiple Compositions

You can create multiple video variants in the same project:

```typescript
// src/index.tsx
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="WorldNews"
        component={NewsStory as any}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={worldNewsExample}
      />
      <Composition
        id="TechNews"
        component={NewsStory as any}
        durationInFrames={240}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={techNewsExample}
      />
    </>
  );
};
```

Then render specific compositions:
```bash
npx remotion render src/index.tsx WorldNews out/world-news.mp4
npx remotion render src/index.tsx TechNews out/tech-news.mp4
```

## Performance Tips

1. **Use JPEG images** instead of PNG when possible (smaller file size)
2. **Optimize image dimensions**: Use 1080x1920 or similar vertical ratios
3. **Limit text segments**: 2-4 segments work best for short stories
4. **Keep videos short**: 10-15 seconds is optimal for social media stories

## Troubleshooting

### Text appears too small on mobile
The text is sized for 1080x1920. To adjust, modify the `fontSize` in `TextLayer`.

### Animation feels too fast/slow
Adjust the `durationInFrames` for each text segment or change the overall video FPS.

### Background image doesn't fit
Use `objectFit: 'cover'` (default) to fill the frame, or `'contain'` to fit the entire image.

### Colors look different after rendering
This is normal. Use the `--image-format=jpeg` flag when rendering for consistent colors.
