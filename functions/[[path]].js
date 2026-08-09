const META_ZH = `
<title>在线简历制作 - 免费简历模板，无需注册，数据仅存本地</title>
<meta name="description" content="免费在线简历制作工具。专业中文简历模板，实时预览，一键导出 PDF。无需注册，无需上传，所有数据仅保存在你自己的浏览器本地。" />
<link rel="canonical" href="https://jianli.dalaobb.com/" />
<link rel="alternate" hreflang="zh-CN" href="https://jianli.dalaobb.com/" />
<link rel="alternate" hreflang="en-US" href="https://resume.dalaobb.com/" />
<link rel="alternate" hreflang="x-default" href="https://resume.dalaobb.com/" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="在线简历制作" />
<meta property="og:url" content="https://jianli.dalaobb.com/" />
<meta property="og:title" content="在线简历制作 - 免费、无注册、数据仅存本地" />
<meta property="og:description" content="专业中文简历模板，实时预览，一键导出 PDF。无需注册，无需上传，数据仅保存在本地。" />
<meta property="og:image" content="https://jianli.dalaobb.com/og.png" />
<meta property="og:locale" content="zh_CN" />
<meta property="og:locale:alternate" content="en_US" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="在线简历制作 - 免费、无注册、数据仅存本地" />
<meta name="twitter:description" content="专业中文简历模板，实时预览，一键导出 PDF。数据仅保存在本地。" />
<meta name="twitter:image" content="https://jianli.dalaobb.com/og.png" />
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"WebSite","name":"在线简历制作","alternateName":"Resume Builder","url":"https://jianli.dalaobb.com/"}
</script>
`

const META_EN = `
<title>Resume Builder - Free Resume Templates, No Sign-up, 100% Local</title>
<meta name="description" content="Free online resume builder. Professional ATS-friendly templates, live preview, and PDF export. No sign-up, no upload - your data never leaves your browser." />
<link rel="canonical" href="https://resume.dalaobb.com/" />
<link rel="alternate" hreflang="en-US" href="https://resume.dalaobb.com/" />
<link rel="alternate" hreflang="zh-CN" href="https://jianli.dalaobb.com/" />
<link rel="alternate" hreflang="x-default" href="https://resume.dalaobb.com/" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Resume Builder" />
<meta property="og:url" content="https://resume.dalaobb.com/" />
<meta property="og:title" content="Resume Builder - Free, No Sign-up, 100% Local" />
<meta property="og:description" content="Professional ATS-friendly resume templates, live preview, and PDF export. No sign-up, no upload - your data stays on your device." />
<meta property="og:image" content="https://resume.dalaobb.com/og.png" />
<meta property="og:locale" content="en_US" />
<meta property="og:locale:alternate" content="zh_CN" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Resume Builder - Free, No Sign-up, 100% Local" />
<meta name="twitter:description" content="Professional ATS-friendly resume templates, live preview, and PDF export. Your data stays on your device." />
<meta name="twitter:image" content="https://resume.dalaobb.com/og.png" />
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"WebSite","name":"Resume Builder","alternateName":"在线简历制作","url":"https://resume.dalaobb.com/"}
</script>
`

function replaceMeta(html, lang) {
  const meta = lang === 'zh-CN' ? META_ZH : META_EN
  return html
    .replace('lang="zh-CN"', `lang="${lang}"`)
    .replace(/<!--SEO-->[\s\S]*?<!--\/SEO-->/, meta)
}

export { replaceMeta }

export async function onRequest(context) {
  const { request, next } = context
  const host = new URL(request.url).hostname
  const lang = host.includes('jianli') ? 'zh-CN' : 'en-US'
  const response = await next()
  const type = response.headers.get('content-type') || ''
  if (!type.includes('text/html')) return response
  const html = await response.text()
  const headers = new Headers(response.headers)
  headers.delete('content-length')
  return new Response(replaceMeta(html, lang), {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}
