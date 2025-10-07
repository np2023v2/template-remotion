# Quote Module Quick Start

Get started with the Quote Module in 5 minutes!

## 1. Installation

The quote module is already included in this project. Just install dependencies:

```bash
npm install
```

## 2. Start Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## 3. Choose a Quote Composition

You'll see several quote compositions:
- MotivationalQuote
- WisdomQuote
- SuccessQuote
- InspirationQuote
- HappinessQuote
- SimpleQuote
- QuoteWithAudio

Click any one to preview it!

## 4. Create Your First Custom Quote

Edit `src/quote/config.ts`:

```typescript
import { createQuote } from './quoteBuilder';

export const activeQuoteConfig = createQuote()
  .withQuote('Your inspiring quote here')
  .withAuthor('Your Name')
  .withBackgroundImage('https://example.com/your-image.jpg', 'fade')
  .withStories('YourTag1', 'YourTag2')
  .build();
```

## 5. Add Your Quote to index.tsx

Edit `src/index.tsx` and add:

```typescript
import { activeQuoteConfig } from './quote/config';
import { calculateQuoteDuration } from './quote';

// Inside RemotionRoot component, add:
<Composition
  id="MyCustomQuote"
  component={Quote as any}
  durationInFrames={calculateQuoteDuration(
    activeQuoteConfig.quote,
    activeQuoteConfig.author,
    30
  )}
  fps={30}
  width={1080}
  height={1920}
  defaultProps={activeQuoteConfig}
/>
```

## 6. Preview Your Quote

Refresh the browser and select "MyCustomQuote" from the composition list.

## 7. Render to Video

```bash
npx remotion render src/index.tsx MyCustomQuote out/my-quote.mp4
```

Your video will be saved to `out/my-quote.mp4`!

## Common Tasks

### Change Background Image

```typescript
.withBackgroundImage('https://your-new-image.jpg', 'zoom-in')
```

### Add Background Music

```typescript
.withAudio('https://example.com/your-music.mp3')
```

### Use Video Background

```typescript
.withBackgroundVideo('https://example.com/your-video.mp4', 'fade')
```

### Change Animation

Available animations:
- `'zoom-in'` - Zoom into image
- `'zoom-out'` - Zoom out from image
- `'fade'` - Fade in/out
- `'pan'` - Horizontal pan
- `'none'` - No animation

### Add More Stories/Tags

```typescript
.withStories('Tag1', 'Tag2', 'Tag3', 'Tag4')
```

## Tips

✅ Keep quotes under 30 words for best readability
✅ Use high-resolution images (1080x1920 minimum)
✅ Test different animations to find what works best
✅ Use `calculateQuoteDuration()` for optimal timing
✅ Add stories/tags to make quotes more discoverable

## Need Help?

- Full documentation: `/QUOTE_MODULE.md`
- Module README: `/src/quote/README.md`
- Examples: See `src/quote/examples.ts`

## Next Steps

1. **Customize styling**: Edit `src/quote/components/Quote.tsx`
2. **Create templates**: Add more examples to `src/quote/examples.ts`
3. **Batch create**: Write a script to generate multiple quotes
4. **Share**: Export and share your quote videos!

Happy quote creating! 🎉
