import type { Lang, ResumeData } from '../types/resume'
import { buildContacts, buildPersonal, dateRange } from './shared'
import { ContactIcon } from './icons'

function ProSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="tp-sec">
      <h2>{title}</h2>
      {children}
    </section>
  )
}

export function ProPreview({
  data,
  lang,
  showIcons,
}: {
  data: ResumeData
  lang: Lang
  showIcons?: boolean
}) {
  const { basics } = data
  const contact = buildContacts(basics, lang)
  const personal = buildPersonal(basics, lang)

  const sections: Array<{ key: string; title: string; render: () => React.ReactNode }> = []
  if (basics.summary) {
    sections.push({
      key: 'summary',
      title: lang === 'zh-CN' ? '个人简介' : 'Profile',
      render: () => <p className="tp-summary">{basics.summary}</p>,
    })
  }

  const edu = {
    key: 'education',
    title: lang === 'zh-CN' ? '教育经历' : 'Education',
    render: () =>
      data.education.map((item) => (
        <div className="tp-item" key={item.id}>
          <div className="tp-item-head">
            <h3>{[item.school, item.degree, item.major].filter(Boolean).join(' · ')}</h3>
            <span className="date">{dateRange(item.startDate, item.endDate)}</span>
          </div>
          {item.description && <p className="desc">{item.description}</p>}
        </div>
      )),
  }
  const work = {
    key: 'work',
    title: lang === 'zh-CN' ? '工作经历' : 'Experience',
    render: () =>
      data.work.map((item) => (
        <div className="tp-item" key={item.id}>
          <div className="tp-item-head">
            <h3>{[item.company, item.position].filter(Boolean).join(' · ')}</h3>
            <span className="date">{dateRange(item.startDate, item.endDate)}</span>
          </div>
          {item.description && <p className="desc">{item.description}</p>}
        </div>
      )),
  }
  const projects = {
    key: 'projects',
    title: lang === 'zh-CN' ? '项目经历' : 'Projects',
    render: () =>
      data.projects.map((item) => (
        <div className="tp-item" key={item.id}>
          <div className="tp-item-head">
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
      )),
  }
  const skills = {
    key: 'skills',
    title: lang === 'zh-CN' ? '专业技能' : 'Skills',
    render: () => (
      <ul className="tp-skills" style={{ margin: 0, padding: 0 }}>
        {data.skills.map((item) => (
          <li key={item.id}>
            {item.name}
            {item.level && ` · ${item.level}`}
          </li>
        ))}
      </ul>
    ),
  }

  const ordered = lang === 'zh-CN' ? [edu, work, projects, skills] : [work, projects, edu, skills]

  return (
    <div className="a4-page">
      <header className="tp-header">
        <div className="tp-id">
          <h1>{basics.name}</h1>
          {basics.title && <p className="tp-title">{basics.title}</p>}
        </div>
        {contact.length > 0 && (
          <ul className="tp-contact" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {contact.map((item) => (
              <li key={`${item.kind}-${item.value}`}>
                {showIcons && <ContactIcon kind={item.kind} />}
                <span className="lbl">{item.label}</span>
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noreferrer">
                    {item.value}
                  </a>
                ) : (
                  <span className="val">{item.value}</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </header>
      {personal.length > 0 && (
        <ul className="tp-personal" style={{ listStyle: 'none', margin: '10px 32px 0', padding: 0 }}>
          {personal.map((item) => (
            <li key={`${item.kind}-${item.value}`}>
              <span className="lbl">{item.label}</span>
              <span>{item.value}</span>
            </li>
          ))}
        </ul>
      )}
      <main className="tp-body">
        {sections.map((sec) => (
          <ProSection key={sec.key} title={sec.title}>
            {sec.render()}
          </ProSection>
        ))}
        {ordered.map((sec) => (
          <ProSection key={sec.key} title={sec.title}>
            {sec.render()}
          </ProSection>
        ))}
      </main>
    </div>
  )
}
