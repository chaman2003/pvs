import fs from 'fs';
import path from 'path';
import https from 'https';

const BASE = 'https://pvspromoters.com/assets/images';
const OUT = path.join(__dirname, '../public/images');

const FILES = [
  'gallery-img1.jpg',
  'gallery-img2.jpg',
  'gallery-img3.jpg',
  'gallery-img4.jpg',
  'gallery-img5.jpg',
  'gallery-img6.jpg',
  'gallery-img7.jpg',
  'gallery-img8.jpg',
  'gallery-img9.jpg',
  'gallery-img10.jpg',
  'gallery-img11.jpg',
  'gallery-img12.jpg',
  'gallery-img13.jpg',
  'gallery-img14.jpg',
  'gallery-img15.jpg',
  'gallery-img16.jpg',
  'gallery-img17.jpg',
  'gallery-img18.jpg',
  'img18.jpg',
  'img19.jpg',
  'img20.jpg',
  'img21.jpg',
  'img22.jpg',
  'img23.jpg',
  'img24.jpg',
  'img76.jpg',
  'img77.jpg',
  'img78.jpg',
  'inner-banner-img-1.jpg',
  'site-logo.png',
  'favicon.png',
];

function download(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          const loc = res.headers.location;
          if (loc) {
            file.close();
            fs.unlinkSync(dest);
            download(loc.startsWith('http') ? loc : `${BASE}/${loc}`, dest).then(resolve).catch(reject);
            return;
          }
        }
        if (res.statusCode !== 200) {
          file.close();
          fs.unlink(dest, () => reject(new Error(`${url} → ${res.statusCode}`)));
          return;
        }
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      })
      .on('error', (err) => {
        file.close();
        fs.unlink(dest, () => reject(err));
      });
  });
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  let ok = 0;
  let fail = 0;

  for (const name of FILES) {
    const url = `${BASE}/${encodeURIComponent(name).replace(/%20/g, '%20')}`;
    const dest = path.join(OUT, name);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
      console.log(`skip ${name}`);
      ok++;
      continue;
    }
    try {
      await download(`${BASE}/${name}`, dest);
      console.log(`ok   ${name}`);
      ok++;
    } catch (e) {
      console.warn(`fail ${name}:`, e instanceof Error ? e.message : e);
      fail++;
    }
  }

  // logo.jpg from site-logo.png if logo missing
  const logoPath = path.join(OUT, 'logo.jpg');
  const siteLogo = path.join(OUT, 'site-logo.png');
  if (!fs.existsSync(logoPath) && fs.existsSync(siteLogo)) {
    fs.copyFileSync(siteLogo, logoPath);
    console.log('ok   logo.jpg (from site-logo.png)');
  } else if (!fs.existsSync(logoPath) && fs.existsSync(path.join(OUT, 'favicon.png'))) {
    fs.copyFileSync(path.join(OUT, 'favicon.png'), logoPath);
    console.log('ok   logo.jpg (from favicon.png)');
  }

  console.log(`\nDone: ${ok} ok, ${fail} failed`);
}

main().catch(console.error);
