# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Valorant players, esports fans, and people who analyze Valorant match and competition data.

## Product Purpose

Valorant Discover visualizes Valorant data so users can understand upcoming matches, match results, and related competition information quickly and easily. Success means users can scan and interpret the available data without needing to work directly with the underlying API.

## Positioning

The product focuses on making Valorant data easy to visualize and understand in one responsive web experience, serving both casual fans and users who need the information for analysis.

## Operating Context

Users visit the web app on desktop or mobile to browse current Valorant information. The app consumes data from the API at `http://localhost:3000` during development and is intended to deploy as a static site on Cloudflare Pages.

## Capabilities and Constraints

- The product name is **Valorant Discover** and must be preserved.
- The app should visualize the available Valorant data clearly and comprehensively.
- The primary data source is the API at `http://localhost:3000`.
- The deployment target is Cloudflare Pages using a static deployment.
- The interface must be responsive across desktop and mobile screen sizes.
- The product should serve players, fans, and analysis-oriented users.
- The exact final scope of data views beyond the currently implemented match views remains open and may include events, news, and players as the API supports them.

## Brand Commitments

- Preserve the name **Valorant Discover**.

## Evidence on Hand

- Existing SvelteKit application source under `src/`.
- Existing match views for upcoming matches and match results.
- Existing components and archive views for events, news, and players.
- API integration code and shared data types in `src/lib/API.ts` and `src/lib/types.ts`.
- No testimonials, customer studies, or other external proof assets are currently established; future work must not fabricate them.

## Product Principles

- Make data understandable at a glance.
- Provide complete and useful context for analysis without overwhelming casual users.
- Preserve trustworthy relationships between the source data and its visual presentation.
- Work well on both desktop and mobile.
- Keep the experience focused on discovering Valorant information.

## Accessibility & Inclusion

The product must be responsive and usable across desktop and mobile devices. No additional product-specific accessibility standard has been established yet; future UI work should follow good web accessibility practice and preserve keyboard and assistive-technology access.
