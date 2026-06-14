import sharp from 'sharp'
import { readdir, mkdir, unlink } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')

const sizes = [
  { w: 96, suffix: '-96' },
  { w: 180, suffix: '-180' },
  { w: 300, suffix: '-300' },
  { w: 600, suffix: '-600' },
]

const formats = [
  { ext: 'avif', opts: { quality: 50, effort: 4 } },
  { ext: 'webp', opts: { quality: 80, effort: 4 } },
]

async function processImage(srcFile, baseName) {
  const srcPath = join(publicDir, srcFile)
  const meta = await sharp(srcPath).metadata()
  console.log(`Processing ${srcFile} (${meta.width}x${meta.height})`)

  for (const size of sizes) {
    if (size.w > meta.width) continue
    for (const fmt of formats) {
      const out = join(publicDir, `${baseName}${size.suffix}.${fmt.ext}`)
      await sharp(srcPath)
        .resize(size.w, size.w, { fit: 'cover' })
        .toFormat(fmt.ext, fmt.opts)
        .toFile(out)
      console.log(`  -> ${baseName}${size.suffix}.${fmt.ext}`)
    }
    // JPEG fallback at every size
    const jpgOut = join(publicDir, `${baseName}${size.suffix}.jpeg`)
    await sharp(srcPath)
      .resize(size.w, size.w, { fit: 'cover' })
      .jpeg({ quality: 78, mozjpeg: true })
      .toFile(jpgOut)
    console.log(`  -> ${baseName}${size.suffix}.jpeg`)
  }
}

async function cleanupOldSizes(baseName) {
  const files = await readdir(publicDir)
  for (const f of files) {
    if (f.startsWith(baseName) && f !== `${baseName}.jpeg` && f !== `${baseName}.jpg` && f !== `${baseName}.png`) {
      // leave generated sizes alone (idempotent)
    }
  }
}

async function main() {
  await processImage('profile.jpeg', 'profile')
  console.log('Image optimization complete')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
