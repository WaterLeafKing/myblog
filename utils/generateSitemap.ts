import { getAllPostIds } from '@/lib/posts';
import { NextApiRequest, NextApiResponse } from 'next';

export async function generateSitemap(domain: string) {
  const posts = getAllPostIds();

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <!-- 메인 페이지 -->
      <url>
        <loc>${domain}</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      
      <!-- 블로그 포스트들 -->
      ${posts
        .map((post) => {
          return `
            <url>
              <loc>${domain}/posts/${post.params.id}</loc>
              <changefreq>weekly</changefreq>
              <priority>0.7</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const domain = 'https://nerdinsight.app';
  const sitemap = await generateSitemap(domain);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
}
