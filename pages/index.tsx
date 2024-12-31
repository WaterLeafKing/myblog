import CategoryCardSection from '@/components/CategoryCardSection';
import PostArticle from '@/components/PostArticle';
import SwipeUI from '@/components/SwipeUI';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

interface Post {
  id: number;
  preview_image_url: string;
  title: string;
  created_at: string;
  category: string;
}
interface Category {
  id: number;
  title: string;
  icon: string;
}
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [postList, setPostList] = useState<Post[]>([]);
  const [CategoryList, setCategoryList] = useState<Category[]>([]);

  const testFetch = async () => {
    const { data, error } = await supabase
      .from('Post')
      .select(`
        id,
        preview_image_url,
        title,
        created_at,
        content,
        category
      `)
      .order('created_at', { ascending: false })
      .range(3, 13);

    if (error) {
      console.log(error);
    } else {
      setPostList((data || []));
    }
  };

  const fetchCategoryList = async () => {
    const { data, error } = await supabase
      .from('Category')
      .select('id, title, icon');

    if (error) {
      console.error('Supabase error:', error);
    } else {
      if (!data || data.length === 0) {
        console.log('No categories found in the database');
      }
      setCategoryList(data || []);
    }
  };

  useEffect(() => {
    testFetch();
    fetchCategoryList();
  }, []);

  return (
    <main className="sm:px-6 md:px-7 container mx-auto flex flex-col px-4 lg:px-8">
      <div className="my-4 w-full">
        <SwipeUI />
      </div>
      <div className="flex justify-center font-extralight">
        <div className="flex cursor-pointer italic text-sm hover:text-orange-400">
          당신이 잠자는 동안에도 돈이 들어오는 방법을 찾지 못한다면 당신은 죽을
          때까지 일을 해야 할 것이다
        </div>
      </div>
      <div className="my-4" />
      <CategoryCardSection categories={CategoryList} />
      <div className="my-4" />
      <div className="sm:grid-cols-1 md:grid-cols-1 grid w-full gap-1 lg:grid-cols-1">
        {postList.map((item, index) => (
          <a href={'/posts/' + item.id} key={index}>
            <PostArticle
              image={item.preview_image_url}
              title={item.title}
              created_at={new Date(item.created_at).toISOString().split('T')[0]}
              category={item.category}
            />
          </a>
        ))}
      </div>
      <div className="flex justify-center my-8">about</div>
      <div className="my-20" />
    </main>
  );
}
