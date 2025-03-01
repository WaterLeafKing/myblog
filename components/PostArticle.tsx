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
    <div className="flex flex-col">
      <div className="relative h-44 shrink-0 overflow-hidden rounded-md border border-slate-200 md:h-40 lg:h-44">
        <img
          className="size-full rounded-md object-cover transition-all duration-500 hover:scale-105 hover:opacity-80"
          src={image}
          alt={title}
        />
        <div className="absolute left-2 top-2 rounded-full bg-black px-2 text-[9px] font-extralight text-white opacity-70">
          {category}
        </div>
      </div>
      <div
        id="content_text"
        className="relative flex w-full flex-col justify-center"
      >
        <div>
          {tags.map((item, index) => (
            <span key={index}>
              <span className="text-[11px] font-thin text-slate-900">
                {item.name}
              </span>
              {index < tags.length - 1 && (
                <span className="mx-1 text-[8px] text-slate-400">•</span>
              )}
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
