import { useResumeStore } from '../store/useResumeStore'
import { useI18n } from '../i18n'
import { TextField, TextAreaField } from './Field'

type FieldDef = {
  key: string
  labelKey: string
  placeholderKey?: string
  textarea?: boolean
}

type SectionDef = {
  key: 'education' | 'work' | 'projects'
  titleKey: string
  nameField: string
  fields: FieldDef[]
}

const sections: SectionDef[] = [
  {
    key: 'education',
    titleKey: 'editor.sectionEducation',
    nameField: 'school',
    fields: [
      { key: 'school', labelKey: 'editor.fieldSchool' },
      { key: 'degree', labelKey: 'editor.fieldDegree' },
      { key: 'major', labelKey: 'editor.fieldMajor' },
      { key: 'startDate', labelKey: 'editor.fieldStart', placeholderKey: 'editor.placeholderStart' },
      { key: 'endDate', labelKey: 'editor.fieldEnd', placeholderKey: 'editor.placeholderEnd' },
      { key: 'description', labelKey: 'editor.fieldDescription', textarea: true },
    ],
  },
  {
    key: 'work',
    titleKey: 'editor.sectionWork',
    nameField: 'company',
    fields: [
      { key: 'company', labelKey: 'editor.fieldCompany' },
      { key: 'position', labelKey: 'editor.fieldPosition' },
      { key: 'startDate', labelKey: 'editor.fieldStart', placeholderKey: 'editor.placeholderStart' },
      { key: 'endDate', labelKey: 'editor.fieldEnd', placeholderKey: 'editor.placeholderEnd' },
      { key: 'description', labelKey: 'editor.fieldDescription', textarea: true },
    ],
  },
  {
    key: 'projects',
    titleKey: 'editor.sectionProjects',
    nameField: 'name',
    fields: [
      { key: 'name', labelKey: 'editor.fieldProjectName' },
      { key: 'role', labelKey: 'editor.fieldRole' },
      { key: 'link', labelKey: 'editor.fieldLink' },
      { key: 'startDate', labelKey: 'editor.fieldStart', placeholderKey: 'editor.placeholderStart' },
      { key: 'endDate', labelKey: 'editor.fieldEnd', placeholderKey: 'editor.placeholderEnd' },
      { key: 'description', labelKey: 'editor.fieldDescription', textarea: true },
    ],
  },
]

type BasicFieldDef = { key: string; labelKey: string; textarea?: boolean }

const commonFields: BasicFieldDef[] = [
  { key: 'name', labelKey: 'editor.fieldName' },
  { key: 'title', labelKey: 'editor.fieldTitle' },
  { key: 'email', labelKey: 'editor.fieldEmail' },
  { key: 'phone', labelKey: 'editor.fieldPhone' },
  { key: 'location', labelKey: 'editor.fieldLocation' },
]

const zhFields: BasicFieldDef[] = [
  { key: 'gender', labelKey: 'editor.fieldGender' },
  { key: 'birthDate', labelKey: 'editor.fieldBirthDate' },
  { key: 'nativePlace', labelKey: 'editor.fieldNativePlace' },
  { key: 'politicalStatus', labelKey: 'editor.fieldPoliticalStatus' },
  { key: 'expectedSalary', labelKey: 'editor.fieldExpectedSalary' },
  { key: 'availableOn', labelKey: 'editor.fieldAvailableOn' },
]

function BlockTitle({ text }: { text: string }) {
  return (
    <h3 className="mb-3 text-sm font-semibold text-ink">
      <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-accent align-middle" />
      {text}
    </h3>
  )
}

export default function EditPanel() {
  const { t, lang } = useI18n()
  const resume = useResumeStore((s) => s.resume)
  const updateBasics = useResumeStore((s) => s.updateBasics)
  const updateItem = useResumeStore((s) => s.updateItem)
  const addItem = useResumeStore((s) => s.addItem)
  const addSkill = useResumeStore((s) => s.addSkill)
  const removeItem = useResumeStore((s) => s.removeItem)
  const addLink = useResumeStore((s) => s.addLink)
  const updateLink = useResumeStore((s) => s.updateLink)
  const removeLink = useResumeStore((s) => s.removeLink)

  const basics = resume.basics as unknown as Record<string, string>

  const renderBasic = (f: BasicFieldDef) =>
    f.textarea ? (
      <TextAreaField
        key={f.key}
        label={t(f.labelKey)}
        value={basics[f.key]}
        onChange={(v) => updateBasics({ [f.key]: v })}
      />
    ) : (
      <TextField
        key={f.key}
        label={t(f.labelKey)}
        value={basics[f.key]}
        onChange={(v) => updateBasics({ [f.key]: v })}
      />
    )

  return (
    <div className="p-4 md:p-5">
      <BlockTitle text={t('editor.sectionBasics')} />
      <div className="space-y-3">
        {commonFields.map(renderBasic)}
        {lang === 'zh-CN' && zhFields.map(renderBasic)}
        {renderBasic({ key: 'summary', labelKey: 'editor.fieldSummary', textarea: true })}
      </div>

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <BlockTitle text={t('editor.sectionLinks')} />
          <button
            type="button"
            onClick={addLink}
            className="rounded-md border border-line px-2.5 py-1 text-xs text-ink-muted transition hover:border-accent hover:text-accent-dark"
          >
            + {t('editor.addLink')}
          </button>
        </div>
        {resume.basics.links.length === 0 && (
          <p className="rounded-md border border-dashed border-line py-4 text-center text-xs text-ink-faint">
            {t('editor.newItem')}
          </p>
        )}
        <div className="space-y-3">
          {resume.basics.links.map((link) => (
            <div key={link.id} className="grid grid-cols-[1fr_auto] items-end gap-2 rounded-lg border border-line bg-canvas p-3">
              <div className="grid grid-cols-[1fr_1fr] gap-2">
                <TextField
                  label={t('editor.fieldLinkLabel')}
                  value={link.label}
                  onChange={(v) => updateLink(link.id, { label: v })}
                />
                <TextField
                  label={t('editor.fieldLinkUrl')}
                  value={link.url}
                  onChange={(v) => updateLink(link.id, { url: v })}
                />
              </div>
              <button
                type="button"
                onClick={() => removeLink(link.id)}
                className="mb-1 rounded-md px-2 py-1.5 text-sm text-red-500 transition hover:bg-red-50"
                aria-label={t('editor.deleteItem')}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {sections.map((sec) => (
          <div key={sec.key} className="mt-6">
            <div className="mb-3 flex items-center justify-between">
              <BlockTitle text={t(sec.titleKey)} />
              <button
                type="button"
                onClick={() => addItem(sec.key)}
                className="rounded-md border border-line px-2.5 py-1 text-xs text-ink-muted transition hover:border-accent hover:text-accent-dark"
              >
                + {t('editor.addItem')}
              </button>
            </div>
            {resume[sec.key].length === 0 && (
              <p className="rounded-md border border-dashed border-line py-4 text-center text-xs text-ink-faint">
                {t('editor.newItem')}
              </p>
            )}
            <div className="space-y-3">
              {resume[sec.key].map((item) => (
                <div key={item.id} className="rounded-lg border border-line bg-canvas p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-ink-muted">
                      {(item as unknown as Record<string, string>)[sec.nameField] || t('editor.newItem')}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeItem(sec.key, item.id)}
                      className="text-xs text-red-500 transition hover:text-red-600"
                    >
                      {t('editor.deleteItem')}
                    </button>
                  </div>
                  <div className="space-y-3">
                    {sec.fields.map((f) =>
                      f.textarea ? (
                        <TextAreaField
                          key={f.key}
                          label={t(f.labelKey)}
                          value={(item as unknown as Record<string, string>)[f.key]}
                          onChange={(v) =>
                            updateItem(sec.key, item.id, { [f.key]: v })
                          }
                        />
                      ) : (
                        <TextField
                          key={f.key}
                          label={t(f.labelKey)}
                          value={(item as unknown as Record<string, string>)[f.key]}
                          onChange={(v) =>
                            updateItem(sec.key, item.id, { [f.key]: v })
                          }
                          placeholder={f.placeholderKey ? t(f.placeholderKey) : undefined}
                        />
                      ),
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <BlockTitle text={t('editor.sectionSkills')} />
            <button
              type="button"
              onClick={addSkill}
              className="rounded-md border border-line px-2.5 py-1 text-xs text-ink-muted transition hover:border-accent hover:text-accent-dark"
            >
              + {t('editor.addItem')}
            </button>
          </div>
          {resume.skills.length === 0 && (
            <p className="rounded-md border border-dashed border-line py-4 text-center text-xs text-ink-faint">
              {t('editor.newItem')}
            </p>
          )}
          <div className="space-y-3">
            {resume.skills.map((item) => (
              <div key={item.id} className="grid grid-cols-[1fr_1fr_auto] items-end gap-2 rounded-lg border border-line bg-canvas p-3">
                <TextField
                  label={t('editor.fieldSkillName')}
                  value={item.name}
                  onChange={(v) => updateItem('skills', item.id, { name: v })}
                />
                <TextField
                  label={t('editor.fieldSkillLevel')}
                  value={item.level}
                  onChange={(v) => updateItem('skills', item.id, { level: v })}
                />
                <button
                  type="button"
                  onClick={() => removeItem('skills', item.id)}
                  className="mb-1 rounded-md px-2 py-1.5 text-sm text-red-500 transition hover:bg-red-50"
                  aria-label={t('editor.deleteItem')}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
    </div>
  )
}