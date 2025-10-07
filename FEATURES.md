# New Features Guide

This document describes the new features added to fix the textSegments display issue and enhance the template with validation, factory pattern, and multi-story support.

## 🐛 Bug Fix: TextSegments Display Issue

### Problem
When using multiple textSegments, they were not displaying properly. The animations appeared broken or segments didn't show at all.

### Root Cause
The `TextLayer` component was receiving a `startFrame` prop and subtracting it from the current frame. However, since the component was already inside a `Sequence` that starts at `startFrame`, the frame counter was already 0-based. This caused negative `localFrame` values and broke all animations.

### Solution
Removed the redundant `startFrame` prop and subtraction. The `Sequence` component already handles the frame offset, so the `TextLayer` now uses the frame directly.

**Before:**
```tsx
<Sequence from={segment.startFrame} durationInFrames={segment.durationInFrames}>
  <TextLayer segment={segment} startFrame={segment.startFrame} />
</Sequence>

// Inside TextLayer:
const localFrame = frame - startFrame; // ❌ Double subtraction!
```

**After:**
```tsx
<Sequence from={segment.startFrame} durationInFrames={segment.durationInFrames}>
  <TextLayer segment={segment} />
</Sequence>

// Inside TextLayer:
const localFrame = frame; // ✅ Correct!
```

### Testing
The `MultiSegmentTest` composition demonstrates the fix with 4 text segments displaying correctly at different times.

## ✨ Feature: Zod Schema Validation

### Overview
Added Zod schemas for runtime type validation with helpful error messages.

### Schemas Defined

```typescript
import { z } from 'zod';

// Background image schema
export const backgroundImageSchema = z.object({
  url: z.string().url('Invalid image URL'),
  animation: z.enum(['zoom-in', 'zoom-out', 'fade', 'none']).optional(),
});

// Text segment schema
export const textSegmentSchema = z.object({
  text: z.string().min(1, 'Text cannot be empty'),
  startFrame: z.number().int().nonnegative('Start frame must be non-negative'),
  durationInFrames: z.number().int().positive('Duration must be positive'),
  animation: z.enum(['fade', 'slide', 'typing', 'none']).optional(),
});

// News story props schema
export const newsStoryPropsSchema = z.object({
  backgroundImages: z.array(backgroundImageSchema).min(1, 'At least one background image is required'),
  textSegments: z.array(textSegmentSchema).min(1, 'At least one text segment is required'),
  publishDate: z.string().min(1, 'Publish date is required'),
  tags: z.array(z.string()).min(1, 'At least one tag is required'),
  copyright: z.string().min(1, 'Copyright text is required'),
});
```

### Validation in Component

The `NewsStory` component automatically validates props and shows clear error messages if validation fails:

```tsx
export const NewsStory: React.FC<NewsStoryProps> = (props) => {
  const validationResult = newsStoryPropsSchema.safeParse(props);

  if (!validationResult.success) {
    return (
      <AbsoluteFill>
        <h1>Validation Error</h1>
        {validationResult.error.errors.map((err) => (
          <div>{err.path.join('.')}: {err.message}</div>
        ))}
      </AbsoluteFill>
    );
  }

  // ... render story
};
```

### Benefits

- **Type Safety**: Runtime validation in addition to TypeScript types
- **Clear Errors**: Helpful error messages point to exactly what's wrong
- **Validation**: Prevents invalid data from causing runtime errors
- **Documentation**: Schema serves as executable documentation

## 🏭 Feature: Stories Factory

### Overview
A fluent builder API for creating news stories with automatic validation.

### Basic Usage

```typescript
import { createStory } from './storiesFactory';

const story = createStory()
  .withBackgroundImage(
    'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1080&h=1920',
    'zoom-in'
  )
  .withTextSegment('Breaking News: Important update', 30, 90, 'fade')
  .withTextSegment('More details coming soon', 130, 90, 'slide')
  .withPublishDate('2024-03-15')
  .withTags('#News', '#Breaking', '#Update')
  .withCopyright('© 2024 News Agency')
  .build();
```

### API Reference

#### `createStory(): StoryBuilder`
Creates a new story builder instance.

#### `withBackgroundImage(url: string, animation?: 'zoom-in' | 'zoom-out' | 'fade' | 'none'): StoryBuilder`
Adds a background image to the story.
- **url**: Image URL (must be valid URL)
- **animation**: Optional animation type (default: 'none')

#### `withTextSegment(text: string, startFrame: number, durationInFrames: number, animation?: 'fade' | 'slide' | 'typing' | 'none'): StoryBuilder`
Adds a text segment to the story.
- **text**: Text to display (cannot be empty)
- **startFrame**: Frame when text appears (must be non-negative)
- **durationInFrames**: How long text stays visible (must be positive)
- **animation**: Optional animation type (default: 'fade')

#### `withPublishDate(date: string): StoryBuilder`
Sets the publication date.
- **date**: Date string (e.g., '2024-03-15')

#### `withTags(...tags: string[]): StoryBuilder`
Adds tags to the story.
- **tags**: One or more tag strings (e.g., '#News', '#Breaking')

#### `withCopyright(copyright: string): StoryBuilder`
Sets the copyright text.
- **copyright**: Copyright string (e.g., '© 2024 Company')

#### `build(): NewsStoryProps`
Builds and validates the story. Throws an error if validation fails.

### Advanced: Template-Based Creation

```typescript
import { createStoryFromTemplate } from './storiesFactory';

const baseTemplate = {
  publishDate: '2024-03-15',
  tags: ['#News'],
  copyright: '© 2024 News Agency',
};

const story = createStoryFromTemplate(baseTemplate)
  .withBackgroundImage(url, 'zoom-in')
  .withTextSegment('Custom headline', 30, 90, 'fade')
  .build();
```

### Validation Utility

```typescript
import { validateStory } from './storiesFactory';

const result = validateStory(someData);
if (result.valid) {
  console.log('Story is valid!');
} else {
  console.error('Validation errors:', result.errors);
}
```

## 🎬 Feature: Multi-Story Component

### Overview
The `MultiStory` component allows you to combine multiple stories into a single video with smooth transitions between them.

### Basic Usage

```typescript
import { MultiStory } from './components/MultiStory';

const stories = [
  {
    story: storyData1,
    durationInFrames: 240,
    transition: 'fade',
    transitionDuration: 20,
  },
  {
    story: storyData2,
    durationInFrames: 240,
    transition: 'slide-left',
    transitionDuration: 25,
  },
];

<Composition
  id="MultiStoryVideo"
  component={MultiStory}
  durationInFrames={480}  // Sum of all story durations
  fps={30}
  width={1080}
  height={1920}
  defaultProps={{ stories }}
/>
```

### Transition Types

#### `fade`
Smooth opacity transition in and out.
- Entry: Fades from 0 to 1
- Exit: Fades from 1 to 0

#### `slide-left`
Slides in from right and out to left.
- Entry: Translates from 100% to 0%
- Exit: Translates from 0% to -100%

#### `slide-right`
Slides in from left and out to right.
- Entry: Translates from -100% to 0%
- Exit: Translates from 0% to 100%

#### `zoom`
Zooms in on entry and out on exit.
- Entry: Scales from 0.8 to 1.0 with fade
- Exit: Scales from 1.0 to 1.2 with fade

#### `none`
No transition, instant cut between stories.

### Transition Duration
Each transition has an entry and exit phase:
- **Entry**: First N frames of the story
- **Exit**: Last N frames of the story
- **transitionDuration**: Number of frames for each phase (default: 15)

Example with 20-frame transitions:
- Frames 0-20: Entry transition
- Frames 20-220: Story content (fully visible)
- Frames 220-240: Exit transition

### Complete Example

```typescript
import { createStory } from './storiesFactory';
import { MultiStory } from './components/MultiStory';

// Create stories using factory
const story1 = createStory()
  .withBackgroundImage('url1', 'zoom-in')
  .withTextSegment('First headline', 30, 150, 'fade')
  .withPublishDate('2024-03-15')
  .withTags('#Breaking')
  .withCopyright('© 2024')
  .build();

const story2 = createStory()
  .withBackgroundImage('url2', 'fade')
  .withTextSegment('Second headline', 30, 150, 'slide')
  .withPublishDate('2024-03-15')
  .withTags('#Update')
  .withCopyright('© 2024')
  .build();

// Combine into multi-story
const multiStoryConfig = [
  {
    story: story1,
    durationInFrames: 240,
    transition: 'fade',
    transitionDuration: 20,
  },
  {
    story: story2,
    durationInFrames: 240,
    transition: 'slide-left',
    transitionDuration: 25,
  },
];

// Use in composition
<Composition
  id="NewsReel"
  component={MultiStory}
  durationInFrames={480}
  fps={30}
  width={1080}
  height={1920}
  defaultProps={{ stories: multiStoryConfig }}
/>
```

## 📦 Pre-built Examples

The template now includes several pre-built compositions demonstrating all features:

### Single Stories (Factory-built)
- **BreakingNews**: Breaking news with fade transition (240 frames)
- **TechNews**: Technology news with typing effect (240 frames)
- **SportsNews**: Sports news with multiple segments (300 frames)
- **MultiSegmentTest**: Test with 4 text segments (330 frames) - demonstrates the bug fix

### Multi-Story Compositions
- **MultiStory**: 3 stories with different transitions (780 frames / 26 seconds)
  - Breaking news (fade transition)
  - Tech news (slide-left transition)
  - Sports news (zoom transition)

- **QuickNews**: 3 quick stories in succession (540 frames / 18 seconds)
  - Story 1 (slide-right transition)
  - Story 2 (slide-left transition)
  - Story 3 (fade transition)

## 🚀 Getting Started

### Using the Factory

```typescript
// Create a simple story
const myStory = createStory()
  .withBackgroundImage('https://example.com/image.jpg', 'zoom-in')
  .withTextSegment('Your headline here', 30, 180, 'fade')
  .withPublishDate('2024-03-15')
  .withTags('#YourTag')
  .withCopyright('© 2024 Your Company')
  .build();
```

### Using Multi-Story

```typescript
// Combine multiple stories
import { multiStoryExample } from './factoryExamples';

// Already configured with 3 stories and transitions
// Use in composition or create your own
```

### Testing Multiple Text Segments

```typescript
// Add as many text segments as you need
const story = createStory()
  .withBackgroundImage(url, 'none')
  .withTextSegment('Segment 1', 30, 60, 'fade')
  .withTextSegment('Segment 2', 100, 60, 'slide')
  .withTextSegment('Segment 3', 170, 60, 'typing')
  .withTextSegment('Segment 4', 240, 60, 'fade')
  .withPublishDate('2024-03-15')
  .withTags('#Test')
  .withCopyright('© 2024')
  .build();

// All segments will display correctly!
```

## 📝 Migration Guide

### Updating Existing Stories

If you have existing story configurations, you can either:

1. **Keep using the direct approach** (still works):
```typescript
const story: NewsStoryProps = {
  backgroundImages: [...],
  textSegments: [...],
  // ...
};
```

2. **Migrate to factory** (recommended):
```typescript
const story = createStoryFromTemplate(existingStory).build();
```

### Enabling Validation

Validation is automatic in the `NewsStory` component. If you need to validate manually:

```typescript
import { validateStory } from './storiesFactory';

const result = validateStory(myStoryData);
if (!result.valid) {
  console.error(result.errors);
}
```

## 🎯 Best Practices

1. **Use the factory** for type safety and validation
2. **Plan your timing** - ensure text segments don't overlap unless intended
3. **Choose appropriate transitions** - match the mood of your content
4. **Test with MultiSegmentTest** - verify all segments display correctly
5. **Keep transition durations balanced** - too long feels slow, too short feels jarring

## 🔍 Troubleshooting

### Text segments not showing
✅ **Fixed!** This issue has been resolved. All text segments now display correctly.

### Validation errors
Check the error messages - they point to exactly what needs to be fixed.

### Transitions feel wrong
Adjust `transitionDuration` - try 15-30 frames for most cases.

### Stories too long/short
Adjust `durationInFrames` for each story and update the total composition duration.

## 📚 Further Reading

- [Remotion Documentation](https://www.remotion.dev/docs)
- [Zod Documentation](https://zod.dev)
- [Architecture Guide](./ARCHITECTURE.md)
- [Advanced Usage](./ADVANCED.md)
