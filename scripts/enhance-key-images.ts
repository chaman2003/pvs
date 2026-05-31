import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ROOT = path.join(__dirname, '../public/images');
const OUT = path.join(ROOT, 'enhanced');

const TARGETS = [
  'green-hills-sunset.png',
  'temple-river-aerial.png',
  'coco-farm-aerial-playground.png',
  'site-earthworks-retaining-wall.png',
  'coco-farm-clubhouse-aerial.png',
  'amenity-hub-pool-aerial.png',
  'paddy-fields-aerial.png',
  'plot-division-top-down.png',
];

const WIDTHS = [640, 1080, 1920];

async function enhanceImage(filename: string) {
  const inputPath = path.join(ROOT, filename);
  if (!fs.existsSync(inputPath)) {
    console.warn(`Skip missing: ${filename}`);
    return;
  }

  const baseName = path.parse(filename).name;
  const meta = await sharp(inputPath).metadata();
  const sourceWidth = meta.width ?? 1920;

  for (const width of WIDTHS) {
    const targetWidth = Math.min(width, sourceWidth);
    const outName = `${baseName}-${width}w.webp`;
    const outPath = path.join(OUT, outName);

    await sharp(inputPath)
      .rotate()
      .resize(targetWidth, undefined, { fit: 'inside', withoutEnlargement: true })
      .sharpen({ sigma: 0.8, m1: 0.5, m2: 0.5 })
      .modulate({ brightness: 1.02, saturation: 1.05 })
      .webp({ quality: 85, effort: 4 })
      .toFile(outPath);

    console.log(`✓ ${outName} (${targetWidth}px)`);
  }
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  for (const file of TARGETS) {
    await enhanceImage(file);
  }
  console.log('\nDone. Enhanced images saved to public/images/enhanced/');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
