import { FC } from 'react';

type TagProps = {
  tag: string;
};

const Tag: FC<TagProps> = ({ tag }) => {
  return (
    <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-extralight text-gray-800 hover:cursor-pointer hover:bg-orange-300 hover:font-normal hover:text-white">
      {tag}
    </span>
  );
};

export default Tag;
