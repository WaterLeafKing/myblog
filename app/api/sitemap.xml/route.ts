import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const date = new Date().toISOString();

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://nerdinsight.vercel.app</loc>
        <lastmod>${date}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>https://nerdinsight.vercel.app/blog</loc>
        <lastmod>${date}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>https://nerdinsight.vercel.app/about</loc>
        <lastmod>${date}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.5</priority>
      </url>
    </urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=1200, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to generate sitemap' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
}
