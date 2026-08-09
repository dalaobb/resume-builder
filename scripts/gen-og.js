import { writeFile } from 'node:fs/promises'
import sharp from 'sharp'

const svg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#ffffff"/>
  <rect width="1200" height="14" fill="#22c55e"/>
  <rect x="120" y="215" width="190" height="190" rx="40" fill="#22c55e"/>
  <text x="215" y="350" font-family="'DejaVu Sans', sans-serif" font-size="112" font-weight="bold" fill="#ffffff" text-anchor="middle">R</text>
  <text x="362" y="295" font-family="'DejaVu Sans', sans-serif" font-size="62" font-weight="bold" fill="#111827">Resume Builder</text>
  <text x="362" y="355" font-family="'DejaVu Sans', sans-serif" font-size="29" fill="#6b7280">Free · Local · No sign-up</text>
  <rect x="120" y="425" width="170" height="6" rx="3" fill="#22c55e"/>
  <text x="120" y="478" font-family="'DejaVu Sans', sans-serif" font-size="26" fill="#9ca3af">Your data never leaves your device</text>
</svg>
`

const png = await sharp(Buffer.from(svg)).png().toBuffer()
await writeFile(new URL('../public/og.png', import.meta.url), png)
console.log('public/og.png', png.length, 'bytes')
