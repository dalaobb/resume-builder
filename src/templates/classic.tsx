import type { Lang, ResumeData } from '../types/resume'
import { buildContacts, buildHeadline, buildPersonal, dateRange } from './shared'
import { ContactIcon } from './icons'

function ClassicSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="tc-sec">
      <h2>{title}</h2>
      {children}
    </section>
  )
}

export function ClassicPreview({
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
  const contact = [
    ...buildPersonal(basics, lang).filter((i) => !headline || i.kind !== 'location'),
    ...buildContacts(basics, lang),
  ]

  const sections: Array<{
    key: string
    title: string
    render: () => React.ReactNode
  }> = []
  if (basics.summary) {
    sections.push({
      key: 'summary',
      title: lang === 'zh-CN' ? '个人简介' : 'SUMMARY',
      render: () => <p className="tc-summary">{basics.summary}</p>,
    })
  }
  const edu = {
    key: 'education',
    title: lang === 'zh-CN' ? '教育经历' : 'EDUCATION',
    render: () =>
      data.education.map((item) => (
        <div className="tc-item" key={item.id}>
          <div className="tc-item-head">
            <h3>{[item.school, item.degree, item.major].filter(Boolean).join(' · ')}</h3>
            <span className="date">{dateRange(item.startDate, item.endDate)}</span>
          </div>
          {item.description && <p className="desc">{item.description}</p>}
        </div>
      )),
  }
  const work = {
    key: 'work',
    title: lang === 'zh-CN' ? '工作经历' : 'EXPERIENCE',
    render: () =>
      data.work.map((item) => (
        <div className="tc-item" key={item.id}>
          <div className="tc-item-head">
            <h3>{[item.company, item.position].filter(Boolean).join(' · ')}</h3>
            <span className="date">{dateRange(item.startDate, item.endDate)}</span>
          </div>
          {item.description && <p className="desc">{item.description}</p>}
        </div>
      )),
  }
  const projects = {
    key: 'projects',
    title: lang === 'zh-CN' ? '项目经历' : 'PROJECTS',
    render: () =>
      data.projects.map((item) => (
        <div className="tc-item" key={item.id}>
          <div className="tc-item-head">
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
    title: lang === 'zh-CN' ? '专业技能' : 'SKILLS',
    render: () => (
      <ul className="tc-skills" style={{ margin: 0, padding: 0 }}>
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
      <header className="tc-header">
        <h1>{basics.name}</h1>
        {headline && <p className="title">{headline}</p>}
        <ul className="tc-contact" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {contact.map((item) => (
            <li key={`${item.kind}-${item.value}`}>
              {showIcons && <ContactIcon kind={item.kind} />}
              {item.showLabel && <span className="lbl">{item.label}</span>}
              {item.href ? (
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.value}
                </a>
              ) : (
                <span>{item.value}</span>
              )}
            </li>
          ))}
        </ul>
      </header>
      <main className="tc-body">
        {sections.map((sec) => (
          <ClassicSection key={sec.key} title={sec.title}>
            {sec.render()}
          </ClassicSection>
        ))}
        {ordered.map((sec) => (
          <ClassicSection key={sec.key} title={sec.title}>
            {sec.render()}
          </ClassicSection>
        ))}
      </main>
    </div>
  )
}
