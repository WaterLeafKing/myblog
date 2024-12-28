import PostArticle from '@/components/PostArticle';
import SwipeUI from '@/components/SwipeUI';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

interface Post {
  id: number;
  preview_image_url: string;
  title: string;
  created_at: string;
}

export default function Home() {
  const [postList, setPostList] = useState<Post[]>([]);

  const testFetch = async () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data, error } = await supabase
      .from('Post')
      .select('id, preview_image_url, title, created_at');

    if (error) {
      console.log(error);
    } else {
      setPostList(data);
    }
  };

  useEffect(() => {
    testFetch();
  }, []);

  return (
    <main className="sm:px-6 md:px-7 container mx-auto flex flex-col px-4 lg:px-8">
      <div className="my-8 w-full">
        <SwipeUI />
      </div>
      <div className="sm:grid-cols-1 md:grid-cols-1 grid w-full gap-4 lg:grid-cols-1">
        {postList.map((item, index) => (
          <a href={'/posts/' + item.id} key={index}>
            <PostArticle
              image={item.preview_image_url}
              title={item.title}
              created_at={new Date(item.created_at).toISOString().split('T')[0]}
            />
          </a>
        ))}
      </div>
      <div className="my-20" />
    </main>
  );
}
