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

    const { data: posts, error: postsError } = (await supabase
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
      .range(0, 33)) as { data: PostWithJoins[] | null; error: any };

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

  const categoryOptions = [
    { value: 0, label: 'All' },
    ...categories.map((category) => ({
      value: category.id,
      label: category.title,
    })),
  ];

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
          {/* <div className="mb-3">
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
              onChange={(option) => {
                const categoryId = option?.value || 0;
                router.push(categoryId === 0 ? '/' : `/?category=${categoryId}`);
              }}
            />
          </div> */}

          <div className="mb-4 text-xs">posts</div>
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
