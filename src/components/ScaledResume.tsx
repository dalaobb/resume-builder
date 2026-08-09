import { useEffect, useRef, useState } from 'react'

export function ScaledResume({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState({ scale: 1, width: 0, height: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const measure = () => {
      const page = container.querySelector<HTMLElement>('.a4-page')
      if (!page) return
      const scale = Math.min(1, (container.clientWidth - 1) / page.offsetWidth)
      setTransform({
        scale,
        width: page.offsetWidth,
        height: page.offsetHeight,
      })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(container)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      <div
        style={{
          width: transform.width,
          height: transform.height * transform.scale,
          overflow: 'hidden',
        }}
        className="mx-auto"
      >
        <div
          style={{
            width: transform.width,
            transform: `scale(${transform.scale})`,
            transformOrigin: 'top left',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
