import { NewsStoryProps } from './components/NewsStory';

/**
 * Example configurations for different types of news stories
 */

// Example 1: World News with Zoom-In Effect
export const worldNewsExample: NewsStoryProps = {
  backgroundImages: [
    {
      url: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1080&h=1920&fit=crop',
      animation: 'zoom-in',
    },
  ],
  textSegments: [
    {
      text: 'Breaking News: Thị trường tài chính toàn cầu đang có những biến động mạnh mẽ',
      startFrame: 30,
      durationInFrames: 90,
      animation: 'fade',
    },
    {
      text: 'Các chuyên gia khuyến nghị nhà đầu tư cần thận trọng trong thời gian tới',
      startFrame: 130,
      durationInFrames: 90,
      animation: 'slide',
    },
  ],
  publishDate: '2024-03-15',
  tags: ['#ThếGiới', '#KinhTế', '#TàiChính'],
  copyright: '© 2024 News Agency. All rights reserved.',
};

// Example 2: Technology News with Typing Effect
export const techNewsExample: NewsStoryProps = {
  backgroundImages: [
    {
      url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1080&h=1920&fit=crop',
      animation: 'zoom-out',
    },
  ],
  textSegments: [
    {
      text: 'Công nghệ AI mới đột phá: ChatGPT-5 được công bố chính thức',
      startFrame: 20,
      durationInFrames: 100,
      animation: 'typing',
    },
    {
      text: 'Sự thay đổi lớn trong cách chúng ta làm việc và học tập',
      startFrame: 130,
      durationInFrames: 80,
      animation: 'fade',
    },
  ],
  publishDate: '2024-03-20',
  tags: ['#CôngNghệ', '#AI', '#TươngLai'],
  copyright: '© 2024 Tech News. All rights reserved.',
};

// Example 3: Sports News with Multiple Images
export const sportsNewsExample: NewsStoryProps = {
  backgroundImages: [
    {
      url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1080&h=1920&fit=crop',
      animation: 'fade',
    },
  ],
  textSegments: [
    {
      text: 'Đội tuyển Việt Nam giành chiến thắng lịch sử!',
      startFrame: 25,
      durationInFrames: 80,
      animation: 'slide',
    },
    {
      text: 'HLV Park Hang-seo: "Đây là nỗ lực của cả đội"',
      startFrame: 115,
      durationInFrames: 80,
      animation: 'fade',
    },
    {
      text: 'Người hâm mộ tràn xuống đường ăn mừng',
      startFrame: 205,
      durationInFrames: 70,
      animation: 'slide',
    },
  ],
  publishDate: '2024-03-18',
  tags: ['#ThểThao', '#BóngĐá', '#ViệtNam'],
  copyright: '© 2024 Sports Network. All rights reserved.',
};

// Example 4: Simple News without Animations
export const simpleNewsExample: NewsStoryProps = {
  backgroundImages: [
    {
      url: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1080&h=1920&fit=crop',
      animation: 'none',
    },
  ],
  textSegments: [
    {
      text: 'Thông báo quan trọng từ Chính phủ về chính sách mới',
      startFrame: 40,
      durationInFrames: 220,
      animation: 'none',
    },
  ],
  publishDate: '2024-03-22',
  tags: ['#ChínhTrị', '#ChínhSách', '#ThôngBáo'],
  copyright: '© 2024 Government Press. All rights reserved.',
};
