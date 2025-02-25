import { FC } from 'react';

type HomeCardProps = {
  imageUrl: string;
  title: string;
  category_title: string;
};

const HomeCard: FC<HomeCardProps> = ({ imageUrl, title, category_title }) => {
  return (
    <div className="relative h-full cursor-pointer">
      <div className="absolute right-8 top-8 z-10 rounded border-[0.5px] border-white p-2 px-4 text-xs text-white">
        Today&apos;s {category_title}
      </div>
      <div className="absolute bottom-6 left-8 z-10 max-w-[400px] break-keep p-4 text-2xl font-normal text-white">
        <div className="text-2xl">&quot;</div>
        {title}
      </div>
      <img className="size-full object-cover brightness-75" src={imageUrl} />
    </div>
  );
};

export default HomeCard;
