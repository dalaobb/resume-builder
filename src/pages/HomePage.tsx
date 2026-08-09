import { useI18n } from '../i18n'
import { useResumeStore } from '../store/useResumeStore'
import { templates } from '../templates'
import Footer from '../components/Footer'

export default function HomePage() {
  const { t, lang, msg } = useI18n()
  const resume = useResumeStore((s) => s.resume)
  const showIcons = useResumeStore((s) => s.showIcons)

  const features = msg.home.features
  const how = msg.home.how
  const faqs = msg.home.faqs

  return (
    <div className="flex-1">
      {/* Hero */}
      <section className="bg-gradient-to-b from-emerald-50/80 to-canvas px-4 py-16 text-center md:py-24">
        <h1 className="mx-auto max-w-2xl text-3xl font-bold leading-tight text-ink md:text-5xl">
          {t('home.heroTitle')}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-ink-muted md:text-base">{t('home.heroSub')}</p>
        <a
          href="/create"
          className="mt-8 inline-block rounded-lg bg-accent px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-dark"
        >
          {t('common.startCreate')}
        </a>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-4 py-14 md:py-20">
        <h2 className="text-center text-2xl font-bold text-ink">{t('home.featuresTitle')}</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {features.map((f) => (
            <div key={f.title} className="rounded-xl border border-line bg-white p-5">
              <div className="mb-2 h-2 w-8 rounded-full bg-accent" />
              <h3 className="font-semibold text-ink">{f.title}</h3>
              <p className="mt-1 text-sm text-ink-muted">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Templates preview */}
      <section className="border-y border-line bg-white py-14 md:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-2xl font-bold text-ink">{t('home.templatesTitle')}</h2>
          <p className="mt-2 text-center text-sm text-ink-muted">{t('home.templatesDesc')}</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {templates.map((tmpl) => {
              const Preview = tmpl.Preview
              return (
                <div key={tmpl.id} className="overflow-hidden rounded-xl border border-line">
                  <div className="flex justify-center overflow-hidden bg-canvas p-6">
                    <div className="h-[77.2mm] w-[54.6mm] overflow-hidden">
                      <div className="w-[210mm] origin-top-left scale-[0.26]">
                        <Preview data={resume} lang={lang} showIcons={showIcons} />
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-line p-3 text-center text-sm font-medium text-ink">
                    {t(tmpl.nameKey)}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-5xl px-4 py-14 md:py-20">
        <h2 className="text-center text-2xl font-bold text-ink">{t('home.howTitle')}</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {how.map((step, i) => (
            <div key={step.title} className="rounded-xl border border-line bg-white p-5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-sm font-bold text-accent-dark">
                {i + 1}
              </span>
              <h3 className="mt-3 font-semibold text-ink">{step.title}</h3>
              <p className="mt-1 text-sm text-ink-muted">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 pb-14 md:pb-20">
        <h2 className="text-center text-2xl font-bold text-ink">{t('home.faqTitle')}</h2>
        <div className="mt-8 space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-xl border border-line bg-white">
              <summary className="cursor-pointer list-none px-5 py-4 font-medium text-ink transition hover:text-accent-dark">
                {f.q}
              </summary>
              <p className="px-5 pb-4 text-sm text-ink-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Export guide */}
      <section className="mx-auto max-w-5xl px-4 pb-14 md:pb-20">
        <h2 className="text-center text-2xl font-bold text-ink">{t('editor.exportTipsTitle')}</h2>
        <div className="mx-auto mt-8 max-w-2xl rounded-xl border border-line bg-white p-6">
          <ul className="space-y-2.5 text-sm text-ink-muted">
            <li>{t('editor.exportTipDesktop')}</li>
            <li>{t('editor.exportTipIos')}</li>
            <li>{t('editor.exportTipAndroid')}</li>
          </ul>
        </div>
      </section>

      {/* Privacy + CTA */}
      <section className="border-t border-line bg-gradient-to-b from-emerald-50/60 to-canvas px-4 py-14 text-center md:py-20">
        <h2 className="text-2xl font-bold text-ink">{t('home.privacyTitle')}</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-ink-muted">{t('home.privacyDesc')}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="/create"
            className="rounded-lg bg-accent px-8 py-3 text-sm font-semibold text-white transition hover:bg-accent-dark"
          >
            {t('common.startCreate')}
          </a>
          <a
            href="/privacy"
            className="rounded-lg border border-line bg-white px-8 py-3 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent-dark"
          >
            {t('common.navPrivacy')}
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
