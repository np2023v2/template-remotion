import { createStory } from './storiesFactory';
import { StoryWithTransition } from './components/MultiStory';

/**
 * Example using the story factory
 */

// Example 1: Breaking news story
export const breakingNewsStory = createStory()
  .withBackgroundImage(
    'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1080&h=1920&fit=crop',
    'zoom-in'
  )
  .withTextSegment('Breaking News: Tin khẩn cấp từ thế giới', 30, 90, 'fade')
  .withTextSegment(
    'Các chuyên gia đang theo dõi sát sao diễn biến',
    130,
    90,
    'slide'
  )
  .withPublishDate('2024-03-15')
  .withTags('#Breaking', '#World', '#News')
  .withCopyright('© 2024 News Agency')
  .build();

// Example 2: Tech news story
export const techNewsStory = createStory()
  .withBackgroundImage(
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1080&h=1920&fit=crop',
    'zoom-out'
  )
  .withTextSegment(
    'AI Revolution: Công nghệ thay đổi cuộc sống',
    20,
    100,
    'typing'
  )
  .withTextSegment('Các công ty công nghệ đầu tư mạnh vào AI', 130, 80, 'fade')
  .withPublishDate('2024-03-20')
  .withTags('#Tech', '#AI', '#Innovation')
  .withCopyright('© 2024 Tech News')
  .build();

// Example 3: Sports news story
export const sportsNewsStory = createStory()
  .withBackgroundImage(
    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1080&h=1920&fit=crop',
    'fade'
  )
  .withTextSegment(
    'Chiến thắng lịch sử cho đội tuyển Việt Nam!',
    25,
    80,
    'slide'
  )
  .withTextSegment('Toàn đội đã nỗ lực hết mình', 115, 80, 'fade')
  .withTextSegment('Người hâm mộ tràn xuống đường ăn mừng', 205, 70, 'slide')
  .withPublishDate('2024-03-18')
  .withTags('#Sports', '#Football', '#Vietnam')
  .withCopyright('© 2024 Sports Network')
  .build();

// Example 4: Multi-segment news story (testing multiple text segments)
export const multiSegmentStory = createStory()
  .withBackgroundImage(
    'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1080&h=1920&fit=crop',
    'none'
  )
  .withTextSegment('Segment 1: Tin tức đầu tiên', 30, 60, 'fade')
  .withTextSegment('Segment 2: Tin tức thứ hai', 100, 60, 'slide')
  .withTextSegment('Segment 3: Tin tức thứ ba', 170, 60, 'typing')
  .withTextSegment('Segment 4: Tin tức thứ tư', 240, 60, 'fade')
  .withPublishDate('2024-03-22')
  .withTags('#Test', '#MultiSegment')
  .withCopyright('© 2024 Test News')
  .build();

/**
 * Multi-story examples with transitions
 */

// Example: Three stories with different transitions
export const multiStoryExample: StoryWithTransition[] = [
  {
    story: breakingNewsStory,
    durationInFrames: 240,
    transition: 'fade',
    transitionDuration: 20,
  },
  {
    story: techNewsStory,
    durationInFrames: 240,
    transition: 'slide-left',
    transitionDuration: 25,
  },
  {
    story: sportsNewsStory,
    durationInFrames: 300,
    transition: 'zoom',
    transitionDuration: 30,
  },
];

// Example: Quick succession of news with slide transitions
export const quickNewsExample: StoryWithTransition[] = [
  {
    story: createStory()
      .withBackgroundImage(
        'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1080&h=1920&fit=crop',
        'zoom-in'
      )
      .withTextSegment('Tin nóng thứ nhất', 20, 140, 'fade')
      .withPublishDate('2024-03-15')
      .withTags('#News', '#Quick')
      .withCopyright('© 2024 News')
      .build(),
    durationInFrames: 180,
    transition: 'slide-right',
    transitionDuration: 15,
  },
  {
    story: createStory()
      .withBackgroundImage(
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1080&h=1920&fit=crop',
        'fade'
      )
      .withTextSegment('Tin nóng thứ hai', 20, 140, 'slide')
      .withPublishDate('2024-03-15')
      .withTags('#News', '#Quick')
      .withCopyright('© 2024 News')
      .build(),
    durationInFrames: 180,
    transition: 'slide-left',
    transitionDuration: 15,
  },
  {
    story: createStory()
      .withBackgroundImage(
        'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1080&h=1920&fit=crop',
        'zoom-out'
      )
      .withTextSegment('Tin nóng thứ ba', 20, 140, 'typing')
      .withPublishDate('2024-03-15')
      .withTags('#News', '#Quick')
      .withCopyright('© 2024 News')
      .build(),
    durationInFrames: 180,
    transition: 'fade',
    transitionDuration: 15,
  },
];
