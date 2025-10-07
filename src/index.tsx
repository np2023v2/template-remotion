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
import {
  Quote,
  motivationalQuote,
  wisdomQuote,
  successQuote,
  inspirationQuote,
  happinessQuote,
  simpleQuote,
  quoteWithAudio,
  calculateQuoteDuration,
} from './quote';

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

      {/* Quote Compositions */}
      <Composition
        id="MotivationalQuote"
        component={Quote as any}
        durationInFrames={calculateQuoteDuration(
          motivationalQuote.quote,
          motivationalQuote.author,
          30
        )}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={motivationalQuote}
      />

      <Composition
        id="WisdomQuote"
        component={Quote as any}
        durationInFrames={calculateQuoteDuration(
          wisdomQuote.quote,
          wisdomQuote.author,
          30
        )}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={wisdomQuote}
      />

      <Composition
        id="SuccessQuote"
        component={Quote as any}
        durationInFrames={calculateQuoteDuration(
          successQuote.quote,
          successQuote.author,
          30
        )}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={successQuote}
      />

      <Composition
        id="InspirationQuote"
        component={Quote as any}
        durationInFrames={calculateQuoteDuration(
          inspirationQuote.quote,
          inspirationQuote.author,
          30
        )}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={inspirationQuote}
      />

      <Composition
        id="HappinessQuote"
        component={Quote as any}
        durationInFrames={calculateQuoteDuration(
          happinessQuote.quote,
          happinessQuote.author,
          30
        )}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={happinessQuote}
      />

      <Composition
        id="SimpleQuote"
        component={Quote as any}
        durationInFrames={calculateQuoteDuration(
          simpleQuote.quote,
          simpleQuote.author,
          30
        )}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={simpleQuote}
      />

      <Composition
        id="QuoteWithAudio"
        component={Quote as any}
        durationInFrames={calculateQuoteDuration(
          quoteWithAudio.quote,
          quoteWithAudio.author,
          30
        )}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={quoteWithAudio}
      />
    </>
  );
};

registerRoot(RemotionRoot);
