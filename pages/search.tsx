import PostArticle from '@/components/PostArticle';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useState } from 'react';
import { SearchContext } from './_app';

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

const Search = () => {
  const router = useRouter();
  const { q } = router.query; // This will persist across refreshes

  const { searchQuery } = useContext(SearchContext);

  const [postList, setPostList] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (q) {
      handleSearch();
    }
  }, [q]);

  const handleSearch = useCallback(async () => {
    if (searchQuery.trim().length <= 0) {
      return;
    }
    try {
      setLoading(true);
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
        .or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`)
        .returns<PostWithJoins[]>();
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
  }, [searchQuery]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <main className="container mx-auto flex flex-col px-4 sm:px-6 md:px-7 lg:px-8">
      <div className="my-8">
        <div className="mb-4 text-xs">{postList.length} posts</div>
        <div className="grid w-full grid-cols-1 gap-2 custom:grid-cols-2  lg:grid-cols-3">
          {postList.map((item, index) => (
            <a href={'/posts/' + item.id} key={index}>
              <PostArticle
                image={item.preview_image_url}
                title={item.title}
                created_at={item.created_at}
                category={item.category_title}
                tags={item.tags}
                duration_time={item.duration_time}
              />
            </a>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Search;
