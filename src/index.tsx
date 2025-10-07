import { Composition , registerRoot} from 'remotion';
import { NewsStory, NewsStoryProps } from './components/NewsStory';
import { activeConfig } from './config';

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
        defaultProps={activeConfig}
      />
    </>
  );
};
registerRoot(RemotionRoot);