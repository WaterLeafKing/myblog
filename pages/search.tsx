import PostArticle from '@/components/PostArticle';
import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';

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

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [postList, setPostList] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
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
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <main className="container mx-auto flex flex-col px-4 sm:px-6 md:px-7 lg:px-8">
      <div className="my-10">
        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="please enter your search keyword"
            className="w-full rounded-lg border p-2 outline-none focus:border-gray-500"
          />
        </div>
        <div className="my-4 text-xs">{postList.length} posts</div>
        <div className="grid w-full grid-cols-3 gap-2">
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
}
