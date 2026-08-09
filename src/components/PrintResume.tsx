import { useResumeStore } from '../store/useResumeStore'
import { useI18n } from '../i18n'
import { getTemplate } from '../templates'

export default function PrintResume() {
  const resume = useResumeStore((s) => s.resume)
  const templateId = useResumeStore((s) => s.templateId)
  const showIcons = useResumeStore((s) => s.showIcons)
  const { lang } = useI18n()
  const template = getTemplate(templateId)
  const TemplatePreview = template.Preview

  return (
    <div className="print-only">
      <TemplatePreview data={resume} lang={lang} showIcons={showIcons} />
    </div>
  )
}
