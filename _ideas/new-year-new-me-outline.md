# New Year, New Me — distilled outline

## Core claim

- A personal site can remain simple, fast, and understandable while expressing substantially more personality
- The redesign moves the site away from generic developer-blog conventions and toward a deliberate design-studio aesthetic
- Typography, hierarchy, borders, and information structure carry the design
  - minimal dependence on color and decoration
  - no JavaScript or expanded application stack

## Problem with the old design

- Functionally successful
  - fast
  - readable
  - working
- Visually undistinguished
  - little personality
  - resembled a default Jekyll theme
  - felt purely functional
- Redesign goal
  - preserve functional strengths
  - create a more authored visual identity

## Design references and principles

### Monospace as identity

- Technical, deliberate, editorial mood
- Berkeley Mono selected as the primary typeface
  - enough character for long-form prose
  - sharp at small sizes
  - suitable for navigation and metadata

### Strong typographic hierarchy

- Large, bold headings
- Tight letter-spacing
- Uppercase navigation and section labels
- Page structure should remain legible when viewed at a glance
- Size, weight, and spacing do most of the visual work

### Structural borders

- Borders communicate layout rather than decorate it
- Strong 2px rules establish major boundaries
  - navigation
  - footer
- Subtler rules organize secondary elements
  - sidebar cards
  - lists
  - internal card headings

### Equal support for light and dark modes

- Previous dark palette treated as an afterthought
- New palettes designed together
  - warm off-whites
  - deep charcoals
- `prefers-color-scheme` delegates mode selection to the operating system

### Sidebars must justify their footprint

- Every sidebar section has a discrete purpose
  - statistics
  - links
  - subscription options
  - fun facts
  - post metadata
- Pages without useful sidebar content remain full width

## Font implementation

- Self-hosted Berkeley Mono
- Four `@font-face` declarations targeting `.otf` files
- `font-display: swap` used to manage font loading
- Fallback stack
  - TX-02
  - JetBrains Mono
  - SF Mono
  - Fira Code
  - Cascadia Code
- Graceful degradation is part of the implementation model

## Layout system

- Desktop
  - main content column
  - 260px sidebar
- Mobile
  - single-column collapse
- CSS Grid provides the page structure
- Sidebar content changes by page type
  - writing index: stats and subscription links
  - individual post: date, word count, and slug
  - homepage: social links, feeds, and fun facts
- Full-width exceptions
  - speaking
  - projects

## Detail-level decisions

- Navigation
  - uppercase
  - bold
  - letter-spaced
  - masthead-like presentation
- Navigation and footer
  - strong top and bottom anchors
  - 2px borders using the strong color
- Section headers
  - compact inline blocks
  - 2px underline for emphasis
- Post list
  - bold top border
  - date and per-post word count
- Sidebar cards
  - visible outer boundaries
  - uppercase headings
  - subtle internal divider
- Aggregate word counts
  - added partly from personal curiosity
  - borrowed from details admired on other sites

## Content and information architecture changes

- “Blog” renamed to “Writing”
  - more accurate label
  - preferred navigation language
- “Talks” renamed to “Speaking”
  - same accuracy and tone rationale
- Reading list moved out of Media into a dedicated Digest page
  - previously too buried
- Uses page added
  - follows an established personal-site convention
- Word counts added in three places
  - writing index
  - stats sidebar
  - individual post information box

## Technical constraints

- Jekyll remains the publishing system
- GitHub Pages remains the host
- Implementation remains intentionally small
  - one CSS file
  - a few Liquid templates
  - HTML
- CSS custom properties hold the design system
  - background
  - text
  - accent
  - border
  - strong border
- Dark mode swaps token values in a media query
- Original site philosophy remains intact
  - no JavaScript
  - no separate build step
  - no application dependencies
  - browser-native HTML and CSS
  - fast loading
  - broad compatibility
  - every line understandable by the author

## Redesign loop

1. Identify the generic quality of the existing site
2. Extract recurring traits from admired personal sites
3. Turn those traits into explicit design principles
4. Implement the principles with typography, borders, grid, and tokens
5. Restructure content where presentation exposes information-architecture problems
6. Preserve the site’s original simplicity and performance constraints

## Emerging working model

- Visual identity does not require technical complexity
- A small set of consistent primitives can function as a complete design system
  - type
  - spacing
  - borders
  - layout
  - color tokens
- Components should earn their presence through utility
- Responsive design should remove unnecessary structure rather than compress it
- Content naming and organization are part of the redesign, not separate cleanup

## Tensions worth preserving

- The old design was already successful by functional measures but still felt worth replacing
- A single monospace family creates coherence but must carry both long-form prose and tiny interface text
- Strong borders add personality while color and decoration remain restrained
- Sidebars enrich desktop pages but disappear into a simpler mobile flow
- The design becomes more distinctive without adding JavaScript or a larger toolchain
- A self-hosted custom font adds an asset while the broader philosophy rejects unnecessary dependencies
- Inspiration comes from recurring conventions on other personal sites, while the goal is to avoid a generic personal-site result

## Likely conclusion

- Preserve the durable constraints
  - speed
  - readability
  - simplicity
  - comprehensibility
- Add personality through disciplined visual and structural choices
- Treat typography and information architecture as the primary design tools
- Keep the implementation close to the web platform

## Out of scope / separate post

- Before-and-after screenshots or visual comparison
- Accessibility audit
- Measured performance impact of the custom font
- Font licensing considerations
- Cross-browser test results
- Detailed migration or implementation diff
- Reader feedback or engagement data after launch
- Alternative design directions considered and rejected
