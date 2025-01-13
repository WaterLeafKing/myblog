import { FC } from 'react';
import Tag from './Tag';

type PostArticleProps = {
  image: string;
  title: string;
  created_at: string;
  category: string;
  tags: { tag_id: number; name: string }[];
};

const PostArticle: FC<PostArticleProps> = ({ image, title, category, tags }) => {
  return (
    <div className="mb-2 flex rounded-lg">
      <div className="mr-2 flex h-16 w-24 shrink-0 flex-col overflow-hidden rounded-lg lg:h-20 lg:w-32">
        <img
          className="duration-800 h-16 w-24 rounded-lg object-cover transition-transform ease-in-out lg:h-20 lg:w-32 lg:hover:scale-110"
          src={image}
        />
      </div>
      <div className="relative flex-col w-full">
          <div className="flex w-full">
            <div className="text-xs lg:text-base font-bold text-gray-900 hover:text-orange-400 truncate flex-1">
              {title}
            </div>
            <div className="text-xs font-extralight text-gray-600 shrink-0 ml-2 hidden sm:block md:block lg:block xl:block 2xl:block">
              {category}
            </div>
          </div>
          <div className="my-2 flex gap-2">
            {tags.map((item, index)=>(<Tag key={index} tag={item.name} />))}
          </div>
      </div>
    </div>
  );
};

export default PostArticle;
