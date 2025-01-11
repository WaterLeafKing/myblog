import { FC } from 'react';
import Tag from './Tag';

type PostArticleProps = {
  image: string;
  title: string;
  created_at: string;
  category: string;
};

const PostArticle: FC<PostArticleProps> = ({ image, title, category }) => {
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
          <div className="text-sm font-extralight text-gray-500">
            {category}
          </div>
          <div className="text-base font-bold text-gray-900 hover:text-orange-400">
            {title}
          </div>
          <div className="my-2 flex gap-2">
            <Tag tag="철학" />
            <Tag tag="일상" />
            <Tag tag="사유" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostArticle;
