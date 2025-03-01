import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface WordCount {
  word: string;
  count: number;
}

export async function getBlogAnalytics() {
  // Get posts with content
  const { data: posts } = await supabase
    .from('Post')
    .select('title, content, created_at');

  return {
    postFrequency: processPostFrequency(posts ?? []),
    wordFrequency: processWordFrequency(posts ?? []),
    contentLength: processContentLength(posts ?? []),
  };
}

function processPostFrequency(posts: any[]) {
  // Group posts by month
  const frequency = posts.reduce((acc, post) => {
    const date = new Date(post.created_at);
    const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
    acc[monthYear] = (acc[monthYear] || 0) + 1;
    return acc;
  }, {});

  return {
    labels: Object.keys(frequency),
    data: Object.values(frequency),
  };
}

function processWordFrequency(posts: any[]) {
  // Count word frequency across all posts
  const words = posts
    .flatMap((post) => post.content.toLowerCase().split(/\W+/))
    .filter((word) => word.length > 3); // Skip small words

  const wordCount = words.reduce(
    (acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return Object.entries(wordCount)
    .map(([word, count]) => ({ word, count: count as number }))
    .sort((a: WordCount, b: WordCount) => b.count - a.count)
    .slice(0, 20); // Top 20 words
}

function processContentLength(posts: any[]) {
  return {
    average:
      posts.reduce((sum, post) => sum + post.content.length, 0) / posts.length,
    byPost: posts.map((post) => ({
      title: post.title,
      length: post.content.length,
    })),
  };
}
