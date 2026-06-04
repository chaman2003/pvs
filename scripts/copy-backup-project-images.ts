import fs from 'fs';
import path from 'path';
import { getAllBackupAssetFiles } from '../content/backup-project-media';

const BACKUP_DIR = path.join(__dirname, '../pvspromoters_backup/assets/images');
const OUT_DIR = path.join(__dirname, '../public/images');

function main() {
  if (!fs.existsSync(BACKUP_DIR)) {
    console.error(`Backup folder not found: ${BACKUP_DIR}`);
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const files = getAllBackupAssetFiles();
  let ok = 0;
  let missing = 0;

  for (const name of files) {
    const src = path.join(BACKUP_DIR, name);
    const dest = path.join(OUT_DIR, name);

    if (!fs.existsSync(src)) {
      console.warn(`missing ${name}`);
      missing++;
      continue;
    }

    fs.copyFileSync(src, dest);
    console.log(`ok   ${name}`);
    ok++;
  }

  console.log(`\nDone: ${ok} copied, ${missing} missing`);
  if (missing > 0) process.exit(1);
}

main();
