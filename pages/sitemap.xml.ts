import { createClient } from '@supabase/supabase-js';
import { ServerResponse } from 'http';
import { GetServerSideProps } from 'next';

const generateSitemap = (posts: any[]) => {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://nerdinsight.vercel.app';

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${siteUrl}</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>${siteUrl}/posts</loc>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>${siteUrl}/whos-nerd</loc>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
      </url>
      <url>
        <loc>${siteUrl}/friend</loc>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
      </url>
      ${posts
        .map(
          (post) => `
        <url>
          <loc>${siteUrl}/posts/${post.id}</loc>
          <lastmod>${post.created_at}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.6</priority>
        </url>
      `,
        )
        .join('')}
    </urlset>`;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const { data: posts, error } = await supabase
    .from('Post')
    .select('id, created_at');

  if (error) {
    (res as ServerResponse).statusCode = 500;
    (res as ServerResponse).end(
      JSON.stringify({ error: 'Error fetching posts' }),
    );
    return { props: {} };
  }

  res.setHeader('Content-Type', 'text/xml');
  res.write(generateSitemap(posts || []));
  res.end();

  return {
    props: {},
  };
};

export default function Sitemap() {
  // getServerSideProps handles everything
  return null;
}
