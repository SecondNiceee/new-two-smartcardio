/**
 * generate-static-images.mjs
 *
 * Reads every PNG/JPEG from src-images/ (recursively),
 * and for each breakpoint generates a WebP into public/images/r/<width>/.
 *
 * Output structure mirrors the subfolders of src-images/:
 *   src-images/patents/patent-206009.png
 *   → public/images/r/360/patent-206009.webp
 *   → public/images/r/480/patent-206009.webp
 *   ...
 *
 * ResponsivePicture already points to /images/r/<width>/<name>.webp
 * with an optional webpDir override for subfolders.
 * NOTE: subfolders mirror flat into r/<width>/ — basenames must be unique.
 *
 * Usage:
 *   node scripts/generate-static-images.mjs
 */

import sharp from "sharp"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")

const SRC_DIR = path.join(ROOT, "src-images")
const OUT_BASE = path.join(ROOT, "public", "images", "r")

const BREAKPOINTS = [360, 480, 576, 768, 1024, 1140, 1200, 1440, 1560, 3840]

/** Recursively collect all PNG/JPEG files from a directory */
function collectImages(dir) {
  const results = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...collectImages(full))
    } else if (/\.(png|jpe?g)$/i.test(entry.name)) {
      results.push(full)
    }
  }
  return results
}

async function run() {
  if (!fs.existsSync(SRC_DIR)) {
    console.error(`[generate-static-images] src-images/ not found at ${SRC_DIR}`)
    process.exit(1)
  }

  const images = collectImages(SRC_DIR)
  console.log(`[generate-static-images] Found ${images.length} source image(s)`)

  // Detect subfolder relative to SRC_DIR to create matching out subdir
  for (const imgPath of images) {
    const rel = path.relative(SRC_DIR, imgPath)           // e.g. "patents/patent-206009.png"
    const subDir = path.dirname(rel)                       // e.g. "patents" or "."
    const baseName = path.basename(rel, path.extname(rel)) // e.g. "patent-206009"

    // Determine the output subdirectory per breakpoint
    // If the file is in a subfolder, mirror it: public/images/r/<width>/<subDir>/
    const useSubDir = subDir !== "."

    for (const width of BREAKPOINTS) {
      const outDir = useSubDir
        ? path.join(OUT_BASE, String(width), subDir)
        : path.join(OUT_BASE, String(width))

      fs.mkdirSync(outDir, { recursive: true })

      const outFile = path.join(outDir, `${baseName}.webp`)

      // Skip if already up to date (src not newer than output)
      if (fs.existsSync(outFile)) {
        const srcMtime = fs.statSync(imgPath).mtimeMs
        const outMtime = fs.statSync(outFile).mtimeMs
        if (outMtime >= srcMtime) continue
      }

      try {
        const meta = await sharp(imgPath).metadata()
        const srcWidth = meta.width ?? width

        await sharp(imgPath)
          // Never upscale — if source is smaller than the breakpoint, use source size
          .resize(Math.min(width, srcWidth), null, {
            withoutEnlargement: true,
            fit: "inside",
          })
          .webp({ quality: 82, effort: 4 })
          .toFile(outFile)

        process.stdout.write(`  ✓ ${rel} → r/${width}/${baseName}.webp\n`)
      } catch (err) {
        console.error(`  ✗ Failed ${rel} @ ${width}px:`, err.message)
      }
    }
  }

  console.log("[generate-static-images] Done.")
}

run()
