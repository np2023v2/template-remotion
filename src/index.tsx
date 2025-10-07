import { Composition, registerRoot } from 'remotion';
import { NewsStory, NewsStoryProps } from './components/NewsStory';
import { MultiStory, MultiStoryProps } from './components/MultiStory';
import { activeConfig } from './config';
import {
  breakingNewsStory,
  techNewsStory,
  sportsNewsStory,
  multiSegmentStory,
  multiStoryExample,
  quickNewsExample,
} from './factoryExamples';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Single story composition - Original */}
      <Composition
        id="NewsStory"
        component={NewsStory as any}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={activeConfig}
      />

      {/* Single story - Breaking News (Factory) */}
      <Composition
        id="BreakingNews"
        component={NewsStory as any}
        durationInFrames={240}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={breakingNewsStory}
      />

      {/* Single story - Tech News (Factory) */}
      <Composition
        id="TechNews"
        component={NewsStory as any}
        durationInFrames={240}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={techNewsStory}
      />

      {/* Single story - Sports News (Factory) */}
      <Composition
        id="SportsNews"
        component={NewsStory as any}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={sportsNewsStory}
      />

      {/* Multi-segment test story */}
      <Composition
        id="MultiSegmentTest"
        component={NewsStory as any}
        durationInFrames={330}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={multiSegmentStory}
      />

      {/* Multi-story with transitions */}
      <Composition
        id="MultiStory"
        component={MultiStory as any}
        durationInFrames={780}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          stories: multiStoryExample,
        }}
      />

      {/* Quick news multi-story */}
      <Composition
        id="QuickNews"
        component={MultiStory as any}
        durationInFrames={540}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          stories: quickNewsExample,
        }}
      />
    </>
  );
};

registerRoot(RemotionRoot);
