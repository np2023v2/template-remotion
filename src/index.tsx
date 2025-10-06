import { Composition } from 'remotion';
import { NewsStory, NewsStoryProps } from './components/NewsStory';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="NewsStory"
        component={NewsStory as any}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={
          {
            backgroundImages: [
              {
                url: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1080&h=1920&fit=crop',
                animation: 'zoom-in' as const,
              },
            ],
            textSegments: [
              {
                text: 'Breaking News: Thị trường tài chính toàn cầu đang có những biến động mạnh mẽ',
                startFrame: 30,
                durationInFrames: 90,
                animation: 'fade' as const,
              },
              {
                text: 'Các chuyên gia khuyến nghị nhà đầu tư cần thận trọng trong thời gian tới',
                startFrame: 130,
                durationInFrames: 90,
                animation: 'slide' as const,
              },
            ],
            publishDate: '2024-03-15',
            tags: ['#ThếGiới', '#KinhTế', '#TàiChính'],
            copyright: '© 2024 News Agency. All rights reserved.',
          } satisfies NewsStoryProps
        }
      />
    </>
  );
};
