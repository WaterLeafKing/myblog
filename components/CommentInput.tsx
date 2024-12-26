import { FC } from 'react';

const CommentInput: FC = () => {
  return (
    <div className="flex">
      <input
        className="ease w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm text-slate-700 shadow-sm transition duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-400 focus:shadow focus:outline-none"
        placeholder="의견과 칭찬 아낌없이 써주세요"
      />
    </div>
  );
};

export default CommentInput;
