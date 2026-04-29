import { ImageResponse } from 'next/og';

export const dynamic     = 'force-static';
export const size        = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0918 0%, #1a0533 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '60px',
          fontFamily: 'monospace',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontSize: '14px', color: '#a78bfa', letterSpacing: '2px' }}>
            HAMMAYO.CO.UK / CV
          </div>
          <div style={{ fontSize: '52px', fontWeight: 700, color: '#ffffff', lineHeight: 1.2 }}>
            Hammy Babar — CV
          </div>
          <div style={{ fontSize: '22px', color: '#f0f0f0', lineHeight: 1.5 }}>
            {'20+ years · Backend Software Engineer · SC Cleared'}
          </div>
          <div style={{ fontSize: '14px', color: '#a78bfa', letterSpacing: '1px' }}>
            {'C# · .NET · Azure · Docker · Microservices · CI/CD'}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
