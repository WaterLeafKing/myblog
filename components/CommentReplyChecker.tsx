import { FC } from 'react';

interface CommentReplyCheckerProps {}

const CommentReplyChecker: FC<CommentReplyCheckerProps> = ({}) => {
  return (
    <div className="flex text-xs">
      <div className="text-xs text-green-600">답글 달기</div>
    </div>
  );
};

export default CommentReplyChecker;
