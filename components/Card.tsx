import { FC } from 'react';

type CardProps = {
  image: string;
  title: string;
  created_at: string;
};

const Card: FC<CardProps> = ({ image, title, created_at }) => {
  return (
    <div className="h-88 relative flex-col">
      <div className="relative">
        <img className="h-50 rounded-lg object-cover" src={image} />
        <div className="absolute bottom-1 right-2 rounded-full bg-gray-800/[.9] p-2 text-xs text-white">
          3분
        </div>
      </div>
      <div className="text-lg">{title}</div>
      <div className="text-xs text-gray-500">{created_at}</div>
    </div>
  );
};

export default Card;
