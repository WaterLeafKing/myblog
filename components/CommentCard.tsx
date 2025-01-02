import { FC } from 'react';

type CommentCardProps = {
  comment: string;
};

const CommentCard: FC<CommentCardProps> = ({
  comment,
}) => {
  return (
    <div className="flex my-1">
      <div className="min-w-[32px] w-14 h-6 bg-gray-200 flex items-center justify-center rounded-lg text-xs shrink-0">나그네</div>
      <div className="text-xs mx-1 flex-1">{comment}</div>
    </div>
  );
};

export default CommentCard;
