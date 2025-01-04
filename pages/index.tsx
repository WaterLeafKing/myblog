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
      .select(
        `
        id,
        preview_image_url,
        title,
        created_at,
        content,
        category
      `,
      )
      .order('created_at', { ascending: false })
      .range(3, 13);

    if (error) {
      console.log(error);
    } else {
      setPostList(data || []);
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
      <div className="my-10 flex w-full gap-2">
        <SwipeUI />
        <div>
          <div className="flex gap-2">
            <div className="flex h-12 w-2/3 items-center justify-center rounded-lg border border-gray-300 text-sm hover:cursor-pointer hover:border hover:border-orange-400">
              의견 사서함
            </div>
            <div className="flex h-12 w-1/3 items-center justify-center rounded-lg border border-gray-300 text-sm hover:cursor-pointer hover:border hover:border-orange-400">
              ?
            </div>
          </div>
          <div className="mt-2 flex h-[232px] w-44 flex-col items-center justify-end rounded-lg border border-gray-300 bg-[#ffffff] hover:cursor-pointer hover:border-orange-400">
            <div className="mb-2 w-full flex-col items-center justify-center ">
              <div className="flex items-center justify-center text-sm">
                이 달의&nbsp;
                <span className="font-bold text-green-600">책</span>
              </div>
              <div className="flex items-center justify-center text-base">
                <img
                  src="https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791191283594.jpg"
                  className="w-32"
                />
              </div>
            </div>
          </div>
          <div className="mt-2 flex justify-center space-x-2">
            <div className={`size-2 rounded-full bg-gray-400`}></div>
            <div className={`size-2 rounded-full bg-gray-300`}></div>
          </div>
        </div>
      </div>
      <div className="flex justify-center font-extralight">
        <div className="flex cursor-pointer text-sm italic hover:text-orange-400">
          &ldquo;당신이 잠자는 동안에도 돈이 들어오는 방법을 찾지 못한다면
          당신은 죽을 때까지 일을 해야 할 것이다&rdquo;
        </div>
      </div>
      <div className="my-4" />
      <CategoryCardSection categories={CategoryList} />
      <div className="my-4" />
      <div className="w-full">
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
      <div className="my-10" />
    </main>
  );
}
