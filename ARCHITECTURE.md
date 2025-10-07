# Component Structure Overview

## NewsStory Component Architecture

The NewsStory component is the main component that combines all features into a vertical video story.

### Component Hierarchy

```
NewsStory (Main Container - 1080x1920)
├── BackgroundLayer (Background images with animations)
│   ├── Image element with transform animations
│   └── Gradient overlay for text readability
├── DateDisplay (Top-left corner)
│   └── Formatted date with background
├── TextLayer (Center, sequential via Sequence)
│   └── Animated text segments with various effects
├── TagsDisplay (Bottom area)
│   └── Multiple tags with staggered animations
└── CopyrightDisplay (Bottom, appears near end)
    └── Copyright text with fade-in
```

### Layer Stack (Z-Index Order)

1. **Background** (Bottom layer)
   - Image with zoom/fade animations
   - Dark gradient overlay

2. **Text Segments** (Middle layer)
   - Appears sequentially using Remotion's `<Sequence>`
   - Center-aligned with shadow for readability

3. **UI Elements** (Top layer)
   - Date (top-left)
   - Tags (bottom)
   - Copyright (bottom)

## Animation Timeline Example

For a 300-frame (10-second) video at 30 fps:

```
Frame:    0    30   90  120  130  220  240  260  300
          |     |    |    |    |    |    |    |    |
          Start                                   End
          
Date:     [Fade in--------------------------------------]
          
Text 1:         [Fade--]
                
Text 2:                      [Slide----]

Tags:                              [Stagger in---------]

Copyright:                                    [Fade in-]
```

## Props Interface

```typescript
interface NewsStoryProps {
  // Background configuration
  backgroundImages: BackgroundImage[];
  
  // Text content
  textSegments: TextSegment[];
  
  // Metadata
  publishDate: string;      // ISO date format: '2024-03-15'
  tags: string[];           // Array of tags: ['#News', '#World']
  copyright: string;        // Copyright text
}
```

## Animation Details

### Background Animations

- **zoom-in**: Scales from 1.0 to 1.2 over video duration
- **zoom-out**: Scales from 1.2 to 1.0 over video duration  
- **fade**: Opacity from 0 → 1 → 1 → 0 with 30-frame transitions
- **none**: No animation, static image

### Text Animations

- **fade**: 
  - Fade in: 15 frames
  - Display: (duration - 30) frames
  - Fade out: 15 frames

- **slide**:
  - Slides up 50px with spring physics
  - Fade timing same as above

- **typing**:
  - Types out over 70% of duration
  - Fades out in last 15 frames

- **none**: Instant display/hide

### UI Element Animations

- **Date**: Fades in over first 20 frames
- **Tags**: Each tag springs in with 5-frame stagger
- **Copyright**: Fades in 60-40 frames before end

## Styling Configuration

### Colors

- Text: `#fff` (white) with shadow
- Tags background: `rgba(0,122,255,0.8)` (iOS blue)
- Date background: `rgba(0,0,0,0.6)` (semi-transparent black)
- Background overlay: Linear gradient (dark at top/bottom)

### Typography

- Text size: 52px, weight 700
- Tag size: 28px, weight 600
- Date size: 24px, weight 600
- Copyright size: 18px
- Font family: Arial, sans-serif

### Spacing

- Date position: 40px from top, 40px from left
- Tags position: 180px from bottom
- Copyright position: 40px from bottom
- Text width: 85% of container

## Performance Considerations

1. **Image Loading**: Images load on-demand during rendering
2. **Animation Complexity**: Uses CSS transforms for hardware acceleration
3. **Text Rendering**: Simple DOM text, no canvas required
4. **Sequences**: Only active segments are rendered per frame

## Customization Points

Common customization locations in `src/components/NewsStory.tsx`:

1. **Line 37-55**: Background animation logic
2. **Line 97-151**: Text animation logic  
3. **Line 169-197**: Date display styling
4. **Line 201-251**: Tags display and animation
5. **Line 255-285**: Copyright display

## Integration Examples

### Basic Usage
```typescript
<NewsStory
  backgroundImages={[{ url: 'image.jpg', animation: 'zoom-in' }]}
  textSegments={[{ text: 'Hello', startFrame: 30, durationInFrames: 90, animation: 'fade' }]}
  publishDate="2024-03-15"
  tags={['#News']}
  copyright="© 2024"
/>
```

### With Remotion Composition
```typescript
<Composition
  id="NewsStory"
  component={NewsStory}
  durationInFrames={300}
  fps={30}
  width={1080}
  height={1920}
  defaultProps={yourProps}
/>
```

## File Structure

```
template-remotion/
├── src/
│   ├── components/
│   │   └── NewsStory.tsx      # Main component (300+ lines)
│   ├── index.tsx              # Remotion root with Composition
│   ├── examples.ts            # Pre-built example configurations
│   └── config.ts              # Active configuration selector
├── public/
│   └── images/                # Local image storage
├── out/                       # Rendered video output
├── README.md                  # Main documentation
├── QUICKSTART.md             # Quick start guide
├── ADVANCED.md               # Advanced usage guide
└── package.json              # Dependencies and scripts
```

## Dependencies

**Core:**
- `remotion`: Video framework
- `react`: UI library
- `@remotion/cli`: CLI tools

**Dev:**
- `typescript`: Type checking
- `prettier`: Code formatting

## Browser/Runtime Requirements

- Node.js 18+
- Chrome/Chromium (for rendering)
- Modern browser for Remotion Studio

## Rendering Output

- Format: MP4 (H.264)
- Resolution: 1080x1920 (9:16)
- Frame rate: 30 fps (configurable)
- Duration: 300 frames / 10 seconds (configurable)
