# Ananya Gupta — Portfolio

An Awwwards-caliber portfolio built with Next.js, Framer Motion, Three.js, and GSAP.

## Tech Stack

- **Next.js 16** (App Router)
- **React 19** (component-based)
- **Tailwind CSS v4**
- **Framer Motion 12** (animations, page transitions, scroll-triggered reveals)
- **Three.js** (3D particle field on hero)
- **Lenis** (smooth inertia scrolling)

## Design Features

- Custom animated cursor with blend mode glow trail
- Cinematic page loader with scan-line effect
- 3D cube navigation (CSS 3D transforms, rotates on nav click)
- Three.js particle field — mouse-reactive, color-coded
- Letter-by-letter name reveal on hero
- Scroll-triggered animations on every section
- Magnetic buttons with spring physics
- Parallax depth layers
- Grain/noise overlay for premium texture
- Animated skill bars, achievement badges, timeline
- Full case study pages at `/projects/[slug]`

## Project Structure

```
app/
  layout.tsx            Root layout (metadata, providers)
  page.tsx              Homepage (all sections)
  globals.css           CSS variables, grain overlay, animations
  projects/[slug]/
    page.tsx            Dynamic project case study

components/
  cursor/
    CustomCursor.tsx    Magnetic cursor with glow
  nav/
    CubeNav.tsx         3D rotating cube navigation
  sections/
    HeroSection.tsx     Fullscreen landing with Three.js
    AboutSection.tsx    Story layout + animated skill bars
    ProjectsSection.tsx Project cards → case study links
    ExperienceSection.tsx Alternating animated timeline
    AchievementsSection.tsx Glowing badge cards + counters
    ContactSection.tsx  Animated form + social links
  three/
    ParticleField.tsx   Three.js particle sphere
  transitions/
    PageLoader.tsx      Cinematic intro loader
  ui/
    MagneticButton.tsx  Spring-physics magnetic button
    RevealText.tsx      Word-by-word scroll reveal
    SmoothScroll.tsx    Lenis smooth scroll provider
  Providers.tsx         Client-side provider wrapper

lib/
  data.ts               All portfolio content (edit here)
```

## Setup

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Production build
```

## Customization

All content lives in `lib/data.ts` — update `personalInfo`, `projects`, `experience`, `achievements`, and `skills`.

Colors and typography are CSS variables in `app/globals.css` under `:root {}`.
