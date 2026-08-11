import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const config = JSON.parse(
  await readFile(path.join(path.dirname(fileURLToPath(import.meta.url)), 'indexnow.config.json'), 'utf8'),
)

let ok = true
for (const host of config.hosts) {
  const body = {
    host,
    key: config.key,
    keyLocation: `https://${host}/${config.key}.txt`,
    urlList: config.paths.map((p) => `https://${host}${p}`),
  }
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  })
  console.log(`IndexNow ${host} → ${res.status} ${res.statusText}`)
  if (!res.ok) {
    console.log(await res.text())
    ok = false
  }
}
if (!ok) process.exit(1)
console.log(`submitted ${config.hosts.length * config.paths.length} URLs`)
