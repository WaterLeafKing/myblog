import { NextApiRequest, NextApiResponse } from 'next';

export async function generateSitemap(domain: string) {
  // Get the current date for lastmod
  const date = new Date().toISOString();

  // Create the XML structure
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${domain}</loc>
        <lastmod>${date}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>${domain}/blog</loc>
        <lastmod>${date}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
      <!-- Add more static routes as needed -->
    </urlset>`;

  return sitemap;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const domain = 'https://nerdinsight.vercel.app';
  const sitemap = await generateSitemap(domain);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
}
