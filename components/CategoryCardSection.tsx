import { FC, useEffect, useRef } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import CategoryCard from './CategoryCard';

type CategoryCardSectionProps = {
  categories: Category[];
};

interface Category {
  id: number;
  title: string;
  icon: string;
}

const CategoryCardSection: FC<CategoryCardSectionProps> = ({ categories }) => {
  // Add ref for the scrollable container
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {}, []);

  // Add scroll handler
  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200, // Scroll by 200px - adjust this value as needed
        behavior: 'smooth',
      });
    }
  };

  // Add scroll handler
  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200, // Scroll by 200px - adjust this value as needed
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="group relative flex items-center justify-between">
      <button
        onClick={handleScrollLeft}
        className="absolute left-0 z-10 rounded-full p-2 opacity-0 transition-opacity duration-300 ease-in-out hover:bg-gray-100/50 group-hover:opacity-100"
      >
        <IoIosArrowBack size={24} />
      </button>
      <div
        ref={scrollContainerRef}
        className="w-full max-w-[100vw] flex overflow-x-scroll py-2 pl-0 pr-10 scrollbar-hide"
      >
        <div className="flex gap-2 scrollbar-hide w-full">
          {categories.map((item, index) => (
            <CategoryCard key={index} title={item.title} icon={item.icon} />
          ))}
        </div>
      </div>
      <button
        onClick={handleScrollRight}
        className="absolute right-0 z-10 rounded-full p-2 opacity-0 transition-opacity duration-300 ease-in-out hover:bg-gray-100/50 group-hover:opacity-100"
      >
        <IoIosArrowForward size={24} />
      </button>
    </div>
  );
};

export default CategoryCardSection;
