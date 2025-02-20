import { FC } from 'react';

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
      <div className="mr-2 flex h-16 w-24 shrink-0 flex-col overflow-hidden rounded-sm border border-gray-200 lg:h-32 lg:w-48">
        <img
          className="duration-800 h-16 w-24 rounded-sm object-cover transition-transform ease-in-out lg:h-32 lg:w-48 lg:hover:scale-110"
          src={image}
        />
      </div>
      <div
        id="content_text"
        className="relative ml-1 flex w-full flex-col justify-center"
      >
        <div>
          {tags.map((item, index) => (
            <span
              key={index}
              className="mr-2 text-[10px] font-thin text-slate-900"
            >
              {item.name}
            </span>
          ))}
        </div>
        <div className="break-words text-xs font-normal text-gray-900 hover:text-orange-400 lg:text-base">
          {title}
        </div>
      </div>
    </div>
  );
};

export default PostArticle;
