import { spawnSync } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const HOSTS = { zh: 'https://jianli.dalaobb.com', en: 'https://resume.dalaobb.com' }
const TAGS = { zh: 'zh-CN', en: 'en-US' }

const pages = [
  {
    page: '/',
    priority: '1.0',
    changefreq: 'weekly',
    files: ['index.html', 'src/pages/HomePage.tsx', 'functions/seo-data.mjs'],
  },
  {
    page: '/create',
    priority: '0.8',
    changefreq: 'weekly',
    files: ['create.html', 'src/pages/CreatePage.tsx', 'functions/seo-data.mjs'],
  },
  {
    page: '/privacy',
    priority: '0.4',
    changefreq: 'monthly',
    files: ['privacy.html', 'src/pages/PrivacyPage.tsx'],
  },
  ...['modern', 'classic', 'pro'].map((id) => ({
    page: `/template/${id}`,
    priority: '0.7',
    changefreq: 'monthly',
    files: [
      `template-${id}.html`,
      'src/pages/TemplatePage.tsx',
      `src/templates/${id}.tsx`,
      'functions/seo-data.mjs',
    ],
  })),
]

function lastModified(files) {
  const res = spawnSync('git', ['log', '-1', '--format=%cs', '--', ...files], { cwd: root, encoding: 'utf8' })
  if (res.status === 0 && res.stdout.trim()) return res.stdout.trim()
  const head = spawnSync('git', ['log', '-1', '--format=%cs'], { cwd: root, encoding: 'utf8' })
  if (head.status === 0 && head.stdout.trim()) return head.stdout.trim()
  return new Date().toISOString().slice(0, 10)
}

const alt = (loc, tag) =>
  `<xhtml:link rel="alternate" hreflang="${TAGS[tag]}" href="${HOSTS[tag]}${loc}" />`

function urlEntry(lang, page) {
  const { page: loc, priority, changefreq, date } = page
  const other = lang === 'zh' ? 'en' : 'zh'
  return `  <url>
    <loc>${HOSTS[lang]}${loc}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    ${alt(loc, lang)}
    ${alt(loc, other)}
    <xhtml:link rel="alternate" hreflang="x-default" href="${HOSTS.en}${loc}" />
  </url>`
}

for (const page of pages) page.date = lastModified(page.files)

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.flatMap((p) => [urlEntry('zh', p), urlEntry('en', p)]).join('\n')}
</urlset>
`

await mkdir(dist, { recursive: true })
await writeFile(path.join(dist, 'sitemap.xml'), xml)
for (const page of pages) console.log(`sitemap ${page.page} -> ${page.date}`)
console.log(`written ${path.join(dist, 'sitemap.xml')}`)
