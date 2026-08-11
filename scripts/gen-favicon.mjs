import sharp from 'sharp'

const src = process.argv[2] ?? 'public/favicon.svg'
const targets = {
  'public/favicon-16x16.png': 16,
  'public/favicon-32x32.png': 32,
  'public/apple-touch-icon.png': 180,
}

for (const [out, size] of Object.entries(targets)) {
  await sharp(src).resize(size, size).png().toFile(out)
  console.log(`wrote ${out} (${size}x${size})`)
}
