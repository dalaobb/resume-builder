export const DOMAINS = { zh: 'https://jianli.dalaobb.com', en: 'https://resume.dalaobb.com' }

const SEO = {
  '/': {
    zh: {
      title: '在线简历制作 - 免费简历模板，无需注册，数据仅存本地',
      description:
        '免费在线简历制作工具。专业中文简历模板，实时预览，一键导出 PDF。无需注册，无需上传，所有数据仅保存在你自己的浏览器本地。',
      siteName: '在线简历制作',
      siteNameAlt: 'Resume Builder',
      ogTitle: '在线简历制作 - 免费、无注册、数据仅存本地',
      ogDescription: '专业中文简历模板，实时预览，一键导出 PDF。无需注册，无需上传，数据仅保存在本地。',
    },
    en: {
      title: 'Resume Builder - Free Resume Templates, No Sign-up, 100% Local',
      description:
        'Free online resume builder. Professional ATS-friendly templates, live preview, and PDF export. No sign-up, no upload - your data never leaves your browser.',
      siteName: 'Resume Builder',
      siteNameAlt: '在线简历制作',
      ogTitle: 'Resume Builder - Free, No Sign-up, 100% Local',
      ogDescription:
        'Professional ATS-friendly resume templates, live preview, and PDF export. No sign-up, no upload - your data stays on your device.',
    },
  },
  '/create': {
    zh: {
      title: '在线简历制作 - 免费编辑工具，无需注册，数据仅存本地',
      description:
        '在线制作专业中文简历。自由编辑、实时预览、一键导出 PDF，支持中英双语与多套模板。无需注册，无需上传，数据仅保存在本地。',
      siteName: '在线简历制作',
      siteNameAlt: 'Resume Builder',
      ogTitle: '在线简历制作 - 免费、无注册、数据仅存本地',
      ogDescription: '自由编辑、实时预览、一键导出 PDF。支持中英双语与多套模板，数据仅保存在本地。',
    },
    en: {
      title: 'Resume Builder - Free Online Editor, No Sign-up, 100% Local',
      description:
        'Build a professional resume online. Edit freely, preview live, and export to PDF. ATS-friendly templates in multiple styles. No sign-up - your data stays on your device.',
      siteName: 'Resume Builder',
      siteNameAlt: '在线简历制作',
      ogTitle: 'Resume Builder - Free, No Sign-up, 100% Local',
      ogDescription:
        'Edit freely, preview live, and export to PDF. ATS-friendly templates in multiple styles. Your data stays on your device.',
    },
  },
  '/privacy': {
    zh: {
      title: '隐私政策 - 在线简历制作',
      description:
        '在线简历制作隐私政策：无需注册、无需上传，所有简历数据仅保存在您的浏览器本地，本工具不收集任何个人数据。',
      siteName: '在线简历制作',
      siteNameAlt: 'Resume Builder',
      ogTitle: '隐私政策 - 在线简历制作',
      ogDescription: '无需注册、无需上传，简历数据仅保存在本地，本工具不收集任何个人数据。',
    },
    en: {
      title: 'Privacy Policy - Resume Builder',
      description:
        'Resume Builder privacy policy: no sign-up, no upload, no tracking. All resume data stays in your browser and is never transmitted.',
      siteName: 'Resume Builder',
      siteNameAlt: '在线简历制作',
      ogTitle: 'Privacy Policy - Resume Builder',
      ogDescription:
        'No sign-up, no upload, no tracking. Resume data stays in your browser and is never transmitted.',
    },
  },
}

export function buildHead(page, lang) {
  const d = SEO[page][lang]
  const base = DOMAINS[lang]
  const altBase = DOMAINS[lang === 'zh' ? 'en' : 'zh']
  const url = base + page
  const altUrl = altBase + page
  const langTag = lang === 'zh' ? 'zh-CN' : 'en-US'
  const altTag = lang === 'zh' ? 'en-US' : 'zh-CN'
  const locale = lang === 'zh' ? 'zh_CN' : 'en_US'
  const altLocale = lang === 'zh' ? 'en_US' : 'zh_CN'

  return `
<title>${d.title}</title>
<meta name="description" content="${d.description}" />
<link rel="canonical" href="${url}" />
<link rel="alternate" hreflang="${langTag}" href="${url}" />
<link rel="alternate" hreflang="${altTag}" href="${altUrl}" />
<link rel="alternate" hreflang="x-default" href="${altUrl}" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="${d.siteName}" />
<meta property="og:url" content="${url}" />
<meta property="og:title" content="${d.ogTitle}" />
<meta property="og:description" content="${d.ogDescription}" />
<meta property="og:image" content="${base}/og.png" />
<meta property="og:locale" content="${locale}" />
<meta property="og:locale:alternate" content="${altLocale}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${d.ogTitle}" />
<meta name="twitter:description" content="${d.ogDescription}" />
<meta name="twitter:image" content="${base}/og.png" />
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"WebSite","name":"${d.siteName}","alternateName":"${d.siteNameAlt}","url":"${url}"}
</script>
`
}
