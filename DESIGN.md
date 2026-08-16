---
name: Valorant Discover
description: A clean competitive interface for discovering and understanding Valorant data.
colors:
  valorant-red: "#fa4454"
  rose-deep: "#9f1239"
  rose-dark: "#881337"
  neutral-background: "#f9fafb"
  neutral-surface: "#f3f4f6"
  neutral-border: "#e5e7eb"
  neutral-text: "#1f2937"
  neutral-muted: "#6b7280"
  white: "#ffffff"
typography:
  display:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.75rem, 8vw, 6rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "normal"
  headline:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "normal"
  title:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "normal"
  body:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "0.04em"
rounded:
  sm: "0.25rem"
  md: "0.5rem"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "0.75rem"
  lg: "1rem"
  xl: "2rem"
  section: "3rem"
components:
  nav:
    backgroundColor: "{colors.rose-dark}"
    textColor: "{colors.white}"
    rounded: "0"
    height: "auto"
  match-card:
    backgroundColor: "{colors.neutral-surface}"
    textColor: "{colors.neutral-text}"
    rounded: "{rounded-md}"
    padding: "0.75rem"
  status-accent:
    backgroundColor: "{colors.valorant-red}"
    textColor: "{colors.white}"
    rounded: "{rounded-sm}"
---

# Design System: Valorant Discover

## Overview

**Creative North Star: "Clean Competitive"**

Valorant Discover keeps the recognizable Valorant identity while making the interface calmer, clearer, and easier to scan. The experience should feel like a polished esports broadcast interface: confident enough to communicate competition, restrained enough to let the data remain the focus.

The existing Valorant red and rose navigation palette remain the brand anchors. Modernity comes from disciplined spacing, strong hierarchy, simple surfaces, and clear status signals rather than from decorative effects. Information should feel organized at first glance for players, fans, and analysis-oriented users alike.

**Key Characteristics:**
- Clean, high-contrast information hierarchy.
- Competitive energy concentrated in red status accents.
- Light neutral surfaces for readable data cards.
- Compact, responsive layouts that support fast scanning.
- Brand continuity through Valorant red and deep rose navigation.

## Colors

The palette uses a quiet neutral canvas with a controlled red accent. Red communicates Valorant identity and live or important competitive states; it should remain meaningful rather than becoming a blanket decoration.

### Primary
- **Valorant Red** (`#fa4454`): Brand accent, live state, emphasis, and key competitive moments.

### Secondary
- **Deep Rose** (`#9f1239`): Strong secondary accent for navigation and darker branded surfaces.
- **Rose Night** (`#881337`): Deep navigation background and high-contrast brand framing.

### Neutral
- **Canvas** (`#f9fafb`): Main page background and visual breathing room.
- **Surface** (`#f3f4f6`): Match cards, content panels, and grouped data surfaces.
- **Border** (`#e5e7eb`): Quiet structure and separation between related areas.
- **Ink** (`#1f2937`): Primary readable content.
- **Muted Ink** (`#6b7280`): Supporting metadata and secondary labels.
- **White** (`#ffffff`): Text on dark branded surfaces and clean contrast areas.

### Named Rules
**The Signal, Not Confetti Rule.** Use Valorant red to communicate brand or state. Do not apply it to every element; its scarcity makes status and action easier to recognize.

## Typography

**Display Font:** System sans-serif (`ui-sans-serif, system-ui, sans-serif`)
**Body Font:** System sans-serif (`ui-sans-serif, system-ui, sans-serif`)
**Label/Mono Font:** No distinct label font is established.

**Character:** Bold, compact, and functional. Large headings create immediate orientation, while body and metadata remain neutral and legible for data-heavy scanning.

### Hierarchy
- **Display** (800, `clamp(3.75rem, 8vw, 6rem)`, 1): Hero brand wordmark and major page identity.
- **Headline** (700, `clamp(1.875rem, 4vw, 3rem)`, 1.1): Page section titles and strong context-setting headings.
- **Title** (700, `1.25rem`, 1.25): Team names, card titles, and important data labels.
- **Body** (400, `1rem`, 1.5): Explanatory content and ordinary data values.
- **Label** (700, `0.75rem`, 0.04em): Compact metadata, event rounds, and supporting status language.

### Named Rules
**The Scan-First Type Rule.** Use weight and size to establish hierarchy; avoid excessive uppercase, decoration, or multiple typefaces that slow down data recognition.

## Layout

The layout uses a centered responsive container with a maximum width of `max-w-7xl`. Content receives horizontal padding of `1rem` on small screens, increasing to `1.5rem` and `2rem` at larger breakpoints.

Primary data views use responsive grids: one column on narrow screens and two or more columns where the viewport allows. Cards should keep enough internal breathing room for team names, scores, event context, and status overlays without making the user hunt for relationships.

Navigation remains sticky at the top and uses a compact horizontal layout on larger screens. Mobile layouts should prioritize the current route and preserve comfortable touch targets without compressing card content below readable sizes.

The spacing rhythm is based on Tailwind's compact scale, with `0.5rem` for tightly related elements, `0.75rem` to `1rem` for card internals, `2rem` for content groups, and `3rem` for major section separation.

## Elevation & Depth

The system is primarily flat and layered rather than shadow-heavy. Depth comes from neutral surface changes, borders, strong contrast, status-colored edge treatments, and occasional dark overlays on imagery. Avoid adding persistent ornamental shadows; use contrast and spacing to clarify grouping.

### Named Rules
**The Tonal Layering Rule.** Establish hierarchy with canvas, surface, border, and branded navigation layers before reaching for shadows or effects.

## Shapes

The form language is compact and practical. Cards and image containers use small-to-medium rounded corners (`0.25rem` to `0.5rem`), while navigation remains a strong full-width bar with no decorative rounding. Borders are functional and quiet at rest, becoming colored only when they communicate match status or outcome.

Avoid excessive pill shapes. Reserve compact rounded treatment for status labels, small indicators, and elements that need to read as a discrete state.

## Components

### Cards / Containers
- **Character:** Compact, readable, and structured around relationships in the data.
- **Corner Style:** Small-to-medium radius, typically `0.5rem`.
- **Background:** Neutral surface `#f3f4f6` on the canvas `#f9fafb`.
- **Shadow Strategy:** Prefer no persistent shadow; use borders and tonal contrast.
- **Border:** Quiet neutral border at rest; status colors for match state.
- **Internal Padding:** Usually `0.75rem` to `1rem`.

### Match Cards
- **Status:** Upcoming uses yellow emphasis, live uses Valorant red, completed uses green, and waiting uses neutral gray.
- **Hierarchy:** Scores and team names are primary; event and round metadata are secondary.
- **Fallbacks:** Missing team and event imagery falls back to the neutral Valorant image asset.
- **Behavior:** The full card remains readable at mobile widths; status overlays must not obscure essential team context for longer than necessary.

### Navigation
- **Style:** Sticky, full-width deep rose branded bar.
- **Typography:** Compact bold brand lockup with clear route labels.
- **Default:** Muted light rose text against the dark rose surface.
- **Active:** White or near-white text with a clear visual distinction.
- **Mobile:** Preserve the current route and brand identity while allowing the route list to remain usable on narrow screens.

### Hero Header
- **Style:** Large centered VALORANT wordmark over a darkened thumbnail image.
- **Color:** Valorant red for the brand wordmark, white for the current section label.
- **Behavior:** Keep the heading prominent but ensure the image and overlay support contrast rather than compete with the page content.

## Do's and Don'ts

### Do:
- **Do** use Valorant red for meaningful emphasis, live status, and brand recognition.
- **Do** keep data cards visually calm so scores, team names, and event information lead.
- **Do** use responsive grids and generous enough spacing for quick scanning on mobile.
- **Do** preserve the deep rose navigation and Valorant Discover name.
- **Do** make state differences visible through color, text, and structure rather than color alone.

### Don't:
- **Don't** add gradients, glows, or decorative effects where they reduce data clarity.
- **Don't** use red on every heading, border, and control; preserve its signal value.
- **Don't** compress team names, scores, or match metadata below comfortable reading sizes.
- **Don't** introduce a new typeface or visual language that disconnects the product from Valorant.
- **Don't** treat mobile as a smaller desktop layout; preserve hierarchy and touch-friendly spacing.
