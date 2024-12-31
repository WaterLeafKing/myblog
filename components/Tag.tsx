import { FC } from 'react';

type TagProps = {
  tag: string;
};

const Tag: FC<TagProps> = ({ tag }) => {
  return (
    <span className="hover:text-gray-200 hover:bg-gray-400 hover:cursor-pointer text-xs font-extralight text-gray-600 bg-gray-200 px-2 py-1 rounded-full">
      {tag}
    </span>
  );
};

export default Tag;
