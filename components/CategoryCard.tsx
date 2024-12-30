import { FC } from 'react';

type CategoryCardProps = {
  title: string;
  icon?: string;
};

const CategoryCard: FC<CategoryCardProps> = ({ title, icon }) => {
  return (
    <div className="flex h-12 w-20 cursor-pointer flex-col items-center justify-center rounded-lg border border-[#dcdcdc] text-xs text-gray-600 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border hover:border-orange-300 hover:shadow-md">
      {icon && <img src={icon} alt={title} className="size-4 brightness-0" />}
      {title}
    </div>
  );
};

export default CategoryCard;
