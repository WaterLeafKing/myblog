import CommentCard from '@/components/CommentCard';
import CommentInput from '@/components/CommentInput';
import { MarkdownViewer } from '@/components/Markdown';
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
  content: string;
  created_at: string;
  tags: { tag_id: number; name: string }[];
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
      .select(
        `id, preview_image_url, title, content, created_at, PostTag (
          tag_id,
          Tag (name)
        )`,
      )
      .eq('id', id)
      .single();

    if (error) {
      console.log(error);
    } else {
      const transformedData = {
        id: data.id,
        preview_image_url: data.preview_image_url,
        title: data.title,
        content: data.content,
        created_at: data.created_at,
        tags: data.PostTag.map((pt: any) => ({
          tag_id: pt.tag_id,
          name: pt.Tag.name,
        })),
      };
      console.log(transformedData);

      setPost(transformedData);
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
      {/* <div
        id="test"
        className="fixed left-[calc((100%-900px)/2)] top-28 hidden items-center justify-center lg:block"
      >
        <div className="flex size-12 items-center justify-center rounded-full border border-gray-300 hover:cursor-pointer hover:border-gray-600">
          <BiShareAlt size={24} />
        </div>
      </div> */}
      <div className="sm:px-6 md:px-7 container mx-auto my-8 flex flex-col px-4 lg:px-8">
        {post ? (
          <>
            <div className="relative h-full">
              <div className="absolute inset-0 bottom-8 z-10 flex flex-col items-center justify-end p-4">
                <div className="flex-row p-2">
                  {post.tags.map((item, index) => (
                    <Tag key={index} tag={item.name} />
                  ))}
                </div>
                <div className="break-keep text-center text-3xl font-medium text-white">
                  {post.title}
                </div>
              </div>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-transparent to-black/70"></div>
              <img
                src={post.preview_image_url}
                alt={`Preview image for ${post.title}`}
                className="h-[420px] w-full rounded-lg object-cover"
              />
            </div>
            <div className="my-4">
              <MarkdownViewer source={post.content} />
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
        <div className="mt-12 font-bold">{commentList.length} comments</div>
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
