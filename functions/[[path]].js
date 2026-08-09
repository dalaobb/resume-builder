import { buildHead } from './seo-data.mjs'

const SEO_BLOCK = /<!--SEO-->[\s\S]*?<!--\/SEO-->/

export async function onRequest(context) {
  const { request, env, next } = context
  const { hostname, pathname } = new URL(request.url)
  const isZh = hostname.includes('jianli')
  const lang = isZh ? 'zh' : 'en'
  const path = pathname.replace(/\/$/, '') || '/'
  const page = path === '/' ? 'index' : path.replace(/\.html$/, '').slice(1)

  if (page === 'create') {
    const res = await env.ASSETS.fetch(new URL('/create.html', request.url))
    if (!res.ok) return res
    const html = await res.text()
    const out = html
      .replace('lang="zh-CN"', `lang="${isZh ? 'zh-CN' : 'en-US'}"`)
      .replace(SEO_BLOCK, buildHead('/create', lang))
    const headers = new Headers(res.headers)
    headers.delete('content-length')
    return new Response(out, { status: res.status, headers })
  }

  if (page === 'index' || page === 'privacy') {
    return env.ASSETS.fetch(new URL(`/${lang}/${page}.html`, request.url))
  }

  return next()
}
