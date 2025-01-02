import { FC } from 'react';

type HomeCardProps = {
  imageUrl: string;
  title: string;
};

const HomeCard: FC<HomeCardProps> = ({ imageUrl, title }) => {
  return (
    <div className="relative h-full cursor-pointer">
      <div className="absolute right-8 top-8 z-10 rounded border border-white p-2 text-sm text-white">
        today insight
      </div>
      <div className="absolute bottom-6 left-8 z-10 max-w-[400px] break-keep p-4 text-2xl font-bold text-white">
        {title}
      </div>
      <img className="size-full object-cover brightness-75" src={imageUrl} />
    </div>
  );
};

export default HomeCard;
