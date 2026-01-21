# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Rafael Carrión built with Astro, designed to look and function like VS Code. It features an IDE-style interface with file explorer, tabs, syntax highlighting, and an AI chat assistant powered by Google's Gemini API.

## Commands

```bash
# Development
npm run dev          # Start dev server (astro dev)
npm run build        # Type check and build (astro check && astro build)
npm run preview      # Preview production build

# Code Quality
npm run format       # Format code with Prettier
npm run format:check # Check formatting without changes
```

## Architecture

### Core Structure

- **Astro SSR** with Node.js adapter (`@astrojs/node`) for server-side rendering
- **Tailwind CSS** for styling with custom VS Code Dark+ theme colors defined in `tailwind.config.mjs`
- **TypeScript** with path aliases: `@/*`, `@components/*`, `@layouts/*`, `@styles/*`

### Key Files

- `src/layouts/IDELayout.astro` - Main layout wrapping all pages, includes loading screen, mobile navigation, activity bar, sidebar, editor area, status bar, game modal, and ChatPanel
- `src/pages/index.astro` - Single-page app with all content sections rendered as "files" (README.md, about.md, experience.json, skills.ts, education.yaml, contact.tsx)
- `src/data/resume.ts` - Single source of truth for all resume data; exports typed interfaces and helper functions
- `src/styles/global.css` - Tailwind config plus extensive custom component styles for IDE UI

### AI Chat System

The chat feature allows visitors to ask questions about Rafael's background:

1. **Client** (`src/components/ChatPanel.astro`) - Slide-in panel with chat UI, handles conversation history in `localStorage`, sends requests to `/api/chat`
2. **API** (`src/pages/api/chat.ts`) - Server-side endpoint that validates/sanitizes input, applies rate limiting, proxies to Gemini
3. **Gemini Client** (`src/lib/gemini.ts`) - Generates system prompt from resume data, manages conversation context
4. **Rate Limiter** (`src/lib/rate-limiter.ts`) - In-memory rate limiting per session (50/day) and per IP (100/hour)

### Environment Variables

```
GEMINI_API_KEY           # Required for chat functionality
GEMINI_MODEL             # Optional, defaults to gemini-1.5-flash
CHAT_RATE_LIMIT_SESSION  # Optional, defaults to 50
CHAT_RATE_LIMIT_IP_HOURLY # Optional, defaults to 100
```

### Design System

Custom Tailwind color palette under `ide.*` namespace maps VS Code Dark+ theme colors:
- `ide-bg`, `ide-sidebar`, `ide-editor` - Background colors
- `ide-accent`, `ide-statusBar` - Blue accent colors (#007acc)
- `ide-text`, `ide-textMuted`, `ide-textBright` - Text colors
- Syntax colors: `ide-keyword`, `ide-string`, `ide-number`, `ide-type`, `ide-function`, `ide-variable`, `ide-comment`

### Mobile Support

The layout adapts for mobile with:
- Collapsible sidebar with hamburger menu
- Mobile tab selector dropdown
- Touch-friendly controls
- Responsive breakpoints in global.css
