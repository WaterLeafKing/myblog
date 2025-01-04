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
    <div className="flex h-32">
      <div className="text-base font-extralight text-gray-500">
        <div>{category} | &nbsp;</div>
      </div>
      <div className="relative flex min-w-0 flex-1 flex-col">
        <div className="flex h-full flex-col">
          <div className="text-base font-bold text-gray-900 hover:underline">
            {title}
          </div>
          <div className="my-2 flex gap-2">
            <Tag tag="철학" />
            <Tag tag="일상" />
            <Tag tag="사유" />
          </div>
        </div>
      </div>
      <div className="flex h-28 w-44 shrink-0 flex-col overflow-hidden rounded-lg">
        <img
          className="duration-800 h-28 w-44 rounded-lg object-cover transition-transform ease-in-out lg:hover:scale-110"
          src={image}
        />
      </div>
    </div>
  );
};

export default PostArticle;
