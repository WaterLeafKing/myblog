import { createClient } from '@supabase/supabase-js';
import { FC, useState } from 'react';

interface Comment {
  id: number;
  comment: string;
  created_at: string;
  sub_id: number;
}

interface CommentInputProps {
  postId: number;
  onAddComment: (newComment: Comment) => void;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const CommentInput: FC<CommentInputProps> = ({ postId, onAddComment }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!comment || comment == '') {
      alert('내용을 입력해주세요.');
      return;
    }

    try {
      const commentData = {
        comment,
        post_id: postId,
      };

      const { data, error } = await supabase
        .from('Comment')
        .insert([commentData])
        .select();

      if (error) throw error;

      // Reset form after successful submission
      setComment('');
      console.log(data);
      onAddComment(data[0]);
    } catch (error) {
      console.error('Error inserting post:', error);
      alert('댓글 작성 중 오류가 발생했습니다.');
    } finally {
      //
    }
  };

  return (
    <div className="flex">
      <form className="w-full flex-col" onSubmit={handleSubmit}>
        <input
          className={`ease w-full border-b  bg-transparent px-3 py-2 text-sm 
            text-slate-700 shadow-sm transition duration-300 placeholder:text-slate-400
             hover:border-b-slate-300 
            ${comment ? ' border-orange-400 focus:border-orange-400 focus:shadow-none focus:outline-none' : 'border-slate-200 focus:border-b-slate-400 focus:shadow-none focus:outline-none'}`}
          placeholder="의견과 칭찬 아낌없이 써주세요"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
        <div className="my-1 flex justify-end">
          <button
            type="button"
            className="text-sm text-slate-400"
            onClick={() => setComment('')}
          >
            취소
          </button>
          <button
            type="submit"
            className={`ml-2 rounded-md border px-4 py-2 text-sm text-gray-800 transition duration-300 hover:border hover:border-orange-300 ${
              comment ? 'border-orange-400 text-orange-400' : ''
            }`}
          >
            등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentInput;
