import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createServer } from 'vite'
import { buildHead } from '../functions/seo-data.mjs'

const lang = process.argv[2]
const fileLang = lang === 'zh' ? 'zh-CN' : 'en-US'
globalThis.__PRERENDER_LANG__ = fileLang

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')

const vite = await createServer({
  root,
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
})

try {
  const { default: PageShell } = await vite.ssrLoadModule('/src/components/PageShell.tsx')
  const { default: HomePage } = await vite.ssrLoadModule('/src/pages/HomePage.tsx')
  const { default: PrivacyPage } = await vite.ssrLoadModule('/src/pages/PrivacyPage.tsx')

  const assetsDir = path.join(dist, 'assets')
  const cssFiles = (await readdir(assetsDir)).filter((f) => f.endsWith('.css')).sort()
  const css = (await Promise.all(cssFiles.map((f) => readFile(path.join(assetsDir, f), 'utf8')))).join('\n')

  const jobs = [
    { page: '/', out: 'index.html', Component: HomePage },
    { page: '/privacy', out: 'privacy.html', Component: PrivacyPage },
  ]

  for (const job of jobs) {
    const body = renderToStaticMarkup(
      React.createElement(PageShell, { pathname: job.page }, React.createElement(job.Component)),
    )
    const html = `<!doctype html>
<html lang="${fileLang}">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#22c55e" />
${buildHead(job.page, lang)}
    <style>
${css}
    </style>
  </head>
  <body>
${body}
  </body>
</html>
`
    const outDir = path.join(dist, lang)
    await mkdir(outDir, { recursive: true })
    await writeFile(path.join(outDir, job.out), html)
    console.log(`prerendered dist/${lang}/${job.out}`)
  }
} finally {
  await vite.close()
}
