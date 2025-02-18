import { FC } from 'react';

interface CommentReplyCheckerProps {}

const CommentReplyChecker: FC<CommentReplyCheckerProps> = ({}) => {
  return (
    <div className="flex">
      <div className="items-center justify-center p-1 px-2 text-xs text-gray-800 hover:cursor-pointer hover:rounded-full hover:bg-gray-200">
        reply
      </div>
    </div>
  );
};

export default CommentReplyChecker;
