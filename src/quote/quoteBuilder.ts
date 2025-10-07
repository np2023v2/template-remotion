import { QuoteProps, quotePropsSchema } from './components/Quote';

/**
 * Quote Builder for creating and validating Quote data
 */

export interface QuoteBuilder {
  withQuote(text: string): QuoteBuilder;
  withAuthor(name: string): QuoteBuilder;
  withBackgroundImage(
    url: string,
    animation?: 'zoom-in' | 'zoom-out' | 'fade' | 'pan' | 'none'
  ): QuoteBuilder;
  withBackgroundVideo(
    url: string,
    animation?: 'zoom-in' | 'zoom-out' | 'fade' | 'pan' | 'none'
  ): QuoteBuilder;
  withAudio(url: string): QuoteBuilder;
  withStories(...stories: string[]): QuoteBuilder;
  build(): QuoteProps;
}

class QuoteBuilderImpl implements QuoteBuilder {
  private props: Partial<QuoteProps> = {
    stories: [],
  };

  withQuote(text: string): QuoteBuilder {
    this.props.quote = text;
    return this;
  }

  withAuthor(name: string): QuoteBuilder {
    this.props.author = name;
    return this;
  }

  withBackgroundImage(
    url: string,
    animation: 'zoom-in' | 'zoom-out' | 'fade' | 'pan' | 'none' = 'fade'
  ): QuoteBuilder {
    this.props.backgroundMedia = { type: 'image', url, animation };
    return this;
  }

  withBackgroundVideo(
    url: string,
    animation: 'zoom-in' | 'zoom-out' | 'fade' | 'pan' | 'none' = 'none'
  ): QuoteBuilder {
    this.props.backgroundMedia = { type: 'video', url, animation };
    return this;
  }

  withAudio(url: string): QuoteBuilder {
    this.props.audioUrl = url;
    return this;
  }

  withStories(...stories: string[]): QuoteBuilder {
    this.props.stories = [...(this.props.stories || []), ...stories];
    return this;
  }

  build(): QuoteProps {
    // Validate with Zod schema
    const result = quotePropsSchema.safeParse(this.props);

    if (!result.success) {
      throw new Error(
        `Invalid quote configuration:\n${result.error.errors.map((e) => `  - ${e.path.join('.')}: ${e.message}`).join('\n')}`
      );
    }

    return result.data;
  }
}

/**
 * Create a new quote builder
 */
export function createQuote(): QuoteBuilder {
  return new QuoteBuilderImpl();
}

/**
 * Create a quote from template with default values
 */
export function createQuoteFromTemplate(
  template: Partial<QuoteProps>
): QuoteBuilder {
  const builder = new QuoteBuilderImpl();

  if (template.quote) {
    builder.withQuote(template.quote);
  }

  if (template.author) {
    builder.withAuthor(template.author);
  }

  if (template.backgroundMedia) {
    if (template.backgroundMedia.type === 'image') {
      builder.withBackgroundImage(
        template.backgroundMedia.url,
        template.backgroundMedia.animation
      );
    } else {
      builder.withBackgroundVideo(
        template.backgroundMedia.url,
        template.backgroundMedia.animation
      );
    }
  }

  if (template.audioUrl) {
    builder.withAudio(template.audioUrl);
  }

  if (template.stories) {
    builder.withStories(...template.stories);
  }

  return builder;
}

/**
 * Validate quote configuration
 */
export function validateQuote(quote: unknown): {
  valid: boolean;
  errors?: string[];
} {
  const result = quotePropsSchema.safeParse(quote);

  if (result.success) {
    return { valid: true };
  }

  return {
    valid: false,
    errors: result.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`),
  };
}
