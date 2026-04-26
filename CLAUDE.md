# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fuwari 是一个基于 Astro 构建的静态博客模板，使用 Tailwind CSS 和各种现代前端技术。项目采用现代的静态站点生成器架构，支持多种功能如搜索、代码高亮、响应式设计等。

## Development Workflow

### Common Commands

| Command | Description |
|---------|-------------|
| `pnpm install` | Install project dependencies |
| `pnpm dev` | Start local development server (runs at `localhost:4321`) |
| `pnpm build` | Build production site to `./dist/` directory |
| `pnpm preview` | Preview the built site locally |
| `pnpm check` | Run checks for errors in code |
| `pnpm format` | Format code using Biome |
| `pnpm new-post <filename>` | Create a new blog post (creates file in `src/content/posts/`) |

### Build Process
The build process involves:
1. Astro builds the static site from the content
2. Pagefind generates search index from the built site

### Linting
- Code is linted with Biome
- Run with: `pnpm lint`

### Type Checking
- TypeScript is used throughout the project
- Run with: `pnpm type-check`

## Architecture Overview

The project follows a modern static site generator architecture with the following key components:

1. **Content Layer**
   - Blog posts are written as Astro files in `src/content/posts/`
   - Each post has frontmatter for metadata configuration
   - Example: `src/content/posts/your-post.astro`

2. **Configuration Layer**
   - Main site configuration: `src/config.ts`
   - Defines site title, navigation, profile, and other settings
   - Supports multiple languages and themes

3. **Integration Layer**
   - `astro.config.mjs`: Manages plugins and integrations
   - Includes Tailwind CSS, Expressive Code for code blocks, icons, etc.
   - Configures markdown processing and rehype plugins

4. **Frontend Layer**
   - Astro components render the blog pages
   - Uses Svelte components where needed
   - Responsive design with Tailwind CSS classes

5. **Deployment Layer**
   - Built site is deployed to platforms like Vercel, Netlify, etc.
   - Search functionality is handled by Pagefind

## Key Files

- `src/config.ts`: Main configuration file
- `astro.config.mjs`: Integration and plugin configuration
- `src/content/posts/`: All blog post content
- `package.json`: Project dependencies and scripts

## Code Structure

```
.
├── src/
│   ├── config.ts          # Site configuration
│   ├── content/
│   │   └── posts/         # Blog posts (Astro files)
│   ├── plugins/           # Custom plugins for markdown and rehype
│   └── pages/             # Page components
├── .pnpm/                 # Dependency cache
├── package.json
├── astro.config.mjs
└── README.md
```

## Customization

To customize the blog:
1. Modify `src/config.ts` for site settings
2. Add or edit blog posts in `src/content/posts/`
3. Update plugins or styles in `astro.config.mjs`

The project uses modern development practices with TypeScript and follows a clean separation of concerns between content, configuration, and presentation layers.