import { NewsStoryProps, newsStoryPropsSchema } from './components/NewsStory';

/**
 * Story Factory for building and validating NewsStory data
 */

export interface StoryBuilder {
  withBackgroundImage(
    url: string,
    animation?: 'zoom-in' | 'zoom-out' | 'fade' | 'none'
  ): StoryBuilder;
  withTextSegment(
    text: string,
    startFrame: number,
    durationInFrames: number,
    animation?: 'fade' | 'slide' | 'typing' | 'none'
  ): StoryBuilder;
  withPublishDate(date: string): StoryBuilder;
  withTags(...tags: string[]): StoryBuilder;
  withCopyright(copyright: string): StoryBuilder;
  build(): NewsStoryProps;
}

class NewsStoryBuilder implements StoryBuilder {
  private props: Partial<NewsStoryProps> = {
    backgroundImages: [],
    textSegments: [],
    tags: [],
  };

  withBackgroundImage(
    url: string,
    animation: 'zoom-in' | 'zoom-out' | 'fade' | 'none' = 'none'
  ): StoryBuilder {
    this.props.backgroundImages!.push({ url, animation });
    return this;
  }

  withTextSegment(
    text: string,
    startFrame: number,
    durationInFrames: number,
    animation: 'fade' | 'slide' | 'typing' | 'none' = 'fade'
  ): StoryBuilder {
    this.props.textSegments!.push({
      text,
      startFrame,
      durationInFrames,
      animation,
    });
    return this;
  }

  withPublishDate(date: string): StoryBuilder {
    this.props.publishDate = date;
    return this;
  }

  withTags(...tags: string[]): StoryBuilder {
    this.props.tags = [...(this.props.tags || []), ...tags];
    return this;
  }

  withCopyright(copyright: string): StoryBuilder {
    this.props.copyright = copyright;
    return this;
  }

  build(): NewsStoryProps {
    // Validate with Zod schema
    const result = newsStoryPropsSchema.safeParse(this.props);

    if (!result.success) {
      throw new Error(
        `Invalid story configuration:\n${result.error.errors.map((e) => `  - ${e.path.join('.')}: ${e.message}`).join('\n')}`
      );
    }

    return result.data;
  }
}

/**
 * Create a new story builder
 */
export function createStory(): StoryBuilder {
  return new NewsStoryBuilder();
}

/**
 * Create a story from template with default values
 */
export function createStoryFromTemplate(
  template: Partial<NewsStoryProps>
): StoryBuilder {
  const builder = new NewsStoryBuilder();

  if (template.backgroundImages) {
    template.backgroundImages.forEach((img) => {
      builder.withBackgroundImage(img.url, img.animation);
    });
  }

  if (template.textSegments) {
    template.textSegments.forEach((seg) => {
      builder.withTextSegment(
        seg.text,
        seg.startFrame,
        seg.durationInFrames,
        seg.animation
      );
    });
  }

  if (template.publishDate) {
    builder.withPublishDate(template.publishDate);
  }

  if (template.tags) {
    builder.withTags(...template.tags);
  }

  if (template.copyright) {
    builder.withCopyright(template.copyright);
  }

  return builder;
}

/**
 * Validate story configuration
 */
export function validateStory(story: unknown): {
  valid: boolean;
  errors?: string[];
} {
  const result = newsStoryPropsSchema.safeParse(story);

  if (result.success) {
    return { valid: true };
  }

  return {
    valid: false,
    errors: result.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`),
  };
}
