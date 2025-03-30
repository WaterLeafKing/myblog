import Category from '@/components/Category';
import PostArticle from '@/components/PostArticle';
import { createServerClient, serializeCookieHeader } from '@supabase/ssr';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

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

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return Object.keys(req.cookies).map((name) => ({
            name,
            value: req.cookies[name] || '',
          }));
        },
        setAll(cookiesToSet) {
          res.setHeader(
            'Set-Cookie',
            cookiesToSet.map(({ name, value, options }) =>
              serializeCookieHeader(name, value, options),
            ),
          );
        },
      },
      global: {
        fetch: (url, options) => {
          process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
          return fetch(url, options);
        },
      },
    },
  );

  try {
    const categoryId = query.category ? Number(query.category) : null;

    // Supabase 쿼리에 카테고리 필터 추가
    let postsQuery = supabase
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
      .order('created_at', { ascending: false });

    // categoryId가 있고 0이 아닐 때만 필터링
    if (categoryId && categoryId !== 0) {
      postsQuery = postsQuery.eq('category_id', categoryId);
    }

    // 쿼리 실행
    const { data: posts, error: postsError } = (await postsQuery.range(
      0,
      33,
    )) as { data: PostWithJoins[] | null; error: any };

    const { data: categories, error: categoriesError } = await supabase
      .from('Category')
      .select('id, title, icon');

    // 상세한 에러 로깅 추가
    if (postsError) {
      console.error('Posts Error:', postsError);
    }
    if (categoriesError) {
      console.error('Categories Error:', categoriesError);
    }

    if (postsError || categoriesError) {
      throw new Error('Data fetching failed');
    }

    const transformedPosts =
      posts?.map((post) => ({
        id: post.id,
        preview_image_url: post.preview_image_url,
        title: post.title,
        created_at: post.created_at,
        category_id: post.category_id,
        category_title: post.Category?.title || '',
        tags:
          post.PostTag?.map((pt) => ({
            tag_id: pt.tag_id,
            name: pt.Tag.name,
          })) || [],
        duration_time: post.duration_time,
      })) || [];

    return {
      props: {
        posts: transformedPosts,
        categories: categories || [],
        selectedCategory: categoryId,
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        posts: [],
        categories: [],
        selectedCategory: null,
        error: 'Failed to fetch data',
      },
    };
  }
};

interface HomeProps {
  posts: Post[];
  categories: Category[];
  selectedCategory: number | null;
  error?: string;
}

export default function Home({
  posts,
  categories,
  selectedCategory,
  error,
}: HomeProps) {
  const router = useRouter();

  if (selectedCategory == null) selectedCategory = 0;

  const superCategories = [
    { value: 0, label: 'All' },
    ...categories.map((category) => ({
      value: category.id,
      label: category.title,
    })),
  ];

  // 카테고리 클릭 핸들러 수정
  const handleCategoryClick = async (categoryId: number) => {
    try {
      if (categoryId === 0) {
        await router.push('/', undefined, { scroll: false });
      } else {
        await router.push(
          {
            pathname: '/',
            query: { category: categoryId },
          },
          undefined,
          { scroll: false },
        );
      }
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <>
      <Head>
        <title>NerdInSight</title>
        <meta
          name="description"
          content="Life, Tech, Travel, Grit, Growing Up, Self Development Blog of Nerd"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="NerdInSight" />
        <meta
          property="og:description"
          content="Life, Tech, Travel, Grit, Growing Up, Self Development Blog of Nerd"
        />
        <meta property="og:url" content="https://nerdinsight.vercel.app" />
      </Head>
      <main className="container mx-auto flex flex-col px-4 lg:ml-60 lg:max-w-[calc(100%-240px)]">
        <div className="mt-4 w-full">
          <div className="mb-4 flex gap-2 text-xs">
            {superCategories.map((item) => (
              <div
                key={item.value}
                onClick={() => handleCategoryClick(item.value)}
                className={`rounded-md px-2 py-1 hover:cursor-pointer hover:bg-orange-200 ${
                  selectedCategory === item.value
                    ? 'bg-orange-400 text-white'
                    : 'bg-slate-100'
                }`}
              >
                {item.label}
              </div>
            ))}
          </div>
          <div
            id="post_list"
            className="grid w-full grid-cols-1 gap-2 custom:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5"
          >
            {posts.map((item, index) => (
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
