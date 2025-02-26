import * as cheerio from 'cheerio';
import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { url } = req.query;

  try {
    const response = await fetch(url as string);
    const html = await response.text();
    const $ = cheerio.load(html);

    // Try to find OpenGraph image
    const ogImage = $('meta[property="og:image"]').attr('content');
    // Or Twitter image
    const twitterImage = $('meta[name="twitter:image"]').attr('content');

    res.status(200).json({
      thumbnail: ogImage || twitterImage || '/images/default-thumbnail.jpg',
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch thumbnail' });
  }
}
