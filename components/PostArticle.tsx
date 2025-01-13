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
      <div className="mr-2 flex h-20 w-28 shrink-0 flex-col overflow-hidden rounded-lg lg:h-24 lg:w-36">
        <img
          className="duration-800 h-20 w-28 rounded-lg object-cover transition-transform ease-in-out lg:h-24 lg:w-36 lg:hover:scale-110"
          src={image}
        />
      </div>
      <div className="relative flex min-w-0 flex-1 flex-col">
        <div className="flex h-full flex-col">
          <div className="text-xs font-extralight text-gray-600">
            {category}
          </div>
          <div className="text-base font-bold text-gray-900 hover:text-orange-400">
            {title}
          </div>
          <div className="my-2 flex gap-2">
            {tags.map((item, index)=>(<Tag key={index} tag={item.name} />))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostArticle;
