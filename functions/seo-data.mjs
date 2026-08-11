export const DOMAINS = { zh: 'https://jianli.dalaobb.com', en: 'https://resume.dalaobb.com' }

const FAQ = {
  zh: [
    {
      q: '需要注册账号吗？',
      a: '不需要。本工具无账号、无登录，打开即可使用。',
    },
    {
      q: '我的数据会上传到服务器吗？',
      a: '不会。所有数据保存在你的浏览器本地（localStorage），关闭页面后仍在。',
    },
    {
      q: '支持中文和英文简历吗？',
      a: '支持。中英文使用同一套模板，并根据语言采用不同的排版策略。',
    },
    {
      q: '导出的 PDF 能用于投递吗？',
      a: '可以。PDF 为标准 A4 尺寸，文本可选、打印友好、易于 ATS 系统解析。',
    },
  ],
  en: [
    {
      q: 'Do I need an account?',
      a: 'No. There is no account and no login - just open the tool and start.',
    },
    {
      q: 'Is my data uploaded anywhere?',
      a: 'No. Everything is stored in your browser localStorage and never leaves your device.',
    },
    {
      q: 'Does it support Chinese and English?',
      a: 'Yes. Both languages share the same templates, with layout tuned per language.',
    },
    {
      q: 'Can I use the exported PDF for job applications?',
      a: 'Yes. The PDF is standard A4, selectable-text, print-friendly, and easy for ATS systems to parse.',
    },
  ],
}

const SEO = {
  '/': {
    zh: {
      title: '在线简历制作 - 免费简历模板，一键导出PDF，无需注册',
      description:
        '免费在线简历制作工具，提供专业个人简历模板，支持中文简历与英文简历，实时预览，一键导出高清PDF。无需注册、无需上传，求职简历数据仅保存在你的浏览器本地。',
      keywords:
        '简历模板,在线简历制作,简历生成器,免费简历模板,个人简历,求职简历,中英文简历,简历编辑器,一键导出PDF,无需注册',
      siteName: '简历制作',
      siteNameAlt: 'Resume Builder',
      ogTitle: '在线简历制作 - 免费简历模板，一键导出PDF',
      ogDescription: '专业个人简历模板，实时预览，一键导出PDF。无需注册、无需上传，数据仅保存在本地。',
    },
    en: {
      title: 'Resume Builder - Free Resume Templates, No Sign-up, 100% Local',
      description:
        'Free online resume maker with professional ATS-friendly resume templates. Live preview and PDF export. No sign-up, no upload - your data never leaves your browser.',
      keywords:
        'resume builder,resume templates,free resume maker,online resume editor,CV builder,ATS-friendly,no sign-up,PDF export',
      siteName: 'Resume Builder',
      siteNameAlt: '简历制作',
      ogTitle: 'Resume Builder - Free Resume Templates, 100% Local',
      ogDescription:
        'Professional ATS-friendly resume templates, live preview, and PDF export. No sign-up, no upload - your data stays on your device.',
    },
  },
  '/create': {
    zh: {
      title: '在线简历制作工具 - 免费编辑器，一键导出PDF，无需注册',
      description:
        '免费在线简历编辑器，自由编辑、实时预览、一键导出PDF。支持中英文简历与多套简历模板，无账号体系，简历数据仅保存在本地。',
      keywords: '简历编辑器,简历制作,免费简历模板,中英文简历,在线简历,一键导出PDF,无需注册',
      siteName: '简历制作',
      siteNameAlt: 'Resume Builder',
      ogTitle: '在线简历制作 - 免费编辑器，一键导出PDF',
      ogDescription: '自由编辑、实时预览、一键导出PDF。支持中英文简历与多套模板，数据仅保存在本地。',
    },
    en: {
      title: 'Resume Builder - Free Online Editor, No Sign-up, 100% Local',
      description:
        'Build a professional resume online. Edit freely, preview live, and export to PDF. ATS-friendly templates in multiple styles. No sign-up - your data stays on your device.',
      keywords: 'resume editor,resume maker,free resume templates,ATS-friendly,online resume,PDF export,no sign-up',
      siteName: 'Resume Builder',
      siteNameAlt: '简历制作',
      ogTitle: 'Resume Builder - Free Online Editor, 100% Local',
      ogDescription:
        'Edit freely, preview live, and export to PDF. ATS-friendly templates in multiple styles. Your data stays on your device.',
    },
  },
  '/privacy': {
    zh: {
      title: '隐私政策 - 在线简历制作',
      description:
        '在线简历制作隐私政策：无需注册、无需上传，所有简历数据仅保存在您的浏览器本地，本工具不收集任何个人数据。',
      keywords: '隐私政策,简历制作,简历数据安全,本地存储',
      siteName: '简历制作',
      siteNameAlt: 'Resume Builder',
      ogTitle: '隐私政策 - 在线简历制作',
      ogDescription: '无需注册、无需上传，简历数据仅保存在本地，本工具不收集任何个人数据。',
    },
    en: {
      title: 'Privacy Policy - Resume Builder',
      description:
        'Resume Builder privacy policy: no sign-up, no upload, no tracking. All resume data stays in your browser and is never transmitted.',
      keywords: 'privacy policy,resume builder,data safety,local storage',
      siteName: 'Resume Builder',
      siteNameAlt: '简历制作',
      ogTitle: 'Privacy Policy - Resume Builder',
      ogDescription:
        'No sign-up, no upload, no tracking. Resume data stays in your browser and is never transmitted.',
    },
  },
}

function faqSchema(page, lang) {
  if (page !== '/') return ''
  const items = FAQ[lang]
    .map(
      (f) =>
        `{"@type":"Question","name":${JSON.stringify(f.q)},"acceptedAnswer":{"@type":"Answer","text":${JSON.stringify(f.a)}}}`,
    )
    .join(',')
  return `<script type="application/ld+json">
{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[${items}]}
</script>
`
}

function softwareSchema(page, lang) {
  if (page !== '/create') return ''
  const d = SEO[page][lang]
  const url = DOMAINS[lang] + page
  const name = JSON.stringify(d.siteName)
  return `<script type="application/ld+json">
{"@context":"https://schema.org","@type":"SoftwareApplication","name":${name},"alternateName":${JSON.stringify(d.siteNameAlt)},"applicationCategory":"BusinessApplication","operatingSystem":"Web","inLanguage":["zh-CN","en-US"],"url":${JSON.stringify(url)},"offers":{"@type":"Offer","price":"0","priceCurrency":"CNY"}}
</script>
`
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
<meta name="keywords" content="${d.keywords}" />
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
${faqSchema(page, lang)}${softwareSchema(page, lang)}`
}
