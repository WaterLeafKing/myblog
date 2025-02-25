import { FC } from 'react';

type PostArticleProps = {
  image: string;
  title: string;
  created_at: string;
  category: string;
  tags: { tag_id: number; name: string }[];
  duration_time: number;
};

const PostArticle: FC<PostArticleProps> = ({
  image,
  title,
  category,
  tags,
  duration_time,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <figure className="relative h-48 shrink-0 rounded-md border border-gray-200 md:h-40 lg:h-44">
        <img
          className="size-full h-48 rounded-md object-cover transition-opacity md:h-40 lg:h-44 lg:duration-300 lg:hover:opacity-80"
          src={image}
          alt={title}
        />
      </figure>
      <div
        id="content_text"
        className="relative flex w-full flex-col justify-center"
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
        <div className="flex items-center gap-1 text-[10px] font-extralight text-slate-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="size-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          {duration_time} min
        </div>
      </div>
    </div>
  );
};

export default PostArticle;
