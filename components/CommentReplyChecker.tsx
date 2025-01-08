import { FC } from 'react';

interface CommentReplyCheckerProps {}

const CommentReplyChecker: FC<CommentReplyCheckerProps> = ({}) => {
  return (
    <div className="flex">
      <div className="text-xs items-center justify-center p-1 px-2 text-gray-800 hover:cursor-pointer hover:bg-gray-200 hover:rounded-full">답글</div>
    </div>
  );
};

export default CommentReplyChecker;
