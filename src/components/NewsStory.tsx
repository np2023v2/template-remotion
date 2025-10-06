import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from 'remotion';

export interface BackgroundImage {
  url: string;
  animation?: 'zoom-in' | 'zoom-out' | 'fade' | 'none';
}

export interface TextSegment {
  text: string;
  startFrame: number;
  durationInFrames: number;
  animation?: 'fade' | 'slide' | 'typing' | 'none';
}

export interface NewsStoryProps {
  backgroundImages: BackgroundImage[];
  textSegments: TextSegment[];
  publishDate: string;
  tags: string[];
  copyright: string;
}

const BackgroundLayer: React.FC<{ image: BackgroundImage }> = ({ image }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  let scale = 1;
  let opacity = 1;

  if (image.animation === 'zoom-in') {
    scale = interpolate(frame, [0, durationInFrames], [1, 1.2], {
      extrapolateRight: 'clamp',
    });
  } else if (image.animation === 'zoom-out') {
    scale = interpolate(frame, [0, durationInFrames], [1.2, 1], {
      extrapolateRight: 'clamp',
    });
  } else if (image.animation === 'fade') {
    opacity = interpolate(
      frame,
      [0, 30, durationInFrames - 30, durationInFrames],
      [0, 1, 1, 0],
      {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      }
    );
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#000',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          transform: `scale(${scale})`,
          opacity,
        }}
      >
        <img
          src={image.url}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          alt="Background"
        />
      </div>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.5) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};

const TextLayer: React.FC<{
  segment: TextSegment;
  startFrame: number;
}> = ({ segment, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;

  let opacity = 1;
  let translateY = 0;
  let displayText = segment.text;

  if (segment.animation === 'fade') {
    opacity = interpolate(
      localFrame,
      [0, 15, segment.durationInFrames - 15, segment.durationInFrames],
      [0, 1, 1, 0],
      {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      }
    );
  } else if (segment.animation === 'slide') {
    const slideProgress = spring({
      frame: localFrame,
      fps,
      config: {
        damping: 100,
      },
    });
    translateY = interpolate(slideProgress, [0, 1], [50, 0]);
    opacity = interpolate(
      localFrame,
      [0, 15, segment.durationInFrames - 15, segment.durationInFrames],
      [0, 1, 1, 0],
      {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      }
    );
  } else if (segment.animation === 'typing') {
    const charsToShow = Math.floor(
      interpolate(
        localFrame,
        [0, segment.durationInFrames * 0.7],
        [0, segment.text.length],
        {
          extrapolateRight: 'clamp',
        }
      )
    );
    displayText = segment.text.substring(0, charsToShow);
    opacity = interpolate(
      localFrame,
      [segment.durationInFrames - 15, segment.durationInFrames],
      [1, 0],
      {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      }
    );
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, calc(-50% + ${translateY}px))`,
        width: '85%',
        textAlign: 'center',
        opacity,
      }}
    >
      <div
        style={{
          fontSize: '52px',
          fontWeight: '700',
          color: '#fff',
          lineHeight: '1.4',
          textShadow: '0 4px 12px rgba(0,0,0,0.8)',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        {displayText}
      </div>
    </div>
  );
};

const DateDisplay: React.FC<{ date: string }> = ({ date }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: '40px',
        left: '40px',
        opacity,
      }}
    >
      <div
        style={{
          fontSize: '24px',
          fontWeight: '600',
          color: '#fff',
          backgroundColor: 'rgba(0,0,0,0.6)',
          padding: '12px 20px',
          borderRadius: '8px',
          textShadow: '0 2px 4px rgba(0,0,0,0.5)',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        {new Date(date).toLocaleDateString('vi-VN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </div>
    </div>
  );
};

const TagsDisplay: React.FC<{ tags: string[] }> = ({ tags }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '180px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        justifyContent: 'center',
        maxWidth: '85%',
      }}
    >
      {tags.map((tag, index) => {
        const delay = index * 5;
        const tagFrame = frame - delay;
        const scale = spring({
          frame: tagFrame,
          fps,
          config: {
            damping: 100,
          },
        });
        const opacity = interpolate(tagFrame, [0, 15], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        return (
          <div
            key={tag}
            style={{
              fontSize: '28px',
              fontWeight: '600',
              color: '#fff',
              backgroundColor: 'rgba(0,122,255,0.8)',
              padding: '10px 24px',
              borderRadius: '24px',
              textShadow: '0 2px 4px rgba(0,0,0,0.5)',
              fontFamily: 'Arial, sans-serif',
              transform: `scale(${scale})`,
              opacity,
            }}
          >
            {tag}
          </div>
        );
      })}
    </div>
  );
};

const CopyrightDisplay: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const opacity = interpolate(
    frame,
    [durationInFrames - 60, durationInFrames - 40],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        opacity,
      }}
    >
      <div
        style={{
          fontSize: '18px',
          color: 'rgba(255,255,255,0.7)',
          textAlign: 'center',
          fontFamily: 'Arial, sans-serif',
          textShadow: '0 2px 4px rgba(0,0,0,0.5)',
        }}
      >
        {text}
      </div>
    </div>
  );
};

export const NewsStory: React.FC<NewsStoryProps> = ({
  backgroundImages,
  textSegments,
  publishDate,
  tags,
  copyright,
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#000',
      }}
    >
      {/* Background images */}
      {backgroundImages.map((image, index) => (
        <BackgroundLayer key={index} image={image} />
      ))}

      {/* Date display */}
      <DateDisplay date={publishDate} />

      {/* Text segments */}
      {textSegments.map((segment, index) => (
        <Sequence
          key={index}
          from={segment.startFrame}
          durationInFrames={segment.durationInFrames}
        >
          <TextLayer segment={segment} startFrame={segment.startFrame} />
        </Sequence>
      ))}

      {/* Tags display */}
      <TagsDisplay tags={tags} />

      {/* Copyright */}
      <CopyrightDisplay text={copyright} />
    </AbsoluteFill>
  );
};
