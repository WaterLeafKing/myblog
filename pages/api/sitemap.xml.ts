import { generateSitemap } from '@/utils/generateSitemap';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // Set response header
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate');

    // Generate sitemap
    const sitemap = await generateSitemap('https://nerdinsight.vercel.app');

    // Send response
    res.status(200).send(sitemap);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generating sitemap' });
  }
}
