import AboutMe from '@/components/AboutMe';
import Category from '@/components/Category';
import PostArticle from '@/components/PostArticle';
import QuoteCard from '@/components/QuoteCard';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import ReactSelect from 'react-select';

interface Post {
  id: number;
  preview_image_url: string;
  title: string;
  created_at: string;
  category_id: number;
  category_title: string;
  tags: { tag_id: number; name: string }[];
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
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [quote, setQuote] = useState<Quote>({ id: -1, quote: '', speaker: '' });
  const [loading, setLoading] = useState(false);

  const fetchPostList = async () => {
    const { data, error } = await supabase
      .from('Post')
      .select(
        `
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
      `,
      )
      .order('created_at', { ascending: false })
      .range(0, 33)
      .returns<PostWithJoins[]>();

    if (error) {
      console.log(error);
    } else {
      const transformedData =
        data?.map((post) => ({
          id: post.id,
          preview_image_url: post.preview_image_url,
          title: post.title,
          created_at: post.created_at,
          category_id: post.category_id,
          category_title: post.Category.title,
          tags: post.PostTag.map((pt) => ({
            tag_id: pt.tag_id,
            name: pt.Tag.name,
          })),
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

  // Transform CategoryList into ReactSelect options format
  const categoryOptions = [
    { value: 0, label: 'All' },
    ...categoryList.map((category) => ({
      value: category.id,
      label: category.title,
    })),
  ];

  const filterPostList = async (categoryId: number) => {
    try {
      setLoading(true);
      let query = supabase
        .from('Post')
        .select(
          `
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
        `,
        )
        .order('created_at', { ascending: false })
        .range(0, 33);

      // Add category filter if categoryId is not 0 (All)
      if (categoryId !== 0) {
        query = query.eq('category_id', categoryId);
      }

      const { data, error } = await query.returns<PostWithJoins[]>();

      if (error) throw error;

      const transformedData =
        data?.map((post) => ({
          id: post.id,
          preview_image_url: post.preview_image_url,
          title: post.title,
          created_at: post.created_at,
          category_id: post.category_id,
          category_title: post.Category.title,
          tags: post.PostTag.map((pt: any) => ({
            tag_id: pt.tag_id,
            name: pt.Tag.name,
          })),
        })) || [];

      setPostList(transformedData);
    } catch (error) {
      console.error('Error searching posts:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="sm:px-6 md:px-7 container mx-auto flex flex-col px-4 lg:px-8">
      {/* <div className="mb-4 mt-8 flex w-full gap-2">
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
          <a
            href={'/study'}
            className="mt-2 flex h-[232px] w-44 flex-col items-center justify-end rounded-lg border border-gray-300 bg-[#ffffff] hover:cursor-pointer hover:border-orange-400"
          >
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
          </a>
          <div className="mt-2 flex justify-center space-x-2">
            <div className={`size-2 rounded-full bg-gray-400`}></div>
            <div className={`size-2 rounded-full bg-gray-300`}></div>
          </div>
        </div>
      </div> */}
      <div className="my-8 flex justify-center rounded-sm border border-slate-300 py-4 font-extralight">
        <div className="flex text-sm italic ">
          <QuoteCard quote={quote.quote} speaker={quote.speaker} />
        </div>
      </div>
      {/* <div className="hidden lg:block">
        <CategoryCardSection categories={CategoryList} />
      </div> */}
      <div className="w-full">
        <div className="mb-3">
          <ReactSelect
            className="focus:border focus:border-orange-400"
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused
                  ? '#fb923c'
                  : baseStyles.borderColor,
                '&:hover': {
                  borderColor: '#fb923c',
                },
                boxShadow: state.isFocused ? '0 0 0 1px #ffffff' : 'none',
                color: '#777777',
              }),
              option: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: state.isSelected ? '#fb923c' : 'white',
                '&:hover': {
                  backgroundColor: state.isSelected ? '#fb923c' : '#fff8f1',
                },
                color: state.isSelected ? 'white' : '#777777',
              }),
              singleValue: (baseStyles) => ({
                ...baseStyles,
                color: '#777777',
              }),
            }}
            options={categoryOptions}
            placeholder="All"
            isMulti={false}
            onChange={(option) => filterPostList(option?.value || 0)}
          />
        </div>
        {postList.map((item, index) => (
          <a href={'/posts/' + item.id} key={index} target="_blank">
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
      <div className="mt-8" />
      <AboutMe />
    </main>
  );
}
