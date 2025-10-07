/**
 * Quote Module - Main exports
 *
 * This module provides everything needed to create quote videos:
 * - Quote component for rendering
 * - QuoteBuilder for creating quote configurations
 * - Utility functions for quote handling
 * - Pre-built examples
 */

// Components
export { Quote } from './components/Quote';
export type { QuoteProps, BackgroundMedia } from './components/Quote';
export { quotePropsSchema, backgroundMediaSchema } from './components/Quote';

// Builder
export {
  createQuote,
  createQuoteFromTemplate,
  validateQuote,
} from './quoteBuilder';
export type { QuoteBuilder } from './quoteBuilder';

// Utils
export {
  calculateQuoteDuration,
  getOptimalFontSize,
  formatQuoteText,
  isValidMediaUrl,
  getAnimationDuration,
  getDefaultQuoteConfig,
} from './utils';

// Examples
export {
  motivationalQuote,
  wisdomQuote,
  successQuote,
  inspirationQuote,
  happinessQuote,
  simpleQuote,
  quoteWithAudio,
} from './examples';
