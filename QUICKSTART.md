# Quick Start Guide

Get started with your first news story video in 5 minutes!

## 1. Install Dependencies

```bash
npm install
```

## 2. Start Development Server

```bash
npm run dev
```

This opens Remotion Studio at http://localhost:3000

## 3. Preview Your Video

In the Remotion Studio, you'll see:
- A real-time preview of your video
- Timeline controls to scrub through frames
- Play/pause buttons
- The ability to adjust playback speed

## 4. Switch Templates

Edit `src/config.ts` to change between different story templates:

```typescript
// Change this line to use a different template
export const activeConfig = worldNewsExample;  // Try: techNewsExample, sportsNewsExample
```

## 5. Customize Your Story

Edit the active configuration in `src/config.ts`:

```typescript
export const activeConfig = {
  // Background image with animation
  backgroundImages: [
    {
      url: 'https://your-image-url.jpg',
      animation: 'zoom-in',  // Options: 'zoom-in', 'zoom-out', 'fade', 'none'
    },
  ],
  
  // Text that appears in the video
  textSegments: [
    {
      text: 'Your first headline',
      startFrame: 30,           // Starts at 1 second (30 fps)
      durationInFrames: 90,     // Lasts 3 seconds
      animation: 'fade',        // Options: 'fade', 'slide', 'typing', 'none'
    },
    {
      text: 'Your second headline',
      startFrame: 130,          // Starts at 4.3 seconds
      durationInFrames: 90,
      animation: 'slide',
    },
  ],
  
  // Publication date (shown in top-left)
  publishDate: '2024-03-15',
  
  // Tags (shown at bottom)
  tags: ['#News', '#Breaking', '#World'],
  
  // Copyright text (shown at end)
  copyright: '© 2024 Your Company. All rights reserved.',
};
```

## 6. Render Video

When you're happy with the preview, render the final video:

```bash
npm run build
```

Your video will be saved to `out/video.mp4`

## Common Customizations

### Change Video Duration

In `src/index.tsx`, modify:
```typescript
durationInFrames={300}  // 300 frames = 10 seconds at 30 fps
```

### Change Frame Rate

In `src/index.tsx`, modify:
```typescript
fps={30}  // Try 24, 30, or 60
```

### Use Local Images

1. Place images in `public/images/`
2. Reference them: `url: '/images/my-photo.jpg'`

### Adjust Text Timing

Calculate frames: `seconds × fps = frames`

Example at 30 fps:
- 1 second = 30 frames
- 2.5 seconds = 75 frames
- 5 seconds = 150 frames

## Need More Help?

- See `README.md` for full documentation
- See `ADVANCED.md` for advanced usage
- Check `src/examples.ts` for more example configurations

## Tips

✅ Save your work frequently - the dev server auto-reloads
✅ Use the timeline to check text timing
✅ Test with different images to see animations
✅ Keep videos under 15 seconds for social media
✅ Use high-quality images (1080x1920 or larger)
