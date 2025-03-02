import Category from '@/components/Category';
import PostArticle from '@/components/PostArticle';
import { createClient } from '@supabase/supabase-js';
import Head from 'next/head';
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
  duration_time: number;
}

interface Category {
  id: number;
  title: string;
  icon: string;
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
  duration_time: number;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [postList, setPostList] = useState<Post[]>([]);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
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
        ),
        duration_time
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
          duration_time: post.duration_time,
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

  useEffect(() => {
    fetchPostList();
    fetchCategoryList();
  }, []);

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
          ),
          duration_time
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
          duration_time: post.duration_time,
        })) || [];

      setPostList(transformedData);
    } catch (error) {
      console.error('Error searching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>NerdInSight</title>
        <meta name="description" content="Blog for Journey of Nerd" />
        <meta property="og:title" content="NerdInSight" />
        <meta property="og:description" content="Blog for Journey of Nerd" />
        <meta property="og:url" content="https://nerdinsight.vercel.app" />
        <meta property="og:type" content="website" />
      </Head>
      <main className="container mx-auto flex flex-col px-4">
        <div className="mt-4 w-full">
          <div className="mb-3">
            <ReactSelect
              className="w-[160px] text-xs hover:cursor-pointer hover:rounded-full hover:bg-orange-200 focus:border focus:border-orange-400"
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  border: 'none',
                  borderColor: state.isFocused
                    ? '#fb923c'
                    : baseStyles.borderColor,
                  '&:hover': {
                    borderColor: '#fb923c',
                  },
                  boxShadow: state.isFocused ? '0 0 0 1px #ffffff' : 'none',
                  color: '#777777',
                  caretColor: 'transparent',
                  cursor: 'pointer',
                }),
                option: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: state.isSelected ? '#fb923c' : 'white',
                  '&:hover': {
                    backgroundColor: state.isSelected ? '#fb923c' : '#fff8f1',
                  },
                  color: state.isSelected ? 'white' : '#777777',
                  cursor: 'pointer',
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
          <div
            id="post_list"
            className="grid w-full grid-cols-1 gap-2 custom:grid-cols-2  lg:grid-cols-3"
          >
            {postList.map((item, index) => (
              <div key={index} className="w-full">
                <a href={'/posts/' + item.id} className="block">
                  <PostArticle
                    image={item.preview_image_url}
                    title={item.title}
                    created_at={
                      new Date(item.created_at).toISOString().split('T')[0]
                    }
                    category={item.category_title}
                    tags={item.tags}
                    duration_time={item.duration_time}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="my-8" />
      </main>
    </>
  );
}
