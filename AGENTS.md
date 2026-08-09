# AGENTS.md

This project is a privacy-first online resume builder.

The goal is to provide a free professional resume creation tool that runs entirely in the browser.

Core principles:

- No account required
- No user registration
- No backend database
- No resume data upload
- All resume data stays on user's device


The product supports:

- Chinese resume creation
- English resume creation
- Resume editing
- Real-time preview
- Template switching
- PDF export

## Product Positioning


This is not a resume SaaS platform.

It is a lightweight privacy-focused browser tool.


Priorities:

1. Professional resume output
2. Privacy protection
3. Simple user experience
4. Fast loading
5. Print-friendly PDF


Avoid:

- User accounts
- Cloud storage
- Social features
- Complex backend systems


## Tech Stack


### Frontend

- Vite
- React
- TypeScript
- Tailwind CSS
- pnpm


### State Management

Use:

- Zustand


Resume data should be managed through centralized state.


### PDF Export

Use the browser print dialog (`window.print()`). The resume is rendered with the system font stack, so the printed PDF always shows text correctly (Chinese and English), stays small, and is guaranteed to open in any PDF reader.

Implementation:

- `src/components/PrintResume.tsx` renders a full-size copy of the current resume hidden on screen and shown only in print.
- `@media print` CSS in `src/index.css` hides the app UI and shows only the print copy.
- `@page { size: A4; margin: 0 }` produces an exact A4 page with no default margins.

Do not use `@react-pdf/renderer` or embed custom fonts for PDF export.


PDF output requirements:

- A4 size
- Printable
- Selectable text
- High quality


### Deployment

Target:

- Cloudflare Pages


## Domain Architecture


The application uses multiple subdomains with one codebase.


Chinese version:

jianli.dalaobb.com


English version:

resume.dalaobb.com



Rules:

- Do NOT create separate projects.
- Do NOT maintain separate codebases.
- Both domains must use the same React application.



MPA structure:

The app is a Vite multi-page app (MPA). Each page is an independent HTML file with its own entry point and static meta:

- `index.html` → home page → `src/entries/home.tsx`
- `create.html` → editor (SPA) → `src/entries/create.tsx`
- `privacy.html` → privacy policy → `src/entries/privacy.tsx`

- No client-side router. Navigation uses plain `<a href>` (full page loads). `Header.tsx` computes the active nav state from `window.location.pathname`.
- `src/components/PageShell.tsx` wraps every page (Header + app-shell div + `applyHtmlLang`). Entries mount `PageShell` + the page; the editor entry also renders `PrintResume` outside the shell.
- `vite.config.ts` declares the three inputs via `build.rollupOptions.input`.
- `public/_redirects` maps `/create` → `create.html` and `/privacy` → `privacy.html` (clean URLs).



SEO:

Per-page, per-domain metadata (title, description, canonical, hreflang, Open Graph, Twitter Card, JSON-LD) is injected server-side on Cloudflare Pages by the catch-all Pages Function `functions/[[path]].js`, which replaces the `<!--SEO-->...<!--/SEO-->` block in the served HTML based on the URL path and hostname (`jianli` → zh, `resume` → en; `/` → home, `/create` → editor, `/privacy` → privacy).

- The static default in each HTML file is the zh-CN block (used by local dev and any non-Pages hosting).
- `public/og.png` is the social share image (1200x630), regenerated with `pnpm run gen:og` (`scripts/gen-og.js`, devDependency `sharp`).
- `public/robots.txt` and `public/sitemap.xml` list both domains with hreflang alternates.
- After editing a page's SEO block in its HTML file, also update the matching entry in the `SEO` object inside `functions/[[path]].js`.



Language detection priority:

1. Domain hostname
2. User selected language
3. Browser language fallback



Example:


jianli.dalaobb.com

↓

zh-CN



resume.dalaobb.com

↓

en-US


## Project Structure


Recommended:


src/

├── components/

│   Reusable UI components


├── pages/

│   Page components


├── templates/

│   Resume templates


├── store/

│   Zustand state


├── i18n/

│   Translation files


├── types/

│   TypeScript types


├── utils/

│   Helper functions




## Routing Rules


Required routes:


/

Home page

Purpose:

- Product introduction
- Features
- Template preview
- FAQ
- Privacy explanation



/create

Resume editor


/privacy

Privacy policy



Do not put the editor directly on homepage.

## Editor Architecture


The editor uses a three-column desktop layout.


Desktop:


Left:

Resume input


Center:

Live resume preview


Right:

Template selector



Example:


Input

↓

Resume State

↓

Preview Renderer

↓

PDF Export


## Resume Data Architecture


Resume data must be separated from templates.


Correct:


ResumeData

↓

Template Component

↓

Rendered Resume



Incorrect:


Template contains hardcoded content.



Templates should only control:

- Layout
- Typography
- Colors
- Section arrangement


## Internationalization Rules


Chinese and English versions share the same codebase.


Do not hardcode UI text.


Wrong:

```tsx
<h1>
免费简历制作工具
</h1>
```

Correct:

```tsx
<h1>
{t("home.title")}
</h1>
```

Translation files:
- src/i18n/
- zh-CN.ts
- en-US.ts


## Resume Language Rules

Chinese and English resumes are not simple translations.

Chinese resume:
- Education may appear earlier
- Avatar can be optional
- More detailed personal information is acceptable
- May include: gender, age, native place, political status, expected salary, availability (start date)
- Links (GitHub, blog, portfolio, LinkedIn) are supported as multiple entries

English resume:
- Experience has higher priority
- No avatar by default
- Achievement-oriented writing
- ATS friendly
- Do NOT include personal data that is private or legally protected:
  - No age, gender, marital status, photo, ethnicity, or religion
  - No political affiliation
  - No expected salary (negotiated separately)
  - Availability / start date is optional and usually omitted
- Links (LinkedIn, GitHub, portfolio, personal site, blog) are strongly encouraged
- Headers should be kept minimal: name, title, email, phone, location, links

Templates should support different rendering strategies:
- Sensitive personal fields render only for zh-CN and are hidden for en-US
- Section ordering differs by language (education earlier in Chinese, experience earlier in English)


## Resume Design Rules

General principles:
- Content first
- Professional
- Minimal
- ATS friendly
- Print friendly

Avoid:
- Large background colors
- Excessive decoration
- Skill rating stars
- Complex charts

Icons:
- Icons are allowed only as an opt-in toggle, off by default
- Keep icons small, monochrome, text-colored, and limited to the contact area
- Never rely on icons for meaning; text must always accompany them

Recommended:
- White background
- Black text
- Gray secondary text
- Small accent color
- Clear hierarchy: name, section titles, item headings, body text

# Typography Rules

Use system fonts by default.

Preferred stack:


English:

Arial, Helvetica, sans-serif


Chinese:

Microsoft YaHei,
PingFang SC,
Noto Sans SC,
sans-serif


Priorities:

1. Readability
2. Print compatibility
3. Cross-platform consistency


Do not add custom fonts unless there is a strong reason.

## Color Rules

Default:

Background:
#FFFFFF

Primary text:
#111827

Secondary text:
#6B7280

Divider:
#E5E7EB

Accent:
#22C55E

Do not use large color blocks.

## Privacy Rules

Never implement:
- Backend resume storage
- User accounts
- Personal data collection
- Resume analytics

Allowed:
- localStorage
- IndexedDB
- Local file export

## Coding Rules

Use:
- TypeScript
- Functional React components
- React hooks
- Reusable components

Avoid:
- Class components
- Duplicate code
- Unnecessary dependencies

Before adding dependencies:

Evaluate whether native React or existing packages can solve the problem.


## UI Rules

The interface should be:
- Clean
- Modern
- Fast
- Desktop-first

Responsive behavior:
Desktop:
Three columns

Mobile:
Step-based workflow:
- Edit
- Preview
- Export

Do not force three columns on mobile.

## Development Workflow

Before coding:
- Read existing architecture.
- Reuse existing components.
- Follow current naming conventions.
- Keep changes minimal.

Before completing:
Check:
- TypeScript compilation
- Production build
- Responsive layout
- PDF export
- Language switching

## Commands (pnpm)

- `pnpm install` — install dependencies
- `pnpm run dev` — dev server
- `pnpm run typecheck` — TypeScript check (`tsc --noEmit`)
- `pnpm run lint` — oxlint (config in `.oxlintrc.json`)
- `pnpm run build` — production build (Vite + Tailwind v4)

Verify order: `typecheck` → `lint` → `build`. There is no test framework.

Notes for agents:
- PDF export uses the browser print dialog (`src/utils/pdf.ts` → `window.print()`). No font files are shipped: the resume is printed with the system font stack. The `@media print` CSS in `src/index.css` hides the app and shows the full-size print copy from `src/components/PrintResume.tsx`.
- Do NOT use `@react-pdf/renderer` or embed custom fonts (e.g. `@fontsource/*`) for PDF export or the UI.
- `language.ts` `detectLanguage()` maps `jianli.*` → zh-CN and `resume.*` → en-US (domain priority).