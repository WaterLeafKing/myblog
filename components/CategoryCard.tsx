import { FC } from 'react';

type CategoryCardProps = {};

const CategoryCard: FC<CategoryCardProps> = () => {
  return (
    <div className="flex h-40 gap-4">
      <div className="w-32 rounded-lg border  border-[#d5d5d5] p-4">Tesla</div>
      <div className="w-32 rounded-lg border  border-[#d5d5d5] p-4">Nvdia</div>
      <div className="w-32 rounded-lg border  border-[#d5d5d5] p-4">
        Palantir
      </div>
      <div className="w-32 rounded-lg border  border-[#d5d5d5] p-4">IonQ</div>
      <div className="w-32 rounded-lg border  border-[#d5d5d5] p-4">Apple</div>
      <div className="w-32 rounded-lg border  border-[#d5d5d5] p-4">
        Bitcoin
      </div>
    </div>
  );
};

export default CategoryCard;
