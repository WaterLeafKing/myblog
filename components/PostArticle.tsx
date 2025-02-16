import { FC } from 'react';
import Tag from './Tag';

type PostArticleProps = {
  image: string;
  title: string;
  created_at: string;
  category: string;
  tags: { tag_id: number; name: string }[];
};

const PostArticle: FC<PostArticleProps> = ({
  image,
  title,
  category,
  tags,
}) => {
  return (
    <div className="mb-3 flex">
      <div className="mr-2 flex h-16 w-24 shrink-0 flex-col overflow-hidden lg:h-28 lg:w-40">
        <img
          className="duration-800 h-16 w-24 object-cover transition-transform ease-in-out lg:h-28 lg:w-40 lg:hover:scale-110"
          src={image}
        />
      </div>
      <div
        id="content_text"
        className="relative ml-1 flex w-full flex-col justify-center"
      >
        <div className="text-[10px] font-thin text-black">{category}</div>
        <div className="break-words text-xs font-normal text-gray-900 hover:text-orange-400 lg:text-base">
          {title}
        </div>
        <div className="my-2 flex gap-2">
          {tags.map((item, index) => (
            <Tag key={index} tag={item.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostArticle;
