# Sample Output Specification

## Visual Layout Description

This document describes what the rendered video looks like at different points in time.

### Video Specifications

- **Aspect Ratio**: 9:16 (Vertical/Portrait)
- **Resolution**: 1080x1920 pixels
- **Frame Rate**: 30 fps
- **Duration**: 10 seconds (300 frames) - configurable
- **Format**: MP4 (H.264 codec)

## Visual Elements Layout

```
┌─────────────────────────────────────┐ 1920px
│  [Date: 15 tháng 3, 2024]          │ ← Top 40px
│                                     │
│                                     │
│                                     │
│                                     │
│         Background Image            │
│       with Gradient Overlay         │
│                                     │
│     [Animated Text in Center]      │ ← Center
│                                     │
│                                     │
│                                     │
│                                     │
│    [#Tag1] [#Tag2] [#Tag3]         │ ← Bottom 180px
│                                     │
│   © 2024 Company. All rights.      │ ← Bottom 40px
└─────────────────────────────────────┘
         1080px
```

## Timeline Breakdown (10-second video)

### 0:00 - 0:01 (Frames 0-30)
**Visual State:**
- Background image begins to appear
- Date fades in at top-left
- Gradient overlay visible
- No text yet

**Animation:**
- Background starts zoom-in effect (if configured)
- Date opacity: 0 → 1

### 0:01 - 0:04 (Frames 30-120)
**Visual State:**
- First text segment appears center screen
- Date fully visible
- Background continues subtle zoom

**Animation:**
- Text fades in (frames 30-45)
- Text stays visible (frames 45-105)
- Text fades out (frames 105-120)

### 0:04 - 0:07 (Frames 120-210)
**Visual State:**
- Second text segment appears
- Background zoom continues
- Date remains visible

**Animation:**
- Second text slides up from bottom (frames 130-145)
- Text stays visible (frames 145-205)
- Text fades out (frames 205-220)

### 0:07 - 0:10 (Frames 210-300)
**Visual State:**
- Tags appear at bottom
- Copyright text fades in
- Background reaches maximum zoom

**Animation:**
- Tags spring in one by one (staggered)
- Copyright fades in (frames 240-260)
- All elements visible until end

## Color Palette

### Background
- **Base**: Full-screen image
- **Overlay Gradient**: 
  - Top: `rgba(0,0,0,0.3)`
  - Middle: `rgba(0,0,0,0.1)`
  - Bottom: `rgba(0,0,0,0.5)`

### Text Elements
- **Main Text**: `#FFFFFF` (white)
  - Shadow: `0 4px 12px rgba(0,0,0,0.8)`
- **Date Background**: `rgba(0,0,0,0.6)`
- **Date Text**: `#FFFFFF`
- **Tags Background**: `rgba(0,122,255,0.8)` (iOS blue)
- **Tags Text**: `#FFFFFF`
- **Copyright**: `rgba(255,255,255,0.7)` (70% opacity)

## Typography

### Main Text (Headlines)
- **Font**: Arial, sans-serif
- **Size**: 52px
- **Weight**: 700 (Bold)
- **Line Height**: 1.4
- **Width**: 85% of screen width
- **Alignment**: Center

### Date
- **Font**: Arial, sans-serif
- **Size**: 24px
- **Weight**: 600 (Semi-bold)
- **Background**: Rounded rectangle with padding

### Tags
- **Font**: Arial, sans-serif
- **Size**: 28px
- **Weight**: 600 (Semi-bold)
- **Background**: Pill-shaped (border-radius: 24px)
- **Padding**: 10px horizontal, 24px vertical

### Copyright
- **Font**: Arial, sans-serif
- **Size**: 18px
- **Weight**: 400 (Regular)
- **Opacity**: 70%

## Example Configurations

### Configuration 1: World News (Default)
```
Background: Business/World image with zoom-in
Text 1 (1-4s): "Breaking News: Thị trường tài chính..." (fade)
Text 2 (4-7s): "Các chuyên gia khuyến nghị..." (slide)
Date: "15 tháng 3, 2024"
Tags: #ThếGiới, #KinhTế, #TàiChính
Copyright: "© 2024 News Agency"
```

### Configuration 2: Tech News
```
Background: Technology image with zoom-out
Text 1 (0.6-4s): "Công nghệ AI mới đột phá..." (typing effect)
Text 2 (4-7s): "Sự thay đổi lớn trong cách..." (fade)
Date: "20 tháng 3, 2024"
Tags: #CôngNghệ, #AI, #TươngLai
Copyright: "© 2024 Tech News"
```

### Configuration 3: Sports News
```
Background: Sports image with fade
Text 1 (0.8-3.5s): "Đội tuyển Việt Nam giành chiến thắng!" (slide)
Text 2 (3.8-6.5s): "HLV Park Hang-seo: 'Đây là nỗ lực...'" (fade)
Text 3 (6.8-9s): "Người hâm mộ tràn xuống đường..." (slide)
Date: "18 tháng 3, 2024"
Tags: #ThểThao, #BóngĐá, #ViệtNam
Copyright: "© 2024 Sports Network"
```

## Animation Characteristics

### Smooth Transitions
- All animations use ease-in/ease-out curves
- No jarring or sudden movements
- Professional broadcast quality

### Text Readability
- High contrast against backgrounds
- Strong shadows for depth
- Optimal font sizes for mobile viewing

### Mobile-First Design
- Elements sized for small screens
- Touch-friendly spacing
- Vertical orientation native to mobile

## File Output

### Default Build Output
- **Location**: `out/video.mp4`
- **Size**: ~5-15 MB (depends on duration and quality)
- **Compatibility**: Playable on all modern devices
- **Upload Ready**: Optimized for social media platforms

### Quality Settings
- **Video Codec**: H.264 (widely compatible)
- **Audio**: None (silent video for stories)
- **Bitrate**: Automatic (Remotion optimized)
- **Keyframes**: Every 2 seconds

## Use Cases

✅ Instagram Stories
✅ Facebook Stories  
✅ YouTube Shorts
✅ TikTok Videos
✅ LinkedIn Video Posts
✅ Twitter/X Videos
✅ News Broadcasting
✅ Social Media Marketing
✅ Educational Content
✅ Event Announcements

## Rendering Time Estimate

For a 10-second video (300 frames):
- **Development Preview**: Real-time in Remotion Studio
- **First Render**: ~30-60 seconds (includes Chrome download)
- **Subsequent Renders**: ~10-30 seconds
- **Higher Quality**: +50% render time

*Times vary based on:*
- Computer performance
- Image sizes/quality
- Number of text segments
- Animation complexity
