import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';

type HeaderProps = {
  toggleSidebar: () => void;
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

const Header: FC<HeaderProps> = ({ toggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const toggleSidebar_inside = () => {
    toggleSidebar();
  };

  return (
    <header className="flex h-14 items-center border-b px-4 lg:px-4">
      <div className="mr-4 flex items-center lg:hidden">
        <AiOutlineMenu size={24} onClick={toggleSidebar_inside} />
      </div>
      <Link href="/">
        <div className="flex items-center"></div>
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
            onKeyDown={handleKeyDown}
            placeholder="Search"
            className="w-full rounded-full border border-white bg-slate-200 p-2 pl-8 outline-none focus:border-orange-300 lg:w-96"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
