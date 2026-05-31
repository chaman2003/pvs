import { ImageResponse } from 'next/og';
import { siteConfig } from '@/lib/site-config';

export const runtime = 'edge';
export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #003527 0%, #005a42 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 48,
        }}
      >
        <div style={{ fontSize: 56, fontWeight: 700, color: '#ffc329', marginBottom: 16 }}>
          {siteConfig.name}
        </div>
        <div style={{ fontSize: 28, color: '#ffffff', textAlign: 'center', maxWidth: 800 }}>
          Buy Coco Farmland in Bangalore & Hosur | Managed Farmland Since 2009
        </div>
      </div>
    ),
    { ...size }
  );
}
