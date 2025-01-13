import PostArticle from '@/components/PostArticle';
import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

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

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [postList, setPostList] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if(searchQuery.trim().length <= 0){
        return;
    }
    try {
      setLoading(true);
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
        .or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`)
        .returns<PostWithJoins[]>();
      if (error) throw error;

      const transformedData = data?.map(post => ({
        id: post.id,
        preview_image_url: post.preview_image_url,
        title: post.title,
        created_at: post.created_at,
        category_id: post.category_id,
        category_title: post.Category.title,
        tags: post.PostTag.map((pt: any) => ({
          tag_id: pt.tag_id,
          name: pt.Tag.name
        }))
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
    <main className="sm:px-6 md:px-7 container mx-auto flex flex-col px-4 lg:px-8">
      <div className='my-10'>
        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="검색어를 입력해 주세요"
            className="w-full p-2 border rounded-lg outline-none focus:border-gray-500"
          />
          <button 
            onClick={handleSearch}
            className="mt-2 px-4 py-2 w-full bg-slate-400 hover:bg-orange-400 text-white rounded-lg"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
        <div className='text-xs my-4'>포스트 {postList.length} 건</div>
        <div className="space-y-4">
        {postList.map((item, index) => (
          <a href={'/posts/' + item.id} key={index} target='_blank' >
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
      </div>
    </main>
  );
}
