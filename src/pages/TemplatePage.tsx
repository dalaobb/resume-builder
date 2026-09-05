import { useI18n } from '../i18n'
import { defaultResume } from '../data/defaultResume'
import { getTemplate, templates } from '../templates'

export type TemplateId = 'modern' | 'classic' | 'pro'

export default function TemplatePage({ templateId }: { templateId: TemplateId }) {
  const { t, msg, lang } = useI18n()
  const tmpl = getTemplate(templateId)
  const Preview = tmpl.Preview
  const resume = defaultResume(lang)
  const cp = msg.landing[templateId]
  const others = templates.filter((x) => x.id !== templateId)

  return (
    <div className="flex-1">
      <section className="bg-gradient-to-b from-emerald-50/80 to-canvas px-4 pb-10 pt-8 text-center md:pb-14 md:pt-12">
        <a href="/" className="text-xs text-ink-muted transition hover:text-accent-dark">
          &larr; {t('common.backHome')}
        </a>
        <h1 className="mx-auto mt-3 max-w-2xl text-2xl font-bold leading-tight text-ink md:text-4xl">
          {cp.heading}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-ink-muted md:text-base">{cp.lead}</p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`/create?template=${templateId}`}
            className="rounded-lg bg-accent px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-dark"
          >
            {t('landing.useThis')}
          </a>
          <a
            href="/create"
            className="rounded-lg border border-line bg-white px-7 py-3 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent-dark"
          >
            {t('common.startCreate')}
          </a>
        </div>
        <p className="mt-3 text-xs text-ink-faint">{t('landing.freeNote')}</p>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-10 md:py-14">
        <div className="flex justify-center overflow-x-auto">
          <div className="w-[73.5mm] shrink-0 overflow-hidden rounded-lg border border-line bg-white shadow-sm md:w-[105mm]">
            <div className="h-[103.95mm] overflow-hidden md:h-[148.5mm]">
              <div className="w-[210mm] origin-top-left scale-[0.35] md:scale-[0.5]">
                <Preview data={resume} lang={lang} />
              </div>
            </div>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-ink-faint">
          {t('landing.previewNote', { name: t(tmpl.nameKey) })}
        </p>
      </section>

      <section className="mx-auto max-w-2xl px-4 pb-12 md:pb-16">
        <div className="space-y-4 text-sm leading-relaxed text-ink-muted md:text-[15px]">
          {cp.paras.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <h2 className="mt-10 text-lg font-bold text-ink">{t('landing.suitedTitle')}</h2>
        <ul className="mt-4 space-y-2">
          {cp.suited.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-ink-muted">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-line bg-white px-4 py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-xl font-bold text-ink md:text-2xl">{t('landing.more')}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {others.map((t2) => (
              <a
                key={t2.id}
                href={`/template/${t2.id}`}
                className="group flex items-center justify-between rounded-xl border border-line bg-canvas px-5 py-4 transition hover:border-accent"
              >
                <span className="text-sm font-semibold text-ink group-hover:text-accent-dark">
                  {msg.landing[t2.id as TemplateId].heading}
                </span>
                <span className="text-accent">&rarr;</span>
              </a>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a
              href={`/create?template=${templateId}`}
              className="inline-block rounded-lg bg-accent px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-dark"
            >
              {t('common.startCreate')}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
