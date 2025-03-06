const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });
const { writeFileSync } = require('fs');
const { createClient } = require('@supabase/supabase-js');

interface Post {
  id: number;
  created_at: string;
  updated_at: string;
}

async function generateSitemap(domain: string) {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    throw new Error('Missing Supabase environment variables');
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  const { data: posts, error } = await supabase
    .from('Post')
    .select('id, created_at');

  if (error) {
    console.error('Error fetching posts:', error);
    return;
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${domain}</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      ${posts
        ?.map(
          (post: Post) => `
        <url>
          <loc>${domain}/posts/${post.id}</loc>
          <lastmod>${post.created_at}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `,
        )
        .join('')}
    </urlset>`;

  writeFileSync('public/sitemap.xml', sitemap);
  console.log('Sitemap generated successfully at public/sitemap.xml');
}

// Run the function with your domain
generateSitemap(process.env.NEXT_PUBLIC_SITE_URL as string).catch(
  console.error,
);
