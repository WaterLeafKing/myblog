import { FC } from 'react';

type CommentCardProps = {
  comment: string;
  comment_created_at: string;
  sub_id: number;
};

const CommentCard: FC<CommentCardProps> = ({
  comment,
  comment_created_at,
  sub_id,
}) => {
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
    <div className="my-1 flex-col">
      <div className="flex items-end">
        <div className="flex h-6 min-w-[32px] shrink-0 items-center justify-center rounded-lg bg-gray-200 px-2 text-sm font-bold">
          {sub_id}.anonymous
        </div>
        <div className="ml-2 text-xs font-extralight">
          {formatDate(comment_created_at)}
        </div>
      </div>
      <div className="my-1 flex-1 text-sm">{comment}</div>
    </div>
  );
};

export default CommentCard;
