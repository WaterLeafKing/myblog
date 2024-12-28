import { FC } from 'react';

type CategoryCardProps = {
  title: string;
  icon?: string;
};

const CategoryCard: FC<CategoryCardProps> = ({ title, icon }) => {
  return (
    <div className="flex h-20 w-32 flex-col items-center justify-center rounded-lg border border-[#dcdcdc] text-gray-600">
      {icon && <img src={icon} alt={title} className="size-6 brightness-0" />}
      {title}
    </div>
  );
};

export default CategoryCard;
