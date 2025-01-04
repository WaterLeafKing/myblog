import { FC } from 'react';
import CommentReplyChecker from './CommentReplyChecker';

type CommentCardProps = {
  comment: string;
  comment_created_at: string;
};

const CommentCard: FC<CommentCardProps> = ({ comment, comment_created_at }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date
      .toLocaleString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
      .replace(/\//g, '-')
      .replace(/,/g, '');
  };

  return (
    <div className="my-2 flex-col">
      <div className="flex items-end">
        <div className="flex h-6 w-14 min-w-[32px] shrink-0 items-center justify-center rounded-lg bg-gray-200 text-sm">
          나그네
        </div>
        <div className="ml-2 text-xs text-gray-400">
          {formatDate(comment_created_at)}
        </div>
      </div>
      <div className="mx-1 flex-1 text-sm">{comment}</div>
      <CommentReplyChecker />
    </div>
  );
};

export default CommentCard;
