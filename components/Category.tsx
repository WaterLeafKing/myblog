import { FC } from 'react';

type CategoryProps = {
  title: string;
  icon?: string;
};

const Category: FC<CategoryProps> = ({ title, icon }) => {
  return (
    <div className="flex flex-col items-center justify-center text-xs text-gray-600">
      {icon && <img src={icon} alt={title} className="size-4 brightness-0" />}
      {title}
    </div>
  );
};

export default Category;
