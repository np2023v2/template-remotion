import React from 'react';
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from 'remotion';
import { NewsStory, NewsStoryProps } from './NewsStory';

export type TransitionType =
  | 'fade'
  | 'slide-left'
  | 'slide-right'
  | 'zoom'
  | 'none';

export interface StoryWithTransition {
  story: NewsStoryProps;
  durationInFrames: number;
  transition?: TransitionType;
  transitionDuration?: number;
}

export interface MultiStoryProps {
  stories: StoryWithTransition[];
}

const TransitionWrapper: React.FC<{
  children: React.ReactNode;
  transitionType: TransitionType;
  transitionDuration: number;
  durationInFrames: number;
}> = ({ children, transitionType, transitionDuration, durationInFrames }) => {
  const frame = useCurrentFrame();

  let opacity = 1;
  let translateX = 0;
  let scale = 1;

  // Entry transition
  if (frame < transitionDuration) {
    switch (transitionType) {
      case 'fade':
        opacity = interpolate(frame, [0, transitionDuration], [0, 1], {
          extrapolateRight: 'clamp',
        });
        break;
      case 'slide-left':
        translateX = interpolate(frame, [0, transitionDuration], [100, 0], {
          extrapolateRight: 'clamp',
        });
        opacity = interpolate(frame, [0, transitionDuration / 2], [0, 1], {
          extrapolateRight: 'clamp',
        });
        break;
      case 'slide-right':
        translateX = interpolate(frame, [0, transitionDuration], [-100, 0], {
          extrapolateRight: 'clamp',
        });
        opacity = interpolate(frame, [0, transitionDuration / 2], [0, 1], {
          extrapolateRight: 'clamp',
        });
        break;
      case 'zoom':
        scale = interpolate(frame, [0, transitionDuration], [0.8, 1], {
          extrapolateRight: 'clamp',
        });
        opacity = interpolate(frame, [0, transitionDuration], [0, 1], {
          extrapolateRight: 'clamp',
        });
        break;
    }
  }

  // Exit transition
  const exitStart = durationInFrames - transitionDuration;
  if (frame > exitStart) {
    switch (transitionType) {
      case 'fade':
        opacity = interpolate(frame, [exitStart, durationInFrames], [1, 0], {
          extrapolateLeft: 'clamp',
        });
        break;
      case 'slide-left':
        translateX = interpolate(
          frame,
          [exitStart, durationInFrames],
          [0, -100],
          {
            extrapolateLeft: 'clamp',
          }
        );
        opacity = interpolate(
          frame,
          [exitStart + transitionDuration / 2, durationInFrames],
          [1, 0],
          {
            extrapolateLeft: 'clamp',
          }
        );
        break;
      case 'slide-right':
        translateX = interpolate(
          frame,
          [exitStart, durationInFrames],
          [0, 100],
          {
            extrapolateLeft: 'clamp',
          }
        );
        opacity = interpolate(
          frame,
          [exitStart + transitionDuration / 2, durationInFrames],
          [1, 0],
          {
            extrapolateLeft: 'clamp',
          }
        );
        break;
      case 'zoom':
        scale = interpolate(frame, [exitStart, durationInFrames], [1, 1.2], {
          extrapolateLeft: 'clamp',
        });
        opacity = interpolate(frame, [exitStart, durationInFrames], [1, 0], {
          extrapolateLeft: 'clamp',
        });
        break;
    }
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        transform: `translateX(${translateX}%) scale(${scale})`,
        opacity,
      }}
    >
      {children}
    </div>
  );
};

export const MultiStory: React.FC<MultiStoryProps> = ({ stories }) => {
  if (!stories || stories.length === 0) {
    return (
      <AbsoluteFill
        style={{
          backgroundColor: '#000',
          color: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '48px',
        }}
      >
        No stories provided
      </AbsoluteFill>
    );
  }

  let currentFrame = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      {stories.map((storyConfig, index) => {
        const startFrame = currentFrame;
        const {
          story,
          durationInFrames,
          transition = 'fade',
          transitionDuration = 15,
        } = storyConfig;

        // Update currentFrame for next story
        currentFrame += durationInFrames;

        return (
          <Sequence
            key={index}
            from={startFrame}
            durationInFrames={durationInFrames}
          >
            {transition === 'none' ? (
              <NewsStory {...story} />
            ) : (
              <TransitionWrapper
                transitionType={transition}
                transitionDuration={transitionDuration}
                durationInFrames={durationInFrames}
              >
                <NewsStory {...story} />
              </TransitionWrapper>
            )}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
