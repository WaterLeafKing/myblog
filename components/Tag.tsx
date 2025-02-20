import { FC } from 'react';

type TagProps = {
  tag: string;
};

const Tag: FC<TagProps> = ({ tag }) => {
  return (
    <span className="rounded-full px-2 py-1 text-xs font-thin text-white">
      {tag}
    </span>
  );
};

export default Tag;
