import CategoryCard from '@/components/CategoryCard';
import CommentCard from '@/components/CommentCard';
import CommentInput from '@/components/CommentInput';
import Tag from '@/components/Tag';
import { createClient } from '@supabase/supabase-js';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';

const MDViewer = dynamic(() => import('@uiw/react-markdown-preview'), {
  ssr: false,
});

type PostProps = {
  id: number;
};

interface Post {
  id: number;
  preview_image_url: string;
  title: string;
  content: string;
  created_at: string;
}

export default function Post({ id }: PostProps) {
  const [post, setPost] = useState<Post>();
  const [comment, setComment] = useState<string>('');

  const fetchPost = async (id: number) => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data, error } = await supabase
      .from('Post')
      .select('id, preview_image_url, title, content, created_at')
      .eq('id', id)
      .single();

    if (error) {
      console.log(error);
    } else {
      setPost(data);
    }
  };

  useEffect(() => {
    fetchPost(id);
  }, [id]);

  return (
    <div className="sm:px-6 md:px-7 container mx-auto flex flex-col px-4 lg:px-8 my-8">
      {post ? (
        <>        
        <div className="text-4xl font-bold my-4 mb-8">{post.title}</div>
        <div className="flex justify-between items-center">
          <div><CategoryCard title="IT"/></div>
          <div>share</div>
        </div>
        <div className="my-4 mb-8"></div>
        <img src={post.preview_image_url} alt={post.title} className="rounded-lg"/>
        <div className="my-4">
          <MDViewer source={post.content}/>
        </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <div className="flex-row ">
        <Tag tag="IT" />
        <Tag tag="stock" />
        <Tag tag="travel" />
        <Tag tag="space" />
      </div>
      <div className="cursor-pointer">
        <AiOutlineHeart size={24} />
      </div>
      <CommentInput text={'comment'}/>
      <CommentCard comment="이곳은 댓글입니다"/>
      <div className='my-8'></div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;

  return {
    props: {
      id: Number(id),
    },
  };
};
