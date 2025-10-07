import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Audio,
  Video,
  Img,
} from 'remotion';
import { z } from 'zod';

// Zod schemas for validation
export const backgroundMediaSchema = z.object({
  type: z.enum(['image', 'video']),
  url: z.string().url('Invalid media URL'),
  animation: z.enum(['zoom-in', 'zoom-out', 'fade', 'pan', 'none']).optional(),
});

export const quotePropsSchema = z.object({
  quote: z.string().min(1, 'Quote text is required'),
  author: z.string().min(1, 'Author name is required'),
  backgroundMedia: backgroundMediaSchema,
  audioUrl: z.string().url('Invalid audio URL').optional(),
  stories: z.array(z.string()).optional(),
});

export interface BackgroundMedia {
  type: 'image' | 'video';
  url: string;
  animation?: 'zoom-in' | 'zoom-out' | 'fade' | 'pan' | 'none';
}

export interface QuoteProps {
  quote: string;
  author: string;
  backgroundMedia: BackgroundMedia;
  audioUrl?: string;
  stories?: string[];
}

// Background Layer Component
const BackgroundLayer: React.FC<{ media: BackgroundMedia }> = ({ media }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  let scale = 1;
  let opacity = 1;
  let translateX = 0;

  if (media.animation === 'zoom-in') {
    scale = interpolate(frame, [0, durationInFrames], [1, 1.3], {
      extrapolateRight: 'clamp',
    });
  } else if (media.animation === 'zoom-out') {
    scale = interpolate(frame, [0, durationInFrames], [1.3, 1], {
      extrapolateRight: 'clamp',
    });
  } else if (media.animation === 'fade') {
    opacity = interpolate(
      frame,
      [0, 30, durationInFrames - 30, durationInFrames],
      [0, 1, 1, 0],
      {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      }
    );
  } else if (media.animation === 'pan') {
    translateX = interpolate(frame, [0, durationInFrames], [-5, 5], {
      extrapolateRight: 'clamp',
    });
  }

  return (
    <AbsoluteFill
      style={{
        transform: `scale(${scale}) translateX(${translateX}%)`,
        opacity,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        {media.type === 'image' ? (
          <Img
            src={media.url}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <Video
            src={media.url}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        )}
        {/* Dark overlay for better text visibility */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7))',
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

// Quote Text Component with animation
const QuoteText: React.FC<{ quote: string }> = ({ quote }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade in and scale animation
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const scale = spring({
    frame: frame - 10,
    fps,
    config: {
      damping: 100,
      stiffness: 200,
      mass: 0.5,
    },
  });

  const translateY = interpolate(frame, [0, 30], [20, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) translateY(${translateY}px) scale(${scale})`,
        opacity,
        width: '85%',
        textAlign: 'center',
        fontFamily: 'Georgia, serif',
      }}
    >
      <div
        style={{
          fontSize: '52px',
          fontWeight: 'bold',
          color: 'white',
          lineHeight: '1.4',
          textShadow: '0 4px 20px rgba(0,0,0,0.8)',
          marginBottom: '20px',
          fontStyle: 'italic',
        }}
      >
        "{quote}"
      </div>
    </div>
  );
};

// Author Component with animation
const AuthorText: React.FC<{ author: string }> = ({ author }) => {
  const frame = useCurrentFrame();

  // Delayed fade in
  const opacity = interpolate(frame, [40, 70], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const translateY = interpolate(frame, [40, 70], [20, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '25%',
        left: '50%',
        transform: `translateX(-50%) translateY(${translateY}px)`,
        opacity,
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontSize: '32px',
          color: 'white',
          fontFamily: 'Georgia, serif',
          textShadow: '0 2px 10px rgba(0,0,0,0.8)',
        }}
      >
        — {author}
      </div>
    </div>
  );
};

// Stories indicator component
const StoriesIndicator: React.FC<{ stories: string[] }> = ({ stories }) => {
  const frame = useCurrentFrame();

  // Delayed fade in from bottom
  const opacity = interpolate(frame, [80, 110], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const translateY = interpolate(frame, [80, 110], [20, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '10%',
        left: '50%',
        transform: `translateX(-50%) translateY(${translateY}px)`,
        opacity,
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: '80%',
      }}
    >
      {stories.map((story, index) => {
        const storyOpacity = interpolate(
          frame,
          [80 + index * 5, 110 + index * 5],
          [0, 1],
          {
            extrapolateRight: 'clamp',
          }
        );

        return (
          <div
            key={index}
            style={{
              opacity: storyOpacity,
              padding: '8px 16px',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              fontSize: '18px',
              color: 'white',
              fontFamily: 'Arial, sans-serif',
              border: '1px solid rgba(255, 255, 255, 0.3)',
            }}
          >
            {story}
          </div>
        );
      })}
    </div>
  );
};

// Main Quote Component
export const Quote: React.FC<QuoteProps> = ({
  quote,
  author,
  backgroundMedia,
  audioUrl,
  stories,
}) => {
  // Validate props
  const validationResult = quotePropsSchema.safeParse({
    quote,
    author,
    backgroundMedia,
    audioUrl,
    stories,
  });

  if (!validationResult.success) {
    return (
      <AbsoluteFill
        style={{
          backgroundColor: '#1a1a1a',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px',
        }}
      >
        <h1 style={{ fontSize: '48px', marginBottom: '20px', color: 'white' }}>
          ⚠️ Validation Error
        </h1>
        <div style={{ fontSize: '24px', textAlign: 'center', color: 'white' }}>
          {validationResult.error.errors.map((err, idx) => (
            <div key={idx} style={{ marginBottom: '10px' }}>
              • {err.path.join('.')}: {err.message}
            </div>
          ))}
        </div>
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill>
      {/* Background Layer */}
      <BackgroundLayer media={backgroundMedia} />

      {/* Audio */}
      {audioUrl && <Audio src={audioUrl} />}

      {/* Quote Text */}
      <QuoteText quote={quote} />

      {/* Author */}
      <AuthorText author={author} />

      {/* Stories Indicator */}
      {stories && stories.length > 0 && <StoriesIndicator stories={stories} />}
    </AbsoluteFill>
  );
};
