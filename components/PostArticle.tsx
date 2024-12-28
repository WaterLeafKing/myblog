import { FC } from 'react';

type PostArticleProps = {
  image: string;
  title: string;
  created_at: string;
};

const PostArticle: FC<PostArticleProps> = ({ image, title, created_at }) => {
  return (
    <div className="flex h-40 gap-4">
      <div className="text-xl font-extralight text-gray-500">주식 |</div>
      <div className="relative flex min-w-0 flex-1 flex-col">
        <div className="flex h-full flex-col">
          <div className="text-lg text-gray-700">{title}</div>
          <div className="line-clamp-4 overflow-hidden text-base font-light text-gray-500">
            this is description this is description this is descriptionthis is
            descriptionthis is description this is description this is
            description this is description this is descriptionthis is
            description this is description this is description this is
            description this is description this is description this is
            description this is description this is description this is
          </div>
        </div>
      </div>
      <div className="flex w-64 shrink-0 flex-col">
        <img className="h-40 w-64 rounded-lg object-cover" src={image} />
      </div>
    </div>
  );
};

export default PostArticle;
