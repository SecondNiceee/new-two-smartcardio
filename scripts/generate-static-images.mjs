/**
 * generate-static-images.mjs
 *
 * Reads every PNG/JPEG from src-images/ (preserving sub-directory structure),
 * converts them to WebP at each breakpoint, and writes the results to:
 *   public/images/r/<width>/<name>.webp        (root images)
 *   public/images/r/<subdir>/<width>/<name>.webp  (sub-directory images)
 *
 * This matches the paths expected by ResponsivePicture:
 *   - default webpDir="/images/r"         → /images/r/<width>/<name>.webp
 *   - webpDir="/images/r/recordings"      → /images/r/recordings/<width>/<name>.webp
 *   - webpDir="/images/r/patents"         → /images/r/patents/<width>/<name>.webp
 *   - webpDir="/images/r/placement"       → /images/r/placement/<width>/<name>.webp
 *
 * Run: node scripts/generate-static-images.mjs
 */

import sharp from "sharp"
import { readdir, mkdir } from "fs/promises"
import { existsSync } from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")

const SRC_DIR = path.join(ROOT, "src-images")
const OUT_DIR = path.join(ROOT, "public", "images", "r")

const BREAKPOINTS = [360, 480, 576, 768, 1024, 1140, 1200, 1440, 1560, 3840]

const EXTENSIONS = new Set([".png", ".jpg", ".jpeg"])

/** Recursively collect all image files under a directory */
async function collectImages(dir, base = dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await collectImages(full, base)))
    } else if (EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      files.push({ full, relative: path.relative(base, full) })
    }
  }
  return files
}

async function main() {
  if (!existsSync(SRC_DIR)) {
    console.error(`[generate-images] src-images/ not found at ${SRC_DIR}`)
    process.exit(1)
  }

  const images = await collectImages(SRC_DIR)
  console.log(`[generate-images] Found ${images.length} source image(s)`)

  let generated = 0
  let skipped = 0

  for (const { full, relative } of images) {
    const subdir = path.dirname(relative) // "." for root, "recordings" etc for sub
    const baseName = path.basename(relative, path.extname(relative))

    // Determine output directory structure:
    // root images:   public/images/r/<width>/<name>.webp
    // sub-dir images: public/images/r/<subdir>/<width>/<name>.webp
    const isRoot = subdir === "."

    for (const width of BREAKPOINTS) {
      const outFolder = isRoot
        ? path.join(OUT_DIR, String(width))
        : path.join(OUT_DIR, subdir, String(width))

      const outFile = path.join(outFolder, `${baseName}.webp`)

      await mkdir(outFolder, { recursive: true })

      // Skip if already up to date (file exists)
      if (existsSync(outFile)) {
        skipped++
        continue
      }

      await sharp(full)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 82, effort: 4 })
        .toFile(outFile)

      generated++
    }
  }

  console.log(
    `[generate-images] Done. Generated: ${generated}, Skipped (cached): ${skipped}`
  )
}

main().catch((err) => {
  console.error("[generate-images] Error:", err)
  process.exit(1)
})
