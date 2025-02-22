import { generateSitemap } from '@/utils/generateSitemap';

export default async function handler(req, res) {
  const domain = 'https://nerdinsight.vercel.app';
  const sitemap = await generateSitemap(domain);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
}
