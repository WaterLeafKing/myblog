import CommentInput from '@/components/CommentInput';
import Tag from '@/components/Tag';
import { createClient } from '@supabase/supabase-js';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';

type PostProps = {
  id: number;
};

interface Post {
  id: number;
  preview_image_url: string;
  title: string;
  created_at: string;
}

export default function Post({ id }: PostProps) {
  const [post, setPost] = useState<Post>();

  const fetchPost = async (id: number) => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data, error } = await supabase
      .from('Post')
      .select('id, preview_image_url, title, created_at')
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
    <div className="sm:px-6 md:px-7 container mx-auto flex flex-col px-4 lg:px-8">
      {post ? (
        <>
          <div className="text-3xl">{post.title}</div>
          <img src={post.preview_image_url} alt={post.title} />
          <p>Created at: {post.created_at}</p>
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
      <div>좋아요</div>
      <CommentInput />
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
