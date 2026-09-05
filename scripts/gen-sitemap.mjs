import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const outFile = path.join(root, 'public', 'sitemap.xml')
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

function run(args) {
  return spawnSync('git', args, { cwd: root, encoding: 'utf8' })
}

const insideGit = run(['rev-parse', '--is-inside-work-tree'])
if (insideGit.status !== 0) {
  console.log('no git history available - keeping committed public/sitemap.xml as-is')
} else {
  function lastModified(files) {
    const res = run(['log', '-1', '--format=%cs', '--', ...files])
    if (res.status === 0 && res.stdout.trim()) return res.stdout.trim()
    const head = run(['log', '-1', '--format=%cs'])
    return head.status === 0 && head.stdout.trim() ? head.stdout.trim() : new Date().toISOString().slice(0, 10)
  }

  for (const page of pages) page.date = lastModified(page.files)

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

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.flatMap((p) => [urlEntry('zh', p), urlEntry('en', p)]).join('\n')}
</urlset>
`

  await mkdir(path.dirname(outFile), { recursive: true })
  await writeFile(outFile, xml)
  console.log(`regenerated ${path.relative(root, outFile)}`)
  if (existsSync(dist)) {
    await writeFile(path.join(dist, 'sitemap.xml'), xml)
    console.log(`copied to dist/sitemap.xml`)
  }
  for (const page of pages) console.log(`sitemap ${page.page} -> ${page.date}`)
}
