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
      title: 'Resume Builder Online - Free Resume Editor, No Sign-up',
      description:
        'Create a resume online free with a professional ATS-friendly resume builder. Edit your resume online, preview live, and export a clean PDF - no sign-up, no upload, 100% local.',
      keywords:
        'resume builder online,online resume builder,edit resume online,create resume online free,resume templates,free resume maker,online resume editor,ATS-friendly,no sign-up,PDF export',
      siteName: 'Resume Builder',
      siteNameAlt: '简历制作',
      ogTitle: 'Resume Builder Online - Free Resume Editor',
      ogDescription:
        'Create a resume online free with professional ATS-friendly templates, live preview and PDF export. No sign-up - your data stays on your device.',
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
      title: 'Edit Resume Online - Free Resume Editor, No Sign-up',
      description:
        'Edit your resume online for free. ATS-friendly resume templates, live preview and one-click A4 PDF export. No sign-up, no upload - your resume data stays on your device.',
      keywords:
        'edit resume online,resume editing online,resume editor,online resume builder,free resume maker,resume templates,ATS-friendly,PDF export,no sign-up',
      siteName: 'Resume Builder',
      siteNameAlt: '简历制作',
      ogTitle: 'Edit Resume Online - Free Resume Editor',
      ogDescription:
        'Edit your resume online for free with ATS-friendly templates, live preview and PDF export. No sign-up - your data stays on your device.',
    },
  },
  '/privacy': {
    zh: {
      title: '隐私政策 - 在线简历制作',
      description:
        '在线简历制作隐私政策：无需注册、无需上传，所有简历数据仅保存在您的浏览器本地；仅使用 Google Analytics 匿名统计页面访问。',
      keywords: '隐私政策,简历制作,简历数据安全,本地存储',
      siteName: '简历制作',
      siteNameAlt: 'Resume Builder',
      ogTitle: '隐私政策 - 在线简历制作',
      ogDescription: '无需注册、无需上传，简历数据仅保存在本地；仅使用 Google Analytics 匿名统计访问量。',
    },
    en: {
      title: 'Privacy Policy - Resume Builder',
      description:
        'Resume Builder privacy policy: no sign-up, no upload. Resume data stays in your browser; we only use Google Analytics for anonymous, aggregated visit statistics.',
      keywords: 'privacy policy,resume builder,data safety,local storage',
      siteName: 'Resume Builder',
      siteNameAlt: '简历制作',
      ogTitle: 'Privacy Policy - Resume Builder',
      ogDescription:
        'No sign-up, no upload. Resume data stays in your browser; only anonymous Google Analytics visit statistics are collected.',
    },
  },
  '/template/modern': {
    zh: {
      title: '现代简历模板 - 免费在线编辑，无需注册',
      description:
        '免费现代简历模板：两栏式左右排版、侧栏展示技能与教育经历，在线编辑、实时预览、一键导出高清 PDF。无需注册、无需上传，简历数据仅保存在本地。',
      keywords: '现代简历模板,现代简约简历模板,免费简历模板,在线简历制作,简历编辑器,一键导出PDF,无需注册',
      siteName: '简历制作',
      siteNameAlt: 'Resume Builder',
      ogTitle: '现代简历模板 - 免费在线编辑',
      ogDescription: '免费现代简历模板，两栏式排版，实时预览、一键导出 PDF，无需注册、数据仅保存在本地。',
    },
    en: {
      title: 'Modern Resume Template - Edit Online Free, No Sign-up',
      description:
        'Modern two-column resume template for product, design and tech roles. Edit it online free with live preview and PDF export - no sign-up, 100% local.',
      keywords:
        'modern resume template,modern resume templates free,online resume builder,free resume editor,ATS-friendly resume template,no sign-up,PDF export',
      siteName: 'Resume Builder',
      siteNameAlt: '简历制作',
      ogTitle: 'Modern Resume Template - Edit Online Free',
      ogDescription:
        'Modern two-column resume template with live preview and PDF export. No sign-up - your data stays on your device.',
    },
  },
  '/template/classic': {
    zh: {
      title: '经典简历模板 - 免费在线编辑，无需注册',
      description:
        '免费经典简历模板：居中单栏版式、正式稳重，适合传统行业与正式投递；在线编辑、实时预览、一键导出高清 PDF，无需注册、数据仅保存在本地。',
      keywords: '经典简历模板,传统简历模板,单栏简历模板,免费简历模板,在线简历制作,一键导出PDF,无需注册',
      siteName: '简历制作',
      siteNameAlt: 'Resume Builder',
      ogTitle: '经典简历模板 - 免费在线编辑',
      ogDescription: '免费经典简历模板，单栏居中版式、正式稳重，实时预览、一键导出 PDF，无需注册、数据仅保存在本地。',
    },
    en: {
      title: 'Classic Resume Template - Edit Online Free, No Sign-up',
      description:
        'Formal single-column classic resume template for finance, education, HR and government roles. Edit it online free with live preview and PDF export - no sign-up, 100% local.',
      keywords:
        'classic resume template,traditional resume template,single column resume template,free resume template,online resume builder,ATS-friendly,no sign-up,PDF export',
      siteName: 'Resume Builder',
      siteNameAlt: '简历制作',
      ogTitle: 'Classic Resume Template - Edit Online Free',
      ogDescription:
        'Formal single-column classic resume template with live preview and PDF export. No sign-up - your data stays on your device.',
    },
  },
  '/template/pro': {
    zh: {
      title: '高级简历模板 - 免费在线编辑，无需注册',
      description:
        '免费高级简历模板：商务专业风、突出管理与项目成果，适合资深与管理级求职者；在线编辑、实时预览、一键导出高清 PDF，无需注册、数据仅保存在本地。',
      keywords: '高级简历模板,商务简历模板,专业简历模板,免费简历模板,在线简历制作,一键导出PDF,无需注册',
      siteName: '简历制作',
      siteNameAlt: 'Resume Builder',
      ogTitle: '高级简历模板 - 免费在线编辑',
      ogDescription: '免费高级简历模板，商务专业风、突出管理与项目成果，实时预览、一键导出 PDF，无需注册、数据仅保存在本地。',
    },
    en: {
      title: 'Pro Resume Template - Edit Online Free, No Sign-up',
      description:
        'Executive-style pro resume template that highlights leadership and results. Edit it online free with live preview and PDF export - no sign-up, 100% local.',
      keywords:
        'pro resume template,professional resume template,executive resume template,senior resume template,online resume builder,ATS-friendly,no sign-up,PDF export',
      siteName: 'Resume Builder',
      siteNameAlt: '简历制作',
      ogTitle: 'Pro Resume Template - Edit Online Free',
      ogDescription:
        'Executive-style pro resume template with live preview and PDF export. No sign-up - your data stays on your device.',
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

function breadcrumbSchema(page, lang) {
  if (!page.startsWith('/template/')) return ''
  const d = SEO[page][lang]
  const home = DOMAINS[lang] + '/'
  const url = DOMAINS[lang] + page
  return `<script type="application/ld+json">
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":${JSON.stringify(d.siteName)},"item":${JSON.stringify(home)}},{"@type":"ListItem","position":2,"name":${JSON.stringify(d.title)},"item":${JSON.stringify(url)}}]}
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
${faqSchema(page, lang)}${softwareSchema(page, lang)}${breadcrumbSchema(page, lang)}`
}
