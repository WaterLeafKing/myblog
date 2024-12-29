import { FC } from 'react';

type PostArticleProps = {
  image: string;
  title: string;
  created_at: string;
  content: string;
};

const PostArticle: FC<PostArticleProps> = ({
  image,
  title,
  created_at,
  content,
}) => {
  return (
    <div className="flex h-32 gap-2">
      <div className="text-xl font-extralight text-gray-500">주식 |</div>
      <div className="relative flex min-w-0 flex-1 flex-col">
        <div className="flex h-full flex-col">
          <div className="text-lg text-gray-700">{title}</div>
          <div className="line-clamp-4 overflow-hidden text-sm font-light text-gray-600">
            {content}
          </div>
        </div>
      </div>
      <div className="flex w-52 shrink-0 flex-col">
        <img className="h-32 w-52 rounded-lg object-cover" src={image} />
      </div>
    </div>
  );
};

export default PostArticle;
