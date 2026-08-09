import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const child = path.join(root, 'scripts', 'render-static.mjs')

for (const lang of ['zh', 'en']) {
  const result = spawnSync(process.execPath, [child, lang], { cwd: root, stdio: 'inherit' })
  if (result.status !== 0) process.exit(result.status ?? 1)
}
