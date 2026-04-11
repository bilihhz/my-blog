
这是我的fuwari blog，说中文，少废话，禁止删任何文件，要删先找我同意或者备份一份  

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is  fuwari blog built with Astro, deployed to Cloudflare Pages. It features a clean design with smooth page transitions, expressive code blocks, and built-in SEO optimization.  
大部分源码均位于/src文件夹  
https://hhz114514.qzz.io/

## Development Commands
你运行在windows的git bash里
- `pnpm dev` or `pnpm start`  Start development server on localhost:4321（主用pnpm dev）
- `pnpm new-post <filename(also title)>`  Create a new blog post with frontmatter.我告诉你的都是文章标题，文件名自己翻译成英文，就几个关键词然后用`-`连接就行。    
- 上传代码到github仓库（已与cloudflare pages关联，上传到github后cloudflare会自动部署）`git add .`然后`git commit -t "这里随便填"`然后`git push`  
下面这些命令很少用到  
- `pnpm build`  Build for production (includes Pagefind indexing)（写完代码不用build，我自己搞）
- `pnpm preview`  Preview production build locally
- `pnpm check`  Run Astro type checking
- `pnpm type-check`  Run TypeScript type checking
- `pnpm lint`  Run Biome linter (auto-fixes)
- `pnpm format`  Format code with Biome


## Architecture

### Technology Stack
- **Framework**: Astro 5 with Cloudflare Pages adapter
- **Styling**: Tailwind CSS with custom typography plugin
- **Components**: Svelte components with TypeScript
- **Content**: Markdown files in `src/content/posts/` with frontmatter validation
- **Routing**: File-based routing with trailing slash enabled
- **SEO**: Built-in with astro-sitemap, rehype plugins for auto-linking

### Key Plugins & Integrations

**Markdown Processing:**
- Remark plugins for math, reading time, GitHub admonitions, custom directives
- Rehype plugins for KaTeX, slug generation, custom components (GitHub cards, URL cards)
- Support for custom admonition components (note, tip, important, caution, warning)
- Auto-generated anchor links for headings

**Code Display:**
- Expressive Code with custom themes and plugins
- Collapsible sections, line numbers, language badges
- Custom copy buttons
- Code highlighting with JetBrains Mono font

**Navigation & UX:**
- Swup for smooth page transitions
- Table of contents support
- Reading time calculation
- Post series/navigation with prev/next links

### Content Structure
让你写新文章时可以看眼以前文章格式什么的  
Posts are stored in `src/content/posts/` with frontmatter containing:
- Standard fields: title, description, published date, tags, category
- Draft status support
- Pinned posts for featured content
- Language support
- Internal navigation fields (prev/next posts)

### Build Output
好久没build了，都是以前的output，上传代码后cloudflare会在云端build，不用管这里
- Production build outputs to `dist/`
- Pagefind generates search index in `dist/pagefind/`
- Sitemap automatically generated
- Static assets optimized and hashed

### Deployment

Configured for Cloudflare Pages deployment via Wrangler. The `wrangler.jsonc` specifies:
- Build output directory
- Compatibility date
- Pages configuration

### Notable Features

- Custom plugin system for markdown processing
- Email protection for contact links
- Image width processing
- GitHub and URL card components
- Responsive design with mobile-first approach
- Dark mode support (via CSS variables)

### Customization Points

- 主配置文件src/config.ts
- Theme colors defined in CSS variables
- Code block styling in expressiveCode configuration
- Component overrides in astro.config.mjs
- Frontmatter schema validation in `src/content/config.ts`