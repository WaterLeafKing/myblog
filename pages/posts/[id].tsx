import Category from '@/components/Category';
import CommentCard from '@/components/CommentCard';
import CommentInput from '@/components/CommentInput';
import Tag from '@/components/Tag';
import { createClient } from '@supabase/supabase-js';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { BiShareAlt } from 'react-icons/bi';

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

interface Comment {
  id: number;
  comment: string;
  created_at: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Post({ id }: PostProps) {
  const [post, setPost] = useState<Post>();
  const [commentList, setCommentList] = useState<Comment[]>([]);

  const fetchPost = async (id: number) => {
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

  const fetchComment = async (id: number) => {
    const { data, error } = await supabase
      .from('Comment')
      .select('id, comment, created_at')
      .eq('post_id', id);

    if (error) {
      console.log(error);
    } else {
      setCommentList(data);
    }
  };

  useEffect(() => {
    fetchPost(id);
    fetchComment(id);
  }, [id]);

  const handleAddComment = (newComment: Comment) => {
    setCommentList((prevComments) => [...prevComments, newComment]);
  };

  return (
    <>
      <div
        id="test"
        className="fixed left-[calc((100%-1024px)/2)] top-28 hidden h-32 flex-col items-center justify-center rounded-full border bg-gray-100 p-2 lg:block"
      >
        <div className="mt-2 size-12 rounded-full bg-gray-100">
          <Category
            title={'IT'}
            icon={
              'https://cdn.iconscout.com/icon/free/png-256/free-tesla-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-company-vol-7-pack-logos-icons-2945257.png?f=webp&w=256'
            }
          />
        </div>
        <div className="mt-2 flex size-12 items-center justify-center rounded-full bg-gray-100">
          <BiShareAlt size={24} />
        </div>
      </div>
      <div className="sm:px-6 md:px-7 container mx-auto my-8 flex flex-col px-4 lg:px-8">
        {post ? (
          <>
            <div className="my-4 mb-8 text-4xl font-bold">{post.title}</div>
            <div className="mb-8 flex-row">
              <Tag tag="IT" />
              <Tag tag="stock" />
              <Tag tag="travel" />
              <Tag tag="space" />
            </div>
            <div className="mb-4"></div>
            <img
              src={post.preview_image_url}
              alt={post.title}
              className="rounded-lg"
            />
            <div className="my-4">
              <MDViewer source={post.content} />
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
        <div className="my-4">
          <CommentInput postId={id} onAddComment={handleAddComment} />
        </div>
        {commentList.map((item, index) => (
          <CommentCard
            key={index}
            comment={item.comment}
            comment_created_at={item.created_at}
          />
        ))}
        <div className="my-8"></div>
      </div>
    </>
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
