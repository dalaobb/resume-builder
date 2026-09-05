function gaSnippet(gaId) {
  if (!gaId) return ''
  return `    <script async src="https://www.googletagmanager.com/gtag/js?id=${gaId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', '${gaId}');
    </script>
`
}

function injectGa(html, gaId) {
  if (!gaId) return html
  return html.replace('</head>', gaSnippet(gaId) + '  </head>')
}

function stripLength(headers) {
  const h = new Headers(headers)
  h.delete('content-length')
  return h
}

export async function onRequest(context) {
  const { request, env, next } = context
  const { hostname, pathname } = new URL(request.url)
  const isZh = hostname.includes('jianli')
  const lang = isZh ? 'zh' : 'en'
  const path = pathname.replace(/\/$/, '') || '/'
  const page = path === '/' ? 'index' : path.replace(/\.html$/, '').slice(1)
  const gaId = env.GA4_ID

  if (page === 'index' || page === 'create' || page === 'privacy') {
    const res = await env.ASSETS.fetch(new URL(`/${lang}/${page}.html`, request.url))
    if (!res.ok || !gaId) return res
    const html = await res.text()
    return new Response(injectGa(html, gaId), { status: res.status, headers: stripLength(res.headers) })
  }

  const templateMatch = /^template\/(modern|classic|pro)$/.exec(page)
  if (templateMatch) {
    const res = await env.ASSETS.fetch(new URL(`/${lang}/template-${templateMatch[1]}.html`, request.url))
    if (!res.ok || !gaId) return res
    const html = await res.text()
    return new Response(injectGa(html, gaId), { status: res.status, headers: stripLength(res.headers) })
  }

  return next()
}
