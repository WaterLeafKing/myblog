import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Dispatch, FC, SetStateAction, useState } from 'react';

type HeaderProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

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

const Header: FC<HeaderProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const [postList, setPostList] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

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
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="flex h-14 items-center border-b px-4 lg:px-4">
      <Link href="/">
        <h1 className="font-['Futura'] text-xl tracking-wider text-slate-500 md:text-xl lg:text-2xl">
          <span className="font-bold text-orange-600">N</span>
          <span className="font-thin">erd</span>
          <span className="font-thin">In</span>Sight
        </h1>
      </Link>
      <div className="mx-auto flex">
        <div className="">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search"
            className="w-full rounded-full border border-white bg-slate-200 p-2 pl-8 outline-none focus:border-orange-300 lg:w-96"
          />
        </div>
        {/* <IconButton Icon={AiOutlineSearch} component={Link} href="/search" /> */}
      </div>
    </header>
  );
};

export default Header;
