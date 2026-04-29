import { getAllPostsMeta } from '@/features/blogs/pipeline';
import { SITE_URL, SITE } from '@/lib/constants';

export const dynamic = 'force-static';

export function GET() {
  const posts = getAllPostsMeta();

  const items = posts
    .map(
      post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_URL}/blogs/${post.slug}/</link>
      <guid isPermaLink="true">${SITE_URL}/blogs/${post.slug}/</guid>
      <description><![CDATA[${post.summary}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`,
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${SITE.name}]]></title>
    <link>${SITE_URL}</link>
    <description><![CDATA[${SITE.description}]]></description>
    <language>en-gb</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
