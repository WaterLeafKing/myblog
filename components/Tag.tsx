import { FC } from 'react';

type TagProps = {
  tag: string;
};

const Tag: FC<TagProps> = ({ tag }) => {
  return (
    <span className="mr-2 rounded-full border border-stone-600 bg-white px-2.5 py-0.5 text-sm font-thin  text-gray-800">
      {tag}
    </span>
  );
};

export default Tag;
