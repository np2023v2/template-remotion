import { createQuote } from './quoteBuilder';

/**
 * Pre-built quote examples using the factory pattern
 */

// Motivational Quote
export const motivationalQuote = createQuote()
  .withQuote(
    "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle."
  )
  .withAuthor('Steve Jobs')
  .withBackgroundImage(
    'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1080&h=1920',
    'zoom-in'
  )
  .withStories('Motivation', 'Success', 'Career')
  .build();

// Wisdom Quote
export const wisdomQuote = createQuote()
  .withQuote(
    "In three words I can sum up everything I've learned about life: it goes on."
  )
  .withAuthor('Robert Frost')
  .withBackgroundImage(
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1920',
    'fade'
  )
  .withStories('Wisdom', 'Life', 'Philosophy')
  .build();

// Success Quote
export const successQuote = createQuote()
  .withQuote(
    'Success is not final, failure is not fatal: it is the courage to continue that counts.'
  )
  .withAuthor('Winston Churchill')
  .withBackgroundImage(
    'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=1080&h=1920',
    'pan'
  )
  .withStories('Success', 'Courage', 'Perseverance')
  .build();

// Inspiration Quote
export const inspirationQuote = createQuote()
  .withQuote(
    "Believe you can and you're halfway there. The future belongs to those who believe in the beauty of their dreams."
  )
  .withAuthor('Theodore Roosevelt')
  .withBackgroundImage(
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1080&h=1920',
    'zoom-out'
  )
  .withStories('Inspiration', 'Dreams', 'Belief')
  .build();

// Happiness Quote
export const happinessQuote = createQuote()
  .withQuote(
    'Happiness is not something ready made. It comes from your own actions.'
  )
  .withAuthor('Dalai Lama')
  .withBackgroundImage(
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1080&h=1920',
    'fade'
  )
  .withStories('Happiness', 'Mindfulness', 'Peace')
  .build();

// Simple Quote (for testing)
export const simpleQuote = createQuote()
  .withQuote('Be yourself; everyone else is already taken.')
  .withAuthor('Oscar Wilde')
  .withBackgroundImage(
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1920',
    'none'
  )
  .withStories('Life', 'Authenticity')
  .build();

// Quote with audio example (placeholder URL)
export const quoteWithAudio = createQuote()
  .withQuote('Music is the universal language of mankind.')
  .withAuthor('Henry Wadsworth Longfellow')
  .withBackgroundImage(
    'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1080&h=1920',
    'zoom-in'
  )
  .withAudio('https://cdn.pixabay.com/audio/2022/03/10/audio_d1718ab41b.mp3')
  .withStories('Music', 'Art', 'Culture')
  .build();
