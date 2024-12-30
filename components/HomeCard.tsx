import { FC } from 'react';

type HomeCardProps = {
  imageUrl: string;
  title: string;
};

const HomeCard: FC<HomeCardProps> = ({ imageUrl, title }) => {
  return (
    <div className="cursor-pointer relative h-full">
      <div className="absolute bottom-12 left-12 z-10 text-white p-4 font-bold text-2xl">{title}</div>
      <img
        className="object-cover w-full h-full brightness-75"
        src={imageUrl}
      />
    </div>
  );
};

export default HomeCard;
