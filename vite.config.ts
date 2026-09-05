import { defineConfig } from 'vite'
import type { Plugin, Connect } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function rewriteCleanUrls(): Plugin {
  const handler = (req: { url?: string }, _res: unknown, next: () => void) => {
    const [path, query = ''] = (req.url ?? '').split('?')
    let target: string | null = null
    if (path === '/create') target = '/create.html'
    else if (path === '/privacy') target = '/privacy.html'
    else {
      const m = /^\/template\/(modern|classic|pro)$/.exec(path)
      if (m) target = `/template-${m[1]}.html`
    }
    if (target) req.url = `${target}${query ? `?${query}` : ''}`
    next()
  }
  return {
    name: 'rewrite-clean-urls',
    configureServer(server) {
      server.middlewares.use(handler as Connect.NextHandleFunction)
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler as Connect.NextHandleFunction)
    },
  }
}

export default defineConfig({
  plugins: [rewriteCleanUrls(), react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  build: {
    rollupOptions: {
      input: {
        home: 'index.html',
        create: 'create.html',
        privacy: 'privacy.html',
        'template-modern': 'template-modern.html',
        'template-classic': 'template-classic.html',
        'template-pro': 'template-pro.html',
      },
    },
  },
})
