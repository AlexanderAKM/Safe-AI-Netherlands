# SAIN — Safe AI Netherlands

The official website for **Safe AI Netherlands (SAIN)**, the Netherlands' national initiative for AI Safety.

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (React, App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Language**: TypeScript
- **Deployment**: Static export (deployable to Vercel, Netlify, or any static host)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ installed
- npm (comes with Node.js)

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Production Build

```bash
# Build for production (static export)
npm run build

# The output is in the `out/` directory — deploy this to any static host
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home page
│   ├── about/              # About SAIN
│   ├── research/           # Research Hub
│   ├── team/               # Team & Advisory Board
│   ├── get-involved/       # Get Involved, Start a Chapter, Donate
│   └── chapters/
│       ├── groningen/      # SAIN Groningen (full content)
│       ├── amsterdam/      # SAIN Amsterdam (placeholder)
│       ├── delft/          # SAIN Delft (placeholder)
│       └── utrecht/        # SAIN Utrecht (placeholder)
├── components/             # Shared React components
│   ├── Navbar.tsx          # Responsive navigation
│   ├── Footer.tsx          # Site footer
│   ├── Logo.tsx            # SAIN logo component
│   ├── FadeIn.tsx          # Scroll-triggered animation wrapper
│   └── ChapterPlaceholder.tsx  # Template for upcoming chapters
└── app/
    ├── globals.css         # Global styles, Tailwind config
    └── layout.tsx          # Root layout (Navbar + Footer)
```

## Domain Setup

To deploy this site on your own domain (e.g., `sain.org`):

1. **Register the domain** at a registrar like [Namecheap](https://www.namecheap.com/), [Porkbun](https://porkbun.com/), or [Google Domains](https://domains.google/).
2. **Deploy to Vercel** (recommended):
   - Push this repo to GitHub
   - Go to [vercel.com](https://vercel.com) and import the repository
   - In Vercel project settings, add your custom domain
   - Update DNS at your registrar to point to Vercel (they provide instructions)
3. **Alternative: Netlify**
   - Push to GitHub
   - Import at [netlify.com](https://www.netlify.com/)
   - Add custom domain in site settings

## Updating Content

Content is stored directly in the page components as TypeScript data. To update:

- **Research publications**: Edit the `publications` array in `src/app/research/page.tsx`
- **Events**: Edit the `events` array in `src/app/chapters/groningen/page.tsx`
- **Team members**: Edit the `leadership` array in `src/app/team/page.tsx`
- **Chapter info**: Edit individual chapter pages in `src/app/chapters/`

## Adding a New Chapter

1. Create a new directory under `src/app/chapters/` (e.g., `leiden/`)
2. Create a `page.tsx` — either use the `ChapterPlaceholder` component or create a full page like Groningen's
3. Add the chapter to the navigation in `src/components/Navbar.tsx`
4. Add the chapter to the footer links in `src/components/Footer.tsx`
5. Add the chapter card to the home page in `src/app/page.tsx`

## License

All rights reserved. Safe AI Netherlands (SAIN).
