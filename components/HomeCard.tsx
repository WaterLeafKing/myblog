import { FC } from 'react';

type HomeCardProps = {
  imageUrl: string;
  title: string;
};

const HomeCard: FC<HomeCardProps> = ({ imageUrl, title }) => {
  return (
    <div className="">
      <img
        className="object-cover transition-transform duration-1000 ease-in-out lg:hover:scale-110"
        src={imageUrl}
      />
    </div>
  );
};

export default HomeCard;
