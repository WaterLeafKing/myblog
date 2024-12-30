import { FC } from 'react';

type HomeCardProps = {
  imageUrl: string;
  title: string;
};

const HomeCard: FC<HomeCardProps> = ({ imageUrl, title }) => {
  return (
    <div className="cursor-pointer relative h-full">
      <div className='absolute top-8 right-8 z-10 text-white text-sm p-2 border border-white rounded'>today insight</div>
      <div className="absolute bottom-12 left-12 z-10 text-white p-4 font-bold text-2xl max-w-[400px] break-keep">{title}</div>
      <img
        className="object-cover w-full h-full brightness-75"
        src={imageUrl}
      />
    </div>
  );
};

export default HomeCard;
