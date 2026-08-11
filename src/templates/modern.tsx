import type { Lang, ResumeData } from '../types/resume'
import { buildContacts, buildHeadline, buildPersonal, dateRange } from './shared'
import { ContactIcon } from './icons'

export function ModernPreview({
  data,
  lang,
  showIcons,
}: {
  data: ResumeData
  lang: Lang
  showIcons?: boolean
}) {
  const { basics } = data
  const headline = buildHeadline(basics)
  const contact = buildContacts(basics, lang)
  const personal = buildPersonal(basics, lang).filter((i) => !headline || i.kind !== 'location')

  return (
    <div className="a4-page">
      <header className="tm-header">
        <h1>{basics.name}</h1>
        {headline && <p className="tm-title">{headline}</p>}
        {personal.length > 0 && (
          <ul className="tm-personal">
            {personal.map((item) => (
              <li key={`${item.kind}-${item.value}`}>
                <span className="lbl">{item.label}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        )}
      </header>
      <div className="tm-body">
        <aside className="tm-side">
          <section className="tm-sec">
            <h2>
              <span className="dot" />
              {lang === 'zh-CN' ? '联系方式' : 'Contact'}
            </h2>
            <ul className="tm-contact" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {contact.map((item) => (
                <li key={`${item.kind}-${item.value}`}>
                  <span className="lbl">
                    {showIcons && <ContactIcon kind={item.kind} />}
                    {item.label}
                  </span>
                  {item.href ? (
                    <a className="val" href={item.href} target="_blank" rel="noreferrer">
                      {item.value}
                    </a>
                  ) : (
                    <span className="val">{item.value}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section className="tm-sec">
            <h2>
              <span className="dot" />
              {lang === 'zh-CN' ? '专业技能' : 'Skills'}
            </h2>
            {data.skills.map((item) => (
              <div className="tm-skill" key={item.id}>
                <span>{item.name}</span>
                {item.level && <span className="lvl">{item.level}</span>}
              </div>
            ))}
          </section>

          <section className="tm-sec">
            <h2>
              <span className="dot" />
              {lang === 'zh-CN' ? '教育经历' : 'Education'}
            </h2>
            {data.education.map((item) => (
              <div className="tm-edu" key={item.id}>
                <div className="name">
                  {[item.school, item.degree, item.major].filter(Boolean).join(' · ')}
                </div>
                <div className="meta">{dateRange(item.startDate, item.endDate)}</div>
                {item.description && <p className="desc">{item.description}</p>}
              </div>
            ))}
          </section>
        </aside>

        <main className="tm-main">
          {basics.summary && (
            <section className="tm-sec">
              <h2>
                <span className="dot" />
                {lang === 'zh-CN' ? '个人简介' : 'Summary'}
              </h2>
              <p className="tm-summary">{basics.summary}</p>
            </section>
          )}

          <section className="tm-sec">
            <h2>
              <span className="dot" />
              {lang === 'zh-CN' ? '工作经历' : 'Experience'}
            </h2>
            {data.work.map((item) => (
              <div className="tm-item" key={item.id}>
                <div className="tm-item-head">
                  <h3>{[item.company, item.position].filter(Boolean).join(' · ')}</h3>
                  <span className="date">{dateRange(item.startDate, item.endDate)}</span>
                </div>
                {item.description && <p className="desc">{item.description}</p>}
              </div>
            ))}
          </section>

          <section className="tm-sec">
            <h2>
              <span className="dot" />
              {lang === 'zh-CN' ? '项目经历' : 'Projects'}
            </h2>
            {data.projects.map((item) => (
              <div className="tm-item" key={item.id}>
                <div className="tm-item-head">
                  <h3>{[item.name, item.role].filter(Boolean).join(' · ')}</h3>
                  <span className="date">{dateRange(item.startDate, item.endDate)}</span>
                </div>
                {item.link && (
                  <a className="link" href={item.link} target="_blank" rel="noreferrer">
                    {item.link}
                  </a>
                )}
                {item.description && <p className="desc">{item.description}</p>}
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  )
}
