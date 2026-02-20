# ROUTEY Design Guidelines

## Design Approach
**Reference-Based:** Inspired by Airbnb's friendly accessibility and Google Maps' clarity, tailored for travel discovery. Mobile-first with seamless desktop scaling.

## Typography
**Font Family:** Pretendard (all weights via Google Fonts CDN)
- Hero/Headers: 600-700 weight, 2.5rem mobile / 3.5rem desktop
- Section Titles: 600 weight, 1.75rem mobile / 2.25rem desktop
- Card Titles: 600 weight, 1.125rem
- Body Text: 400 weight, 1rem with 1.6 line-height
- Captions/Meta: 400 weight, 0.875rem

## Layout System
**Spacing Primitives:** Tailwind units of 4, 6, 8, 12, 16, 20, 24
- Mobile section padding: py-12 to py-16
- Desktop section padding: py-20 to py-24
- Card gaps: gap-6 mobile, gap-8 desktop
- Inner card padding: p-6
- Border radius: rounded-3xl (24px) for cards, rounded-2xl (16px) for buttons

## Component Library

### Navigation
Mobile bottom tab bar with 4-5 icons (Home, Explore, Saved, Profile). Desktop: top horizontal nav with logo left, menu items center, profile/CTA right. Shadow on scroll.

### Hero Section
Full-width hero image (mountain landscape, travelers on beach) with gradient overlay (black 0% to 60% opacity bottom). Centered search card floating over image with blurred background (backdrop-blur-xl), containing:
- Large heading "Discover Your Next Adventure"
- Search bar with location icon, rounded-2xl
- Category pills (Nature, Food, Culture, Adventure) below search

### Activity/Destination Cards
Grid layout: 1 column mobile, 2 columns tablet, 3 columns desktop
- Image on top with 3:2 aspect ratio, rounded corners matching system
- Content padding p-6
- Badge overlay on image (top-right): category type
- Title (600 weight), location with pin icon, rating with stars
- Price and "Save" heart icon at bottom

### Featured Routes Section
Horizontal scrollable cards showing curated itineraries
- Wide cards (320px width) with large preview image
- Duration badge, destination count, difficulty level
- "Start Route" CTA button

### Filter Bar
Sticky horizontal scroll with pill-shaped filters
- Each pill: px-6 py-3, rounded-full
- Active state with sky-blue background
- Icon + label combination

### Bottom Sheet/Modal (Mobile)
Slide-up panel for details
- Drag handle at top
- Full activity details with image gallery
- Map preview section
- Book/Save CTAs at sticky bottom

### Footer
Three-column desktop layout (About, Resources, Social)
Single column mobile with sections stacked
Newsletter signup card with rounded input + button combo
Trust badges and app store download buttons

## Images

**Hero Image:** Wide panoramic travel scene (mountain vista or coastal town), 1920x800px minimum. Ensures warm, inviting atmosphere with blue skies.

**Activity Cards:** High-quality destination photos (landmarks, activities, food scenes), 600x400px, diverse and vibrant.

**Route Cards:** Scenic pathway/journey imagery (winding roads, hiking trails), 640x360px.

**Category Icons:** Use Heroicons outline set via CDN - map-pin, camera, utensils, etc.

**Background Patterns:** Subtle topographic map pattern at 5% opacity for section dividers.

All images emphasize wanderlust with bright, saturated colors and human elements where appropriate.