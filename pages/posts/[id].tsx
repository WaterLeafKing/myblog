import CommentCard from '@/components/CommentCard';
import CommentInput from '@/components/CommentInput';
import { MarkdownViewer } from '@/components/Markdown';
import Tag from '@/components/Tag';
import { createClient } from '@supabase/supabase-js';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { BiShareAlt } from 'react-icons/bi';

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
  sub_id: number;
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
      .select('id, comment, created_at, sub_id')
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
        className="fixed left-[calc((100%-900px)/2)] top-28 hidden items-center justify-center lg:block"
      >
        <div className="flex size-12 items-center justify-center rounded-full border border-gray-300 hover:cursor-pointer hover:border-gray-600">
          <BiShareAlt size={24} />
        </div>
      </div>
      <div className="sm:px-6 md:px-7 container mx-auto my-8 flex flex-col px-4 lg:px-8">
        {post ? (
          <>
            <div className="my-4 mb-8 whitespace-pre-wrap break-keep text-3xl font-bold lg:text-4xl">
              {post.title}
            </div>
            <div className="mb-8 flex-row">
              <Tag tag="IT" />
              <Tag tag="stock" />
              <Tag tag="travel" />
              <Tag tag="space" />
            </div>
            <div className="mb-4"></div>
            <img
              src={post.preview_image_url}
              alt={`Preview image for ${post.title}`}
              className="rounded-lg"
            />
            <div className="my-4">
              <MarkdownViewer source={post.content} />
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
        <div className="mt-12 font-bold">댓글 {commentList.length}개</div>
        <div className="my-4">
          <CommentInput postId={id} onAddComment={handleAddComment} />
        </div>
        {commentList.map((item, index) => (
          <CommentCard
            key={index}
            comment={item.comment}
            comment_created_at={item.created_at}
            sub_id={item.sub_id}
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
