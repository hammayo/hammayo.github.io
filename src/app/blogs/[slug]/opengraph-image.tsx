import { ImageResponse } from 'next/og';
import { getAllSlugs, getAllPostsMeta } from '@/features/blogs/pipeline';

export const size        = { width: 1200, height: 630 };
export const contentType = 'image/png';

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }));
}

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts    = getAllPostsMeta();
  const post     = posts.find(p => p.slug === slug);

  const title          = post?.title   ?? 'Blog post';
  const summaryRaw     = post?.summary ?? '';
  const summary        = summaryRaw.length > 120 ? summaryRaw.slice(0, 120) + '…' : summaryRaw;
  const date           = post?.date    ?? '';

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to right bottom, #18181b, #27272a, #27272a, #1f2937)',
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
          <div style={{ fontSize: '14px', color: '#7c3aed', letterSpacing: '2px' }}>
            HAMMAYO.CO.UK / WRITING
          </div>
          <div style={{ fontSize: '48px', fontWeight: 700, color: '#e2d9f3', lineHeight: 1.2, maxWidth: '900px' }}>
            {title}
          </div>
          {summary ? (
            <div style={{ fontSize: '20px', color: '#888', maxWidth: '800px', lineHeight: 1.5 }}>
              {summary}
            </div>
          ) : null}
          <div style={{ fontSize: '14px', color: '#555' }}>
            {`${date} · Hammayo Babar`}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
