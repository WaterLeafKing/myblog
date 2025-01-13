import Category from '@/components/Category';
import CategoryCardSection from '@/components/CategoryCardSection';
import IconButton from '@/components/IconComponent';
import PostArticle from '@/components/PostArticle';
import QuoteCard from '@/components/QuoteCard';
import SwipeUI from '@/components/SwipeUI';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { BsChatQuote } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';

interface Post {
  id: number;
  preview_image_url: string;
  title: string;
  created_at: string;
  category_id: number;
  category_title: string;
  tags: { tag_id: number; name: string; }[];
}

interface Category {
  id: number;
  title: string;
  icon: string;
}

interface Quote {
  id: number;
  quote: string;
  speaker: string;
}

interface PostWithJoins {
  id: number;
  preview_image_url: string;
  title: string;
  created_at: string;
  category_id: number;
  Category: {
    title: string;
  };
  PostTag: {
    tag_id: number;
    Tag: {
      name: string;
    };
  }[];
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [postList, setPostList] = useState<Post[]>([]);
  const [CategoryList, setCategoryList] = useState<Category[]>([]);
  const [quote, setQuote] = useState<Quote>({ id: -1, quote: '', speaker: '' });

  const fetchPostList = async () => {
    const { data, error } = await supabase
      .from('Post')
      .select(`
        id,
        preview_image_url,
        title,
        created_at,
        category_id,
        Category:category_id (title),
        PostTag (
          tag_id,
          Tag (name)
        )
      `)
      .order('created_at', { ascending: false })
      .range(3, 13)
      .returns<PostWithJoins[]>();

    if (error) {
      console.log(error);
    } else {
      const transformedData = data?.map(post => ({
        id: post.id,
        preview_image_url: post.preview_image_url,
        title: post.title,
        created_at: post.created_at,
        category_id: post.category_id,
        category_title: post.Category.title,
        tags: post.PostTag.map((pt) => ({
          tag_id: pt.tag_id,
          name: pt.Tag.name
        }))
      })) || [];

      setPostList(transformedData as Post[]);
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

  const fetchQuote = async () => {
    const { data, error } = await supabase.rpc('get_random_quote');

    if (error) {
      console.error('Supabase error:', error);
    } else {
      if (!data || data.length === 0) {
        console.log('No quote found in the database');
      }
      console.log(data);
      setQuote(data[0]);
    }
  };

  useEffect(() => {
    fetchPostList();
    fetchCategoryList();
    fetchQuote();
  }, []);

  useEffect(() => {
    console.log(quote);
  }, [quote]);

  return (
    <main className="sm:px-6 md:px-7 container mx-auto flex flex-col px-4 lg:px-8">
      <div className="mb-4 mt-8 flex w-full gap-2">
        <SwipeUI />
        <div id="help" className="md:block hidden lg:block">
          <div className="flex gap-2">
            <a
              href={'/opinion'}
              className="flex h-12 w-2/3 items-center justify-center rounded-lg border border-gray-300 text-xs text-gray-400 hover:cursor-pointer hover:border hover:border-orange-400 hover:text-orange-400"
            >
              <IconButton Icon={BsChatQuote} />
              <div>의견보내기</div>
            </a>
            <div className="flex h-12 w-1/3 items-center justify-center rounded-lg border border-gray-300 text-xs text-gray-400 hover:cursor-pointer hover:border hover:border-orange-400 hover:text-orange-400">
              <IconButton Icon={CgProfile} />
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
        <div className="flex text-sm italic">
          <QuoteCard quote={quote.quote} speaker={quote.speaker} />
        </div>
      </div>
      <div className="my-2" />
      <div className="hidden lg:block">
        <CategoryCardSection categories={CategoryList} />
      </div>
      <div className="my-2" />
      <div className="w-full">
        {postList.map((item, index) => (
          <a href={'/posts/' + item.id} key={index} target='_blank'>
            <PostArticle
              image={item.preview_image_url}
              title={item.title}
              created_at={new Date(item.created_at).toISOString().split('T')[0]}
              category={item.category_title}
              tags={item.tags}
            />
          </a>
        ))}
      </div>
      <div className="my-10" />
    </main>
  );
}
