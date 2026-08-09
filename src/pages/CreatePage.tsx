import { useState } from 'react'
import { useI18n } from '../i18n'
import EditPanel from '../components/EditPanel'
import PreviewPane from '../components/PreviewPane'
import TemplateSelector from '../components/TemplateSelector'
import ExportPanel from '../components/ExportPanel'
import { usePdfExport } from '../components/usePdfExport'
import { useResumeStore } from '../store/useResumeStore'

type Step = 'edit' | 'preview' | 'export'

const stepItems: Array<{ id: Step; key: string }> = [
  { id: 'edit', key: 'editor.editTab' },
  { id: 'preview', key: 'editor.previewTab' },
  { id: 'export', key: 'editor.exportTab' },
]

export default function CreatePage() {
  const { t } = useI18n()
  const [step, setStep] = useState<Step>('edit')
  const { handleExport } = usePdfExport()
  const resetResume = useResumeStore((s) => s.resetResume)

  const handleReset = () => {
    if (window.confirm(t('editor.resetConfirm'))) resetResume()
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      {/* 工具栏 */}
      <div className="shrink-0 border-b border-line bg-white">
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-4 py-2.5 md:px-5">
          <span className="text-xs text-ink-faint lg:hidden">{t(stepItems.find((i) => i.id === step)?.key ?? stepItems[0].key)}</span>
          <span className="hidden text-xs text-ink-faint lg:inline">{t('editor.templateTitle')}</span>
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="rounded-lg border border-line px-3 py-2 text-sm font-medium text-ink-muted transition hover:border-accent hover:text-accent-dark"
            >
              {t('editor.resetData')}
            </button>
            <button
              type="button"
              onClick={handleExport}
              className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-dark"
            >
              {t('common.exportPdf')}
            </button>
          </div>
        </div>
      </div>

      {/* 桌面端三栏 */}
      <div className="hidden min-h-0 flex-1 lg:flex">
        <div className="mx-auto flex min-h-0 w-full max-w-[1440px]">
          <div className="w-[380px] shrink-0 overflow-y-auto border-r border-line bg-white">
            <EditPanel />
          </div>
          <div className="min-w-0 flex-1 border-r border-line">
            <PreviewPane />
          </div>
          <div className="w-[260px] shrink-0 overflow-y-auto bg-white">
            <TemplateSelector />
          </div>
        </div>
      </div>

      {/* 移动端步骤切换 */}
      <div className="flex shrink-0 border-b border-line bg-white lg:hidden">
        {stepItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setStep(item.id)}
            className={`flex-1 py-3 text-sm transition ${
              step === item.id
                ? 'border-b-2 border-accent font-medium text-accent-dark'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            {t(item.key)}
          </button>
        ))}
      </div>

      <div className="min-h-0 flex-1 lg:hidden">
        {step === 'edit' && (
          <div className="h-full overflow-y-auto bg-white">
            <EditPanel />
            <div className="border-t border-line">
              <TemplateSelector />
            </div>
          </div>
        )}
        {step === 'preview' && <PreviewPane />}
        {step === 'export' && <ExportPanel />}
      </div>
    </div>
  )
}
