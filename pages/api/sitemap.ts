import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const { data: posts, error } = await supabase
    .from('Post')
    .select('id, created_at');

  if (error) {
    return res.status(500).json({ error: 'Error fetching posts' });
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${process.env.NEXT_PUBLIC_SITE_URL}</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      ${posts
        ?.map(
          (post) => `
        <url>
          <loc>${process.env.NEXT_PUBLIC_SITE_URL}/posts/${post.id}</loc>
          <lastmod>${post.created_at}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `,
        )
        .join('')}
    </urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
}
