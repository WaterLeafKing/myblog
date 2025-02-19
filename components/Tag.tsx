import { FC } from 'react';

type TagProps = {
  tag: string;
};

const Tag: FC<TagProps> = ({ tag }) => {
  return (
    <span className="rounded-full px-2 py-1 text-xs font-thin text-white hover:cursor-pointer hover:text-orange-400">
      {tag}
    </span>
  );
};

export default Tag;
