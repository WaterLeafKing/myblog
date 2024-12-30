import { FC } from 'react';

type CommentCardProps = {
  comment: string;
};

const CommentCard: FC<CommentCardProps> = ({
  comment,
}) => {
  return (
    <div className="flex my-4">
      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">prof</div>
     <div className="text-sm mx-2">{comment}</div>
    </div>
  );
};

export default CommentCard;
