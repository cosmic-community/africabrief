# AfricaBrief

![App Preview](https://imgix.cosmicjs.com/cef807f0-671d-11f1-988a-8bfd3df1f841-autopilot-photo-1495020689067-958852a7765e-1781351314914.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

AfricaBrief is a modern, AI-powered news platform that curates the latest African news, rewrites it in clean AP Style with concise 10-word headlines, and distributes it through WhatsApp communities. This Next.js application provides a beautiful, responsive frontend for your curated news articles, category browsing, and WhatsApp broadcast tracking — all powered by [Cosmic](https://www.cosmicjs.com).

## Features

- 📰 **News Feed** — Browse all AI-curated, AP Style news articles with concise 10-word headlines
- 🏷️ **Category Browsing** — Filter and explore news by topic categories with emoji-based visual identity
- 💬 **WhatsApp Broadcasts** — View a complete history of news bundles shared to your WhatsApp community
- ✅ **AP Style Verification** — Visual indicators showing which articles have been verified for AP Style compliance
- 🖼️ **Optimized Imagery** — High-resolution responsive images via imgix optimization
- 📱 **Fully Responsive** — Beautiful experience across mobile, tablet, and desktop
- ⚡ **Server-Rendered** — Fast initial loads with Next.js 16 App Router and Server Components

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a2d434d12c1d9819739846f&clone_repository=6a2d444612c1d981973984a0)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create an ai agent that will curate latest news and share the news inside a WhatsApp community. The news will be rewritten using the AP Style including a 10-word headline."

### Code Generation Prompt

> Build a Next.js application for a website called "AfricaBrief". The content is managed in Cosmic CMS with the following object types: news-categories, news-articles, whatsapp-broadcasts. Create a beautiful, modern, responsive design with a homepage and pages for each content type.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Cosmic](https://www.cosmicjs.com) — Headless CMS ([docs](https://www.cosmicjs.com/docs))

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) or Node.js 18+
- A Cosmic account with a bucket containing `news-categories`, `news-articles`, and `whatsapp-broadcasts` object types

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Set up environment variables (these are provided automatically when cloning via Cosmic):

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all published news articles
const response = await cosmic.objects
  .find({ type: 'news-articles' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

const articles = response.objects

// Fetch a single article by slug
const { object } = await cosmic.objects
  .findOne({ type: 'news-articles', slug: 'my-article' })
  .depth(1)
```

## Cosmic CMS Integration

This app integrates with three Cosmic object types:

- **News Categories** (`news-categories`) — name, description, emoji
- **News Articles** (`news-articles`) — headline, body, source_name, source_url, category (object relationship), featured_image, curation_status, ap_style_verified, published_date
- **WhatsApp Broadcasts** (`whatsapp-broadcasts`) — broadcast_title, message_preview, articles_included (object relationships), community_name, sent_at, delivery_status

All data fetching happens server-side using the [Cosmic SDK](https://www.cosmicjs.com/docs) with the `depth` parameter to resolve connected objects like article categories and broadcast articles.

## Deployment Options

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables: `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`
4. Deploy

### Netlify

1. Connect your repository to [Netlify](https://netlify.com)
2. Set build command to `bun run build`
3. Add the same environment variables
4. Deploy

<!-- README_END -->