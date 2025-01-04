import { FC } from 'react';

type TagProps = {
  tag: string;
};

const Tag: FC<TagProps> = ({ tag }) => {
  return (
    <span className="rounded-full bg-gray-200 px-2 py-1 text-xs font-extralight text-gray-800 hover:cursor-pointer hover:bg-gray-400 hover:font-normal hover:text-gray-100">
      {tag}
    </span>
  );
};

export default Tag;
