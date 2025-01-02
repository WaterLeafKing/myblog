import { FC } from 'react';

type CommentCardProps = {
  comment: string;
};

const CommentCard: FC<CommentCardProps> = ({ comment }) => {
  return (
    <div className="my-1 flex">
      <div className="flex h-6 w-14 min-w-[32px] shrink-0 items-center justify-center rounded-lg bg-gray-200 text-sm">
        나그네
      </div>
      <div className="mx-1 flex-1 text-sm">{comment}</div>
    </div>
  );
};

export default CommentCard;
