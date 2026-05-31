import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ROOT = path.join(__dirname, '..');
const logo = path.join(ROOT, 'public/images/logo.png');
const bg = { r: 0, g: 53, b: 39, alpha: 1 } as const;

async function main() {
  const buf32 = await sharp(logo).resize(32, 32, { fit: 'contain', background: bg }).png().toBuffer();
  const buf16 = await sharp(logo).resize(16, 16, { fit: 'contain', background: bg }).png().toBuffer();

  const targets = [
    path.join(ROOT, 'public/favicon.ico'),
    path.join(ROOT, 'app/favicon.ico'),
    path.join(ROOT, 'public/favicon-32x32.png'),
    path.join(ROOT, 'public/favicon-16x16.png'),
  ];

  fs.writeFileSync(targets[0], buf32);
  fs.writeFileSync(targets[1], buf32);
  fs.writeFileSync(targets[2], buf32);
  fs.writeFileSync(targets[3], buf16);

  await sharp(logo).resize(32, 32, { fit: 'contain', background: bg }).png().toFile(path.join(ROOT, 'app/icon.png'));
  await sharp(logo)
    .resize(180, 180, { fit: 'contain', background: bg })
    .png()
    .toFile(path.join(ROOT, 'app/apple-icon.png'));

  console.log('Favicon generated from public/images/logo.png');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
